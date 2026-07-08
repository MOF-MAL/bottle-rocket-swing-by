import { PhysicsCharactor } from '@/utils/PhysicsComponentUtils';
import { Vector2, Vector3, Quaternion } from '@/types/math';
import { useGameStore } from '@/store/gameStore';
import { RapierRigidBody } from '@react-three/rapier';
import { Rocket, RocketProps, RocketState, RocketTypes } from '@/types/Rocket';

// ロケットを作る関数
export const createRocket = ({ bodyType, hardness, nozzleType }: RocketTypes): Rocket => {
  const rocketTypes: RocketTypes = {
    bodyType,
    hardness,
    nozzleType
  };
  
  // --- ロケットのパラメータを計算する ---
  const { volume, bodyMass, maxPressure, maxThrust } = calculateRocketParameters(bodyType, hardness, nozzleType);

  const rocketProps: RocketProps = {
    volume,
    bodyMass: bodyMass,
    maxPressure,
    maxThrust
  };

  // --- ロケットの状態を初期化する ---
  const rocketState: RocketState = initializeRocketState(bodyMass, volume);

  const rocket: Rocket = {
    rocketTypes,
    rocketProps,
    rocketState
  };
  return rocket;
};

// ロケットのパラメータを計算する関数
const calculateRocketParameters = (bodyType: 'Small' | 'Medium' | 'Large', hardness: 'Soft' | 'Medium' | 'Hard', nozzleType: 'Slow' | 'Medium' | 'Fast'): RocketProps => {
  const volume: number = (() => {
    if (bodyType === 'Small') return 100;
    if (bodyType === 'Medium') return 200;
    if (bodyType === 'Large') return 300;
    return 100; // デフォルト値
  })();

  const bodyMass1: number = (() => {
    if (bodyType === 'Small') return 0.01;
    if (bodyType === 'Medium') return 0.015;
    if (bodyType === 'Large') return 0.02;
    return 0.01; // デフォルト値
  })();

  const bodyMass2: number = (() => {
    if (hardness === 'Soft') return 1;
    if (hardness === 'Medium') return 1.5;
    if (hardness === 'Hard') return 2;
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

  return {
    volume,
    bodyMass: bodyMass1 * bodyMass2,
    maxPressure,
    maxThrust
  };
}

// ロケットの状態を初期化する関数
export const initializeRocketState = (bodyMass: number, volume: number): RocketState => {
  return {
    position: Vector3.zero,
    rotE: Vector3.zero,
    rotZ: 0,
    linearVelocity: Vector3.zero,
    curWaterVolume: 0,
    curWaterMass: 0,
    curAirVolume: volume,
    curAirMass: 0,
    curMass: bodyMass,
    curPressure: 0,
    curThrust: 0.7
  };
};


// ロケットの状態を更新する関数
export const updateRocketState = (rbRef: React.RefObject<RapierRigidBody | null>) => {
  if (!rbRef.current) return;

  const launched = useGameStore.getState().launched;
  if (!launched) return;

  const rocket = useGameStore.getState().rocket;
  if (!rocket || !rocket.rocketState) return;
  
  const { position, linearVelocity } = PhysicsCharactor(rbRef);

  // --- ロケットの向きを速度方向に合わせる ---
  const rotation = alignRocketWithVelocity(rbRef, rocket, linearVelocity);

  // --- 惑星の引力を計算してロケットに加える ---
  applyGravity(rbRef, rocket, position);

  // --- ロケットに推力を与える ---
  const thrustMagnitude = rocket.rocketState.curThrust; // 推力の大きさを取得
  const maxSpeed = 0.05; // 最大速度を設定
  const rot = Quaternion.Euler(rotation);
  const thrustDirection = Quaternion.RotateVector(rot, new Vector3(0, 1, 0)).normalized; // ロケットの上方向を推力方向とする
  const thrustForce = Vector3.mul(thrustMagnitude, thrustDirection);
  // 推力方向の速度が最大速度を超えていない場合にのみ推力を加える
  const speedInThrustDirection = Vector3.Dot(linearVelocity, thrustDirection);
  if (speedInThrustDirection < maxSpeed) {
    const forceToAdd = Vector3.Vector3ToTHREE(Vector3.mul(1 - speedInThrustDirection / maxSpeed, thrustForce));
    rbRef.current?.addForce(forceToAdd, true);
    console.log("Thrust applied:", forceToAdd);
  }

  // --- ロケットの状態を更新する ---
  const newRocketState: RocketState = {
    position: position,
    rotE: rotation,
    rotZ: rotation.z,
    linearVelocity: linearVelocity,
    curWaterVolume: rocket.rocketState.curWaterVolume,
    curWaterMass: rocket.rocketState.curWaterMass,
    curAirVolume: rocket.rocketState.curAirVolume,
    curAirMass: rocket.rocketState.curAirMass,
    curMass: rocket.rocketState.curMass,
    curPressure: rocket.rocketState.curPressure,
    curThrust: rocket.rocketState.curThrust
  };

  useGameStore.getState().setRocketState(newRocketState);
}


// 速度がほぼゼロでなければ、ロケットの向きを速度方向に合わせる関数
const alignRocketWithVelocity = (rbRef: React.RefObject<RapierRigidBody | null>, rocket: Rocket, linVel: Vector3) : Vector3 => {
  const isMoving = linVel.magnitude > 0.00001; // 速度がほぼゼロでないかを判定
  
  const velEuler = isMoving ? Vector2.AngleTo(Vector2.up, new Vector2(linVel.x, linVel.y)) : rocket.rocketState.rotZ;
  const rotation = new Vector3(0, 0, velEuler);
  rbRef.current?.setRotation(Quaternion.Euler(rotation), true);
  return rotation;
}


// 重力を計算してロケットに加える関数
const applyGravity = (rbRef: React.RefObject<RapierRigidBody | null>, rocket: Rocket, position: Vector3) => {
  for (const planet of useGameStore.getState().planets) {
    if (!planet.planetState) {
      continue; // 惑星の状態が存在しない場合はスキップ
    }
    const planetPos = planet.planetState.position;
    const rVec = Vector3.sub(planetPos, position);
    const r = rVec.magnitude;
    const G = 6.67430 * 10**(-11); // 万有引力定数
    const F = (G * planet.planetProps.mass * rocket.rocketState.curMass) / (r * r);
    // めりこんでいなければ、引力を加える
    if (r > planet.planetProps.radius) {
      rbRef.current?.addForce(Vector3.mul(F, rVec.normalized), true);
    }
  }
}