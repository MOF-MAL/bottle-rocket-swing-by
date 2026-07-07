import { Vector3, Quaternion } from '@/types/math';
import { useGameStore } from '@/store/gameStore';
import { Planet, PlanetProps, PlanetState } from '@/types/Planet';

// --- 惑星を作る関数 ---
export const createPlanets = () => {
    const planets: Planet[] = [];
    const numOfPlanets = 1; // 惑星の数を指定
    for (let i = 0; i < numOfPlanets; i++) {
        const planetProps: PlanetProps = {
            mass: 10**13, // 惑星の質量を設定
            radius: 2,
            color: 'blue',
        };
        const planet: Planet = {
            planetProps: planetProps,
            planetState: {
                position: new Vector3(20, -6.9, 0),
                rotE: new Vector3(0, 0, 0), // 初期回転をゼロに設定
                linearVelocity: Vector3.zero,
                angularVelocity: Vector3.zero,
            }
        };
        planets.push(planet);
    }
    useGameStore.getState().CreatePlanet(planets); // 惑星の状態をゲームストアに保存
    return planets;
};