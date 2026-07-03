// src/components/Rocket.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
// useFrame: 毎フレーム実行される処理（Unityの Update 兼 FixedUpdate）を呼び出す機能
import { useFrame } from '@react-three/fiber';
import { RigidBody, RapierRigidBody } from '@react-three/rapier';

export const Rocket = () => {
  const [waterAmount, setWaterAmount] = useState<number>(50);
  const [airAmount, setAirAmount] = useState<number>(40);
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const MAX_PRESSURE = 100;

  const rocketRef = useRef<RapierRigidBody>(null);

  // 引力の対象となる惑星の座標（今回は固定値で持たせます。page.tsxで置いた位置と同じ）
  const planetPosition = { x: 10, y: 10, z: 0 };
  // 引力の強さ係数
  const gravityStrength = 200; 

  // ==========================================
  // 【Unityの Update() に相当】
  // 画面が描画されるたび（約60fps）に呼ばれる処理
  // ==========================================
  useFrame(() => {
    // ロケットが破裂している、または参照が取得できていない場合は計算しない
    if (isExploded || !rocketRef.current) return;

    // 1. ロケットの現在位置を取得（Unityの transform.position に相当）
    const rocketPos = rocketRef.current.translation();

    // 2. 惑星までの距離と方向を計算（ベクトル計算）
    const dx = planetPosition.x - rocketPos.x;
    const dy = planetPosition.y - rocketPos.y;
    // 三平方の定理で直線距離を出す: d = √(dx^2 + dy^2)
    const distance = Math.sqrt(dx * dx + dy * dy);

    // 距離が0（完全に重なっている）とエラーになるので回避
    if (distance > 0.1) {
      // 3. 方向を正規化（長さを1にする：Unityの Vector3.normalized に相当）
      const dirX = dx / distance;
      const dirY = dy / distance;

      // 4. 引力の大きさを計算（万有引力の法則に近い「距離の2乗に反比例する」計算）
      // $F = \frac{\text{strength}}{r^2}$ を簡易的に実装
      const forceMag = gravityStrength / (distance * distance);

      // 5. ロケットに継続的な力を加える（Unityの Rigidbody.AddForce(ForceMode.Force) に相当）
      // z軸には力を加えないことで2D挙動を担保する
      rocketRef.current.addForce({ x: dirX * forceMag, y: dirY * forceMag, z: 0 }, true);
    }
  });

  // スペースキー発射の処理（前回から変更なし）
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code !== 'Space' || isExploded) return;
      const currentPressure = waterAmount + airAmount;

      if (currentPressure > MAX_PRESSURE) {
        console.log(`ドカーン！内圧(${currentPressure})が限界を超えて破裂しました！`);
        setIsExploded(true); 
        return;
      }
      if (rocketRef.current) {
        const thrust = waterAmount * 0.15; // 引力に負けないよう少し推進力を強めにしました
        rocketRef.current.applyImpulse({ x: 0, y: thrust, z: 0 }, true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [waterAmount, airAmount, isExploded]); 

  return (
    <RigidBody 
      ref={rocketRef} 
      position={[0, -5, 0]} 
      colliders="cuboid"
      // ==========================================
      // 【2.5D化の肝：Unityの Rigidbody Constraints】
      // ==========================================
      // enabledTranslations={[X移動, Y移動, Z移動]} -> Z軸の移動をロック
      enabledTranslations={[true, true, false]}
      // enabledRotations={[X回転, Y回転, Z回転]} -> Z軸を軸とした回転（画面の平面上での回転）のみ許可
      enabledRotations={[false, false, true]}
    >
      <mesh>
        <boxGeometry args={[1, 4, 1]} />
        <meshStandardMaterial color={isExploded ? "red" : "orange"} />
      </mesh>
    </RigidBody>
  );
};