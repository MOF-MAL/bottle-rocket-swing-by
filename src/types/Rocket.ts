import { Vector3 } from '@/types/math';

export interface Rocket {
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
  rotE: Vector3;
  rotZ: number;
  linearVelocity: Vector3;

  // --- ロケットの状態を管理するための変数 ---
  curWaterVolume: number;
  curWaterMass: number;
  curAirVolume: number;
  curAirMass: number;
  curMass: number;
  curPressure: number;
  curThrust: number;
}