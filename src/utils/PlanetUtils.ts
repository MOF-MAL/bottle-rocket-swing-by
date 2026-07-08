import { Vector3, Quaternion } from '@/types/math';
import { useGameStore } from '@/store/gameStore';
import { Planet, PlanetProps, PlanetState } from '@/types/Planet';

// --- 惑星を作る関数 ---
export const createPlanets = () => {
    const planets: Planet[] = [];
    const numOfPlanets = 2; // 惑星の数を指定
    for (let i = 0; i < numOfPlanets; i++) {
        const planetProps: PlanetProps = {
            mass: 10**13.5, // 惑星の質量を設定
            radius: 6, // 惑星の半径を設定
            color: 'blue',
        };
        const planet: Planet = {
            planetProps: planetProps,
            planetState: {
                position: new Vector3(30 + i * 30, 30+ i * 60, 0),
                rotE: Vector3.zero, // 初期回転をゼロに設定
                linearVelocity: Vector3.zero,
                angularVelocity: Vector3.zero,
            }
        };
        planets.push(planet);
    }
    useGameStore.getState().CreatePlanet(planets); // 惑星の状態をゲームストアに保存
    return planets;
};