// src/components/Planet.tsx
'use client';

import { RigidBody } from '@react-three/rapier';

// 外部から「position（座標）」を受け取れるようにするための型の定義（Unityの public Vector3 position; に近い概念）
type PlanetProps = {
  position: [number, number, number];
};

export const Planet = ({ position }: PlanetProps) => {
  return (
    // type="fixed": Unityの「Is Kinematic = true」のように、他の力で動かされない完全固定の物体にします
    // colliders="ball": 球体の当たり判定（SphereCollider）を自動生成します
    <RigidBody type="fixed" position={position} colliders="ball">
      <mesh>
        {/* args={[半径, 横の分割数, 縦の分割数]} */}
        <sphereGeometry args={[3, 32, 32]} />
        {/* 惑星っぽく青色に */}
        <meshStandardMaterial color="royalblue" />
      </mesh>
    </RigidBody>
  );
};