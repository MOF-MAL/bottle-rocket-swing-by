import * as THREE from "three";
import { Vector3 } from "./vector3";

export class Quaternion {
    constructor(public x: number = 0, public y: number = 0, public z: number = 0, public w: number = 1) {}

    // --- プロパティ ---
    get eulerAngles(): Vector3 {
        const q = new THREE.Quaternion(this.x, this.y, this.z, this.w);
        const euler = new THREE.Euler().setFromQuaternion(q);
        return new Vector3(euler.x, euler.y, euler.z);
    }

    // --- 静的メソッド ---
    static THREEToQuaternion(q: THREE.Quaternion): Quaternion {
        return new Quaternion(q.x, q.y, q.z, q.w);
    }

    static QuaternionToTHREE(q: Quaternion): THREE.Quaternion {
        return new THREE.Quaternion(q.x, q.y, q.z, q.w);
    }

    static Euler(euler: Vector3): Quaternion {
        const eulerTHREE = new THREE.Euler(euler.x, euler.y, euler.z);
        const qTHREE = new THREE.Quaternion().setFromEuler(eulerTHREE);
        return Quaternion.THREEToQuaternion(qTHREE);
    }

    // --- 演算メソッド ---
    static Multiply(q1: Quaternion, q2: Quaternion): Quaternion {
        const q1THREE = Quaternion.QuaternionToTHREE(q1);
        const q2THREE = Quaternion.QuaternionToTHREE(q2);
        const resultTHREE = q1THREE.multiply(q2THREE);
        return Quaternion.THREEToQuaternion(resultTHREE);
    }

    static RotateVector(q: Quaternion, v: Vector3): Vector3 {
        const qTHREE = Quaternion.QuaternionToTHREE(q);
        const vTHREE = Vector3.Vector3ToTHREE(v);
        const rotatedVTHREE = vTHREE.applyQuaternion(qTHREE);
        return Vector3.THREEToVector3(rotatedVTHREE);
    }
}