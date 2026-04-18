"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  ContactShadows,
  Text,
  Line,
  useTexture,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// ── Mouse tracker shared state ───────────────────────────────
interface MouseState {
  x: number;
  y: number;
}

function SachetModel({
  mouse,
  textureUrl,
}: {
  mouse: React.MutableRefObject<MouseState>;
  textureUrl?: string;
}) {
  const texture = textureUrl ? useTexture(textureUrl) : null;
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  // Lerped values for smooth mouse follow
  const lerpedRot = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Lerp rotation toward mouse
    lerpedRot.current.x += (mouse.current.y * 0.35 - lerpedRot.current.x) * 0.05;
    lerpedRot.current.y += (mouse.current.x * 0.55 - lerpedRot.current.y) * 0.05;

    if (groupRef.current) {
      groupRef.current.rotation.x = lerpedRot.current.x;
      groupRef.current.rotation.y = lerpedRot.current.y + Math.sin(t * 0.3) * 0.04;
    }

    // Subtle self-rotation for showcase feel
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }

    // Light follows mouse for dynamic metallic sheen
    if (lightRef.current) {
      lightRef.current.position.x += (mouse.current.x * 8 - lightRef.current.position.x) * 0.08;
      lightRef.current.position.y += (-mouse.current.y * 8 - lightRef.current.position.y) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Mouse-reactive point light */}
      <pointLight ref={lightRef} position={[3, 3, 5]} intensity={8} color="#f97316" distance={20} />

      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.8}>
        <mesh ref={meshRef} castShadow>
          <boxGeometry args={[2.8, 4.5, 0.35]} />
          
          {/* Multi-material: Front face gets texture, others stay dark metallic */}
          {texture ? (
            <>
              <meshStandardMaterial
                attach="material-0" // Right
                color="#0a0a0a"
                roughness={0.25}
                metalness={0.85}
              />
              <meshStandardMaterial
                attach="material-1" // Left
                color="#0a0a0a"
                roughness={0.25}
                metalness={0.85}
              />
              <meshStandardMaterial
                attach="material-2" // Top
                color="#0a0a0a"
                roughness={0.25}
                metalness={0.85}
              />
              <meshStandardMaterial
                attach="material-3" // Bottom
                color="#0a0a0a"
                roughness={0.25}
                metalness={0.85}
              />
              <meshStandardMaterial
                attach="material-4" // Front
                map={texture}
                roughness={0.3}
                metalness={0.6}
                envMapIntensity={2}
              />
              <meshStandardMaterial
                attach="material-5" // Back
                color="#0a0a0a"
                roughness={0.25}
                metalness={0.85}
              />
            </>
          ) : (
            <meshStandardMaterial
              color="#0a0a0a"
              roughness={0.25}
              metalness={0.85}
              envMapIntensity={3}
            />
          )}

          {!texture && (
            <>
              {/* Brand Name Text */}
              <Text
                position={[-0.1, 1.3, 0.21]}
                fontSize={0.45}
                color="#eab308"
                font="https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NJtEtq.woff"
                anchorX="center"
                anchorY="middle"
                fontStyle="italic"
              >
                DualCarb
              </Text>
              <Text
                position={[0, 0.9, 0.21]}
                fontSize={0.35}
                color="#f97316"
                font="https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NJtEtq.woff"
                anchorX="center"
                anchorY="middle"
                fontStyle="italic"
                letterSpacing={0.1}
              >
                ENDURANCE
              </Text>

              {/* Diagonal Graphic Accents */}
              <Line points={[[-1.4, -0.2, 0.21], [1.4, 0.5, 0.21]]} color="#f97316" lineWidth={5} />
              <Line points={[[-1.4, -0.4, 0.21], [1.4, 0.3, 0.21]]} color="#eab308" lineWidth={2} />

              {/* Stats */}
              <Text position={[-0.6, -1, 0.21]} fontSize={0.5} color="#f97316" font="https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NJtEtq.woff" anchorX="center" anchorY="middle" fontStyle="italic">30g</Text>
              <Text position={[-0.6, -1.4, 0.21]} fontSize={0.15} color="#ffffff" anchorX="center" anchorY="middle">CARBS</Text>
              <Text position={[-0.6, -1.6, 0.21]} fontSize={0.1} color="#a1a1aa" anchorX="center" anchorY="middle">PER SERVING</Text>
              <Text position={[0.6, -1.1, 0.21]} fontSize={0.3} color="#ffffff" font="https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NJtEtq.woff" anchorX="center" anchorY="middle" fontStyle="italic">2:1</Text>
              <Text position={[0.6, -1.4, 0.21]} fontSize={0.12} color="#a1a1aa" anchorX="center" anchorY="middle" maxWidth={1} textAlign="center">MALTODEXTRIN TO FRUCTOSE RATIO</Text>
            </>
          )}

          {/* Seals */}
          <mesh position={[0, 2.35, 0]}>
            <boxGeometry args={[2.9, 0.2, 0.1]} />
            <meshStandardMaterial color="#000000" roughness={0.9} metalness={0.1} />
          </mesh>
          <mesh position={[0, -2.35, 0]}>
            <boxGeometry args={[2.9, 0.2, 0.1]} />
            <meshStandardMaterial color="#000000" roughness={0.9} metalness={0.1} />
          </mesh>
        </mesh>
      </Float>
    </group>
  );
}

export default function FloatingSachet({
  compact = false,
  textureUrl,
}: {
  compact?: boolean;
  textureUrl?: string;
}) {
  const mouse = useRef<MouseState>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      // Normalize to [-1, 1] relative to center of viewport
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ minHeight: compact ? "280px" : "580px" }}
    >
      <Canvas
        camera={{ position: [0, 0, compact ? 10 : 8], fov: compact ? 35 : 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={0.8} intensity={5} color="#f97316" castShadow />
        <spotLight position={[-8, -8, -5]} angle={0.25} penumbra={1} intensity={3.5} color="#eab308" />
        <spotLight position={[0, 8, 6]} angle={0.3} penumbra={1} intensity={2.5} color="#ffffff" />

        <SachetModel mouse={mouse} textureUrl={textureUrl} />

        <Environment preset="city" />
        <ContactShadows
          position={[0, compact ? -2.8 : -3.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2.5}
          far={4}
          color="#f97316"
        />

        {/* Bloom post-processing — makes orange edges glow */}
        <EffectComposer>
          <Bloom
            intensity={0.6}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
