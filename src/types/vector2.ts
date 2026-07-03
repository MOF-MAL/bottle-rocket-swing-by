import * as THREE from "three";

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