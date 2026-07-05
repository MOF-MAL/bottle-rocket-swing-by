'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics, RigidBody, RapierRigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import { Vector3, Quaternion } from '@/types/math';
import { Rocket, createRocket } from '@/utils/Rocket';
import { useGameStore } from '@/store/gameStore';

export const RocketModel = () => {
    const rbRef = useRef<RapierRigidBody | null>(null);
    let rocket = useGameStore.getState().rocket;

    if (!rocket || !rocket.rocketState) {
        // ロケットがまだ作成されていない場合、デフォルトのロケットを作成する
        rocket = createRocketModel(rbRef, { bodyType: 'Small', hardness: 'Soft', nozzleType: 'Slow' });
    }

    if (!rocket) {
        return null; // ロケットが作成されていない場合は何も表示しない
    }

    // --- ロケットに力を加える ---
    const force = rocket.rocketState.curForce;
    rbRef.current?.addForce(Vector3.Vector3ToTHREE(force), true);

    return (
        <RigidBody
            type="dynamic"
            position={Vector3.Vector3ToTHREE(rocket.rocketState.position)}
            rotation={rocket.rocketState.rotation.eulerAnglesE}
        >
            <mesh>
                <cylinderGeometry args={[0.5, 0.5, 4, 32]} />
                <meshStandardMaterial color="white" />
            </mesh>
        </RigidBody>
    );
};

export const createRocketModel = (rbRef: React.RefObject<RapierRigidBody | null>, rocketTypes: Rocket['rocketTypes'] ) => {
    if (!rbRef.current) {
        const rocket = createRocket(rocketTypes, rbRef);
        useGameStore.getState().CreateRocket(rocket);
        return (rocket);
    }
    return null;
}