import * as THREE from 'three';

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