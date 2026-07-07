// src/components/Planet.tsx
'use client';

import { RigidBody } from '@react-three/rapier';
import { Vector3 } from '@/types/math';
import { Planet } from '@/types/Planet';
import { createPlanets } from '@/utils/PlanetUtils';
import { useGameStore } from '@/store/gameStore';

export const PlanetModel = (planet: Planet, index: number) => {
  return(
    <RigidBody type="fixed" position={Vector3.Vector3ToTHREE(planet.planetState.position)} colliders="ball" rotation={Vector3.Vector3ToEuler(planet.planetState.rotE)} key={`planet-${index}`}>
      <mesh>
        <sphereGeometry args={[planet.planetProps.radius, 32, 32]} />
        <meshStandardMaterial color={planet.planetProps.color} />
      </mesh>
    </RigidBody>
  )
}

export const PlanetModels = () => {
  let planets = useGameStore.getState().planets;
  if (!planets || planets.length === 0) {
    planets = createPlanets(); // 惑星がまだ作成されていない場合、createPlanets関数を呼び出して作成する
  }
  if (!planets || planets.length === 0) {
    return null; // 惑星が作成されていない場合は何も表示しない
  }
  const planetModels: React.ReactNode[] = [];
  for (const planet of planets) {
    if (!planet.planetState) {
      continue; // 惑星の状態が存在しない場合はスキップ
    }
    planetModels.push(PlanetModel(planet, planets.indexOf(planet)));
  }
  return (
    <>
      {planetModels}
    </>
  );
}