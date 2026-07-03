// src/app/page.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics, RigidBody } from '@react-three/rapier';

import { Rocket } from '@/components/Rocket';
// これから作るPlanetコンポーネントをインポートしておく
import { Planet } from '@/components/Planet'; 

export default function Home() {
  return (
    <main style={{ width: '100vw', height: '100vh', background: '#050510' }}> {/* 宇宙っぽく少し暗い色に */}
      {/* カメラを少し引き（Z: 25）にして全体を見やすくします */}
      <Canvas camera={{ position: [0, 0, 25], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.0} />

        {/* 【UnityのPhysics設定に相当】
          gravity={[0, 0, 0]} を指定することで、下向きの基本重力を消し「無重力空間」にします。
        */}
        <Physics gravity={[0, 0, 0]}>
          
          {/* ロケットを配置（後でZ軸をロックします） */}
          <Rocket />

          {/* 惑星を配置（X: 10, Y: 10 の位置に置きます）
            ※この位置情報を後でロケット側の引力計算に使います
          */}
          <Planet position={[10, 10, 0]} />

        </Physics>

        <OrbitControls />
      </Canvas>
    </main>
  );
}