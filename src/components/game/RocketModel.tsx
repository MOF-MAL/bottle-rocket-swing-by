'use client';

import { useFrame } from '@react-three/fiber'; // ★追加: 毎フレーム処理を行うためのフック
import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import { useRef, useEffect } from 'react';
import { Vector3 } from '@/types/math';
import { createRocket, updateRocketState } from '@/utils/Rocket'; // ★updateRocketStateを追加
import { useGameStore } from '@/store/gameStore';

export const RocketModel = () => {
    const rbRef = useRef<RapierRigidBody | null>(null);

    // ★修正1: コンポーネントのマウント時（最初）に一度だけロケットを生成する
    useEffect(() => {
        const rocket = createRocket({ bodyType: 'Small', hardness: 'Soft', nozzleType: 'Slow' });
        useGameStore.getState().CreateRocket(rocket);
    }, []);

    let pos = new Vector3(0, 0, 0);
    let mass = 0;

    // ★修正2: 毎フレーム実行されるゲームループ
    useFrame(() => {
        // 1. 引力や内圧などの状態を計算・更新する（Rocket.tsの関数を実行）
        updateRocketState(rbRef);

        // 2. 最新のロケット状態を取得
        const rocket = useGameStore.getState().rocket;
        
        // 3. 物理エンジンの剛体(rbRef)に力を加える
        if (rocket && rocket.rocketState && rbRef.current) {
            const force = rocket.rocketState.curForce;
            // trueを渡すことで、剛体がスリープ状態（計算停止状態）になるのを防ぎます
            rbRef.current.addForce(Vector3.Vector3ToTHREE(force), true);
        }

        pos = rocket && rocket.rocketState ? rocket.rocketState.position : new Vector3(0, 0, 0);
        mass = rocket && rocket.rocketProps ? rocket.rocketProps.bodyMass : 0.1;
    });

    return (
        <RigidBody
            ref={rbRef} // ★修正3: ここにrefを渡すことで、プログラムと3Dモデルが繋がる！
            type="dynamic"
            position={Vector3.Vector3ToTHREE(pos)}
            // ※rotationは物理エンジンが自動計算するので、初期表示時以外は外してもOKです
            mass={mass} // ★修正4: ロケットの質量を設定
        >
            <mesh>
                <cylinderGeometry args={[0.1, 0.1, 0.8, 32]} />
                <meshStandardMaterial color="white" />
            </mesh>
        </RigidBody>
    );
};