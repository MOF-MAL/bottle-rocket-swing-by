import { PhysicsCharactor } from '@/utils/PhysicsCharactor';
import { Vector2, Vector3, Quaternion } from '@/types/math';
import { useGameStore } from '@/store/gameStore';
import { RapierRigidBody } from '@react-three/rapier';

export interface Rocket {
  rbRef: React.RefObject<RapierRigidBody | null>;
  rocketTypes: RocketTypes;
  rocketProps: RocketProps;
  rocketState: RocketState;
}

export interface RocketTypes {
  bodyType: 'Small' | 'Medium' | 'Large';
  hardness: 'Soft' | 'Medium' | 'Hard';
  nozzleType: 'Slow' | 'Medium' | 'Fast';
}

export interface RocketProps {
  volume: number;
  bodyMass: number;
  maxPressure: number;
  maxThrust: number;
}

export interface RocketState {
  // --- 物理キャラクターの状態を管理するための変数 ---
  position: Vector3;
  rotation: Quaternion;
  linearVelocity: Vector3;
  angularVelocity: Vector3;

  // --- ロケットの状態を管理するための変数 ---
  curWaterVolume: number;
  curWaterMass: number;
  curAirVolume: number;
  curAirMass: number;
  curMass: number;
  curPressure: number;
  curThrust: number;
  curForce: Vector3;
}

// ロケットを作る関数
export const createRocket = ({ bodyType, hardness, nozzleType }: RocketTypes, rbRef: React.RefObject<RapierRigidBody | null>): Rocket => {
  // --- ロケットのパラメータを計算する ---
  const volume: number = (() => {
    if (bodyType === 'Small') return 100;
    if (bodyType === 'Medium') return 200;
    if (bodyType === 'Large') return 300;
    return 100; // デフォルト値
  })();

  const mass: number = (() => {
    if (hardness === 'Soft') return 1;
    if (hardness === 'Medium') return 2;
    if (hardness === 'Hard') return 3;
    return 1; // デフォルト値
  })();

  const maxPressure: number = (() => {
    if (hardness === 'Soft') return 50;
    if (hardness === 'Medium') return 100;
    if (hardness === 'Hard') return 150;
    return 50; // デフォルト値
  })();

  const maxThrust: number = (() => {
    if (nozzleType === 'Slow') return 10;
    if (nozzleType === 'Medium') return 20;
    if (nozzleType === 'Fast') return 30;
    return 10; // デフォルト値
  })();

  const rocketTypes: RocketTypes = {
    bodyType,
    hardness,
    nozzleType
  };

  const rocketProps: RocketProps = {
    volume,
    bodyMass: mass,
    maxPressure,
    maxThrust
  };

  // --- ロケットの状態を初期化する ---
  const rocketState: RocketState = {
    position: Vector3.zero,
    rotation: Quaternion.identity,
    linearVelocity: Vector3.zero,
    angularVelocity: Vector3.zero,
    curWaterVolume: 0,
    curWaterMass: 0,
    curAirVolume: volume,
    curAirMass: 0,
    curMass: mass,
    curPressure: 0,
    curThrust: 0,
    curForce: Vector3.zero
  };

  const rocket: Rocket = {
    rbRef,
    rocketTypes,
    rocketProps,
    rocketState
  };
  return rocket;
};

// ロケットの状態を更新する関数
export const updateRocketState = () => {
  const launched = useGameStore.getState().launched;
  if (!launched) return;

  const rocket = useGameStore.getState().rocket;
  if (!rocket || !rocket.rocketState) return;

  const { position, rotation, linearVelocity, angularVelocity } = PhysicsCharactor(rocket.rbRef);
  // ここにロケットの状態を更新する処理を追加する
  let force = Vector3.zero;
  for (const planet of useGameStore.getState().planets) {
    const planetPos = planet.planetState.position;
    const rVec = Vector3.sub(planetPos, position);
    const r = rVec.magnitude;
    const G = 6.67430;
    const F = (G * planet.planetProps.mass * rocket.rocketState.curMass) / (r * r);
    force = Vector3.add(force, Vector3.mul(F, rVec.normalized));
  }

  const newRocketState: RocketState = {
    position: position,
    rotation: rotation,
    linearVelocity: linearVelocity,
    angularVelocity: angularVelocity,
    curWaterVolume: rocket.rocketState.curWaterVolume,
    curWaterMass: rocket.rocketState.curWaterMass,
    curAirVolume: rocket.rocketState.curAirVolume,
    curAirMass: rocket.rocketState.curAirMass,
    curMass: rocket.rocketState.curMass,
    curPressure: rocket.rocketState.curPressure,
    curThrust: rocket.rocketState.curThrust,
    curForce: force
  };

  useGameStore.getState().setRocketState(newRocketState);
}