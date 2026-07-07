import * as THREE from 'three';

export class Vector2 {
    constructor(public x: number = 0, public y: number = 0) {}

    // --- プロパティ ---
    get magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get normalized(): Vector2 {
        const mag = this.magnitude;
        if (mag === 0) return new Vector2(0, 0);
        return new Vector2(this.x / mag, this.y / mag);
    }

    // --- 静的プロパティ ---
    static get up() { return new Vector2(0, 1); }
    static get down() { return new Vector2(0, -1); }
    static get right() { return new Vector2(1, 0); }
    static get left() { return new Vector2(-1, 0); }
    static get zero() { return new Vector2(0, 0); }
    static get one() { return new Vector2(1, 1); }

    // --- メソッド ---
    static THREE2ToVector2(v: THREE.Vector2): Vector2 {
        return new Vector2(v.x, v.y);
    }

    static Vector2ToTHREE(v: Vector2): THREE.Vector2 {
        return new THREE.Vector2(v.x, v.y);
    }

    static Distance(a: Vector2, b: Vector2): number {
        return Vector2.Vector2ToTHREE(a).distanceTo(Vector2.Vector2ToTHREE(b));
    }

    static Lerp(a: Vector2, b: Vector2, t: number): Vector2 {
        const vTHREE = Vector2.Vector2ToTHREE(a).lerp(Vector2.Vector2ToTHREE(b), t);
        return Vector2.THREE2ToVector2(vTHREE);
    }

    static Cross(lhs: Vector2, rhs: Vector2): number {
        return Vector2.Vector2ToTHREE(lhs).cross(Vector2.Vector2ToTHREE(rhs));
    }

    static Dot(lhs: Vector2, rhs: Vector2): number {
        return Vector2.Vector2ToTHREE(lhs).dot(Vector2.Vector2ToTHREE(rhs));
    }

    static RotateVector(rotation: number, v: Vector2): Vector2 {
        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);
        const x = v.x * cos - v.y * sin;
        const y = v.x * sin + v.y * cos;
        return new Vector2(x, y);
    }

    static AngleTo(from: Vector2, to: Vector2): number {
        const fromTHREE = Vector2.Vector2ToTHREE(from).normalize();
        const toTHREE = Vector2.Vector2ToTHREE(to).normalize();
        // 符号付きの角度を計算するためにatan2を使用
        const angle = Math.atan2(toTHREE.y, toTHREE.x) - Math.atan2(fromTHREE.y, fromTHREE.x);
        return angle;
    }

    // --- 演算メソッド ---
    static add(v1: Vector2, v2: Vector2): Vector2 {
        const resultTHREE = Vector2.Vector2ToTHREE(v1).add(Vector2.Vector2ToTHREE(v2));
        return Vector2.THREE2ToVector2(resultTHREE);
    }

    static sub(v1: Vector2, v2: Vector2): Vector2 {
        const resultTHREE = Vector2.Vector2ToTHREE(v1).sub(Vector2.Vector2ToTHREE(v2));
        return Vector2.THREE2ToVector2(resultTHREE);
    }

    static mul(scalar: number, v: Vector2): Vector2 {
        const resultTHREE = Vector2.Vector2ToTHREE(v).multiplyScalar(scalar);
        return Vector2.THREE2ToVector2(resultTHREE);
    }
}



export class Vector3 {
    constructor(public x: number = 0, public y: number = 0, public z: number = 0) {}

