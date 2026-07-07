'use client';

import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber'; // ★追加: 毎フレーム処理を行うためのフック
import { useRef, useEffect } from 'react';
import { createRocket, updateRocketState } from '@/utils/RocketUtils'; // ★updateRocketStateを追加
import { useGameStore } from '@/store/gameStore';

export const RocketModel = () => {
    const rbRef = useRef<RapierRigidBody | null>(null);

    // ★修正1: コンポーネントのマウント時（最初）に一度だけロケットを生成する
    useEffect(() => {
        const rocket = createRocket({ bodyType: 'Small', hardness: 'Soft', nozzleType: 'Slow' });
        useGameStore.getState().CreateRocket(rocket);
    }, []);

    let mass = 0;

    // ★修正2: 毎フレーム実行されるゲームループ
    useFrame(() => {
        // 1. 引力や内圧などの状態を計算・更新する（Rocket.tsの関数を実行）
        updateRocketState(rbRef);
        const rocketState = useGameStore.getState().rocket?.rocketState;
        if (!rocketState) return;
        mass = rocketState.curMass;
    });

    return (
        <RigidBody
            ref={rbRef} // ★修正3: ここにrefを渡すことで、プログラムと3Dモデルが繋がる！
            type="dynamic"
            mass={mass}
        >
            <mesh>
                <cylinderGeometry args={[0.1, 0.1, 0.8, 32]} />
                <meshStandardMaterial color="white" />
            </mesh>
        </RigidBody>
    );
};