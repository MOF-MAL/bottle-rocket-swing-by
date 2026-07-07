import { Vector3 } from '@/types/math';

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
    rotE: Vector3; // Euler角での回転を表す
    linearVelocity: Vector3;
    angularVelocity: Vector3;
}