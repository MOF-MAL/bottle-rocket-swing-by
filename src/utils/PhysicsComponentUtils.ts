'use client';

import { RapierRigidBody } from '@react-three/rapier';
import { Vector3, Quaternion } from '@/types/math';

export interface PhysicsCharactor {
    position: Vector3;
    rotE: Vector3;
    linearVelocity: Vector3;
    angularVelocity: Vector3;
    Translate(translation: Vector3): void;
    Rotate(rotation: Quaternion): void;
    SetPosition(position: Vector3): void;
    SetRotation(rotation: Quaternion): void;
    SetLinearVelocity(velocity: Vector3): void;
    SetAngularVelocity(velocity: Vector3): void;
}

export const PhysicsCharactor = (rbRef: React.RefObject<RapierRigidBody | null>): PhysicsCharactor => {
    return {
        // --- 物理キャラクターの状態を取得するためのプロパティ ---
        get position(): Vector3 {
            if (!rbRef.current) return Vector3.zero;
            const pos = rbRef.current.translation();
            return new Vector3(pos.x, pos.y, pos.z);
        },

        get rotE(): Vector3 {
            if (!rbRef.current) return Vector3.zero;
            const rot = rbRef.current.rotation();
            const quaternion = new Quaternion(rot.x, rot.y, rot.z, rot.w);
            return quaternion.eulerAnglesV;
        },

        get linearVelocity(): Vector3 {
            if (!rbRef.current) return Vector3.zero;
            const vel = rbRef.current.linvel();
            return new Vector3(vel.x, vel.y, vel.z);
        },

        get angularVelocity(): Vector3 {
            if (!rbRef.current) return Vector3.zero;
            const angVel = rbRef.current.angvel();
            return new Vector3(angVel.x, angVel.y, angVel.z);
        },

        // --- 物理キャラクターの状態を更新するためのメソッド ---

        // Vector3だけ移動する(現在の位置にtranslationを加算する)
        Translate(translation: Vector3) {
            if (!rbRef.current) return;
            const curPos = rbRef.current.translation();
            const newPos = {
                x: curPos.x + translation.x,
                y: curPos.y + translation.y,
                z: curPos.z + translation.z,
            };
            rbRef.current.setTranslation(newPos, true);
        },

        // Quaternionだけ回転する(現在の回転にrotationを加算する)
        Rotate(rotation: Quaternion) {
            if (!rbRef.current) return;
            const curRot = rbRef.current.rotation();
            const newRot = {
                x: curRot.x + rotation.x,
                y: curRot.y + rotation.y,
                z: curRot.z + rotation.z,
                w: curRot.w + rotation.w,
            };
            rbRef.current.setRotation(newRot, true);
        },

        SetPosition(position: Vector3) {
            if (!rbRef.current) return;
            rbRef.current.setTranslation({ x: position.x, y: position.y, z: position.z }, true);
        },

        SetRotation(rotation: Quaternion) {
            if (!rbRef.current) return;
            rbRef.current.setRotation({ x: rotation.x, y: rotation.y, z: rotation.z, w: rotation.w }, true);
        },

        SetLinearVelocity(velocity: Vector3) {
            if (!rbRef.current) return;
            rbRef.current.setLinvel({ x: velocity.x, y: velocity.y, z: velocity.z }, true);
        },

        SetAngularVelocity(velocity: Vector3) {
            if (!rbRef.current) return;
            rbRef.current.setAngvel({ x: velocity.x, y: velocity.y, z: velocity.z }, true);
        }
    }
};