    // --- プロパティ ---
    get magnitude(): number {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    get normalized(): Vector3 {
      const mag = this.magnitude;
      if (mag === 0) return new Vector3(0, 0, 0);
      return new Vector3(this.x / mag, this.y / mag, this.z / mag);
    }

    // --- 静的プロパティ ---

    static get up() { return new Vector3(0, 1, 0); }
    static get down() { return new Vector3(0, -1, 0); }
    static get right() { return new Vector3(1, 0, 0); }
    static get left() { return new Vector3(-1, 0, 0); }
    // ※注意: Three.jsの標準に合わせて Forward を -Z にしています
    static get forward() { return new Vector3(0, 0, -1); }
    static get back() { return new Vector3(0, 0, 1); }
    static get zero() { return new Vector3(0, 0, 0); }
    static get one() { return new Vector3(1, 1, 1); }

    // --- メソッド ---
    static THREEToVector3(v: THREE.Vector3): Vector3 {
      return new Vector3(v.x, v.y, v.z);
    }

    static Vector3ToTHREE(v: Vector3): THREE.Vector3 {
      return new THREE.Vector3(v.x, v.y, v.z);
    }

    static Vector3ToEuler(v: Vector3): THREE.Euler {
      return new THREE.Euler(v.x, v.y, v.z);
    }

    static Distance(a: Vector3, b: Vector3): number {
      return Vector3.Vector3ToTHREE(a).distanceTo(Vector3.Vector3ToTHREE(b));
    }

    static Lerp(a: Vector3, b: Vector3, t: number): Vector3 {
      const vTHREE = Vector3.Vector3ToTHREE(a).lerp(Vector3.Vector3ToTHREE(b), t);
      return Vector3.THREEToVector3(vTHREE);
    }

    static Cross(lhs: Vector3, rhs: Vector3): Vector3 {
      const crossTHREE = Vector3.Vector3ToTHREE(lhs).cross(Vector3.Vector3ToTHREE(rhs));
      return Vector3.THREEToVector3(crossTHREE);
    }

    static Dot(lhs: Vector3, rhs: Vector3): number {
      return Vector3.Vector3ToTHREE(lhs).dot(Vector3.Vector3ToTHREE(rhs));
    }

    // --- 演算メソッド ---
    static add(v1: Vector3, v2: Vector3): Vector3 {
      const resultTHREE = Vector3.Vector3ToTHREE(v1).add(Vector3.Vector3ToTHREE(v2));
      return Vector3.THREEToVector3(resultTHREE);
    }

    static sub(v1: Vector3, v2: Vector3): Vector3 {
      const resultTHREE = Vector3.Vector3ToTHREE(v1).sub(Vector3.Vector3ToTHREE(v2));
      return Vector3.THREEToVector3(resultTHREE);
    }

    static mul(scalar: number, v: Vector3): Vector3 {
      const resultTHREE = Vector3.Vector3ToTHREE(v).multiplyScalar(scalar);
      return Vector3.THREEToVector3(resultTHREE);
    }
}



export class Quaternion {
    constructor(public x: number = 0, public y: number = 0, public z: number = 0, public w: number = 1) {}

    // --- プロパティ ---
    get eulerAnglesV(): Vector3 {
        const q = new THREE.Quaternion(this.x, this.y, this.z, this.w);
        const euler = new THREE.Euler().setFromQuaternion(q);
        return new Vector3(euler.x, euler.y, euler.z);
    }

    get eulerAnglesE(): THREE.Euler {
        const q = new THREE.Quaternion(this.x, this.y, this.z, this.w);
        return new THREE.Euler().setFromQuaternion(q);
    }

    // --- 静的メソッド ---
    static THREEToQuaternion(q: THREE.Quaternion): Quaternion {
        return new Quaternion(q.x, q.y, q.z, q.w);
    }

    static QuaternionToTHREE(q: Quaternion): THREE.Quaternion {
        return new THREE.Quaternion(q.x, q.y, q.z, q.w);
    }
    
    static get identity(): Quaternion {
        return new Quaternion(0, 0, 0, 1);
    }

    static Euler(euler: Vector3): Quaternion {
        const eulerTHREE = new THREE.Euler(euler.x, euler.y, euler.z);
        const qTHREE = new THREE.Quaternion().setFromEuler(eulerTHREE);
        return Quaternion.THREEToQuaternion(qTHREE);
    }

    static Inverse(q: Quaternion): Quaternion {
        const qTHREE = Quaternion.QuaternionToTHREE(q);
        const invQTHREE = qTHREE.invert();
        return Quaternion.THREEToQuaternion(invQTHREE);
    }

    // ベクトルの方向を向くクォータニオンを返す
    static LookAt(vec1: Vector3 = Vector3.forward, vec2: Vector3): Quaternion {
        const vecTHREE1 = Vector3.Vector3ToTHREE(vec1).normalize();
        const vecTHREE2 = Vector3.Vector3ToTHREE(vec2).normalize();
        const qTHREE = new THREE.Quaternion().setFromUnitVectors(vecTHREE1, vecTHREE2);
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