import { PhysicsCharactor } from '@/utils/PhysicsCharactor';
import { RapierRigidBody } from '@react-three/rapier';
import { Vector2, Vector3, Quaternion } from '@/types/math';
import { useGameStore } from '@/store/gameStore';

export interface Planet {
    planetProps: PlanetProps;
    planetState: PlanetState;
}

export interface PlanetProps {
    mass: number;
    radius: number;
    color: string;
}

export interface PlanetState {
    position: Vector3;
    rotation: Quaternion;
    linearVelocity: Vector3;
    angularVelocity: Vector3;
}

// --- 惑星を作る関数 ---
export const createPlanets = () => {
    const planets: Planet[] = [];
    const numOfPlanets = 5; // 惑星の数を指定
    for (let i = 0; i < numOfPlanets; i++) {
        const planetProps: PlanetProps = {
            mass: Math.random() * 10000 + 1000, // 1000から11000の間のランダムな質量
            radius: Math.random() * 3 + 1, // 1から3の間のランダムな半径
            color: `hsl(${Math.random() * 360}, 100%, 50%)`, // ランダムな色
        };
        const planet: Planet = {
            planetProps: planetProps,
            planetState: {
                position: new Vector3(Math.random() * 100 - 50, Math.random() * 100 - 50, 0), // ランダムな位置
                rotation: Quaternion.identity,
                linearVelocity: Vector3.zero,
                angularVelocity: Vector3.zero,
            }
        };
        planets.push(planet);
    }
    useGameStore.getState().CreatePlanet(planets); // 惑星の状態をゲームストアに保存
    return planets;
};