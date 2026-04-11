"use client";

import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// Preload so it's ready when the canvas mounts
useGLTF.preload("/runner.glb");

interface MouseState {
  x: number;
  y: number;
}

function RunnerMesh({ mouse }: { mouse: React.MutableRefObject<MouseState> }) {
  const { scene } = useGLTF("/runner.glb");
  const groupRef = useRef<THREE.Group>(null);
  const lerpedRot = useRef({ x: 0, y: 0 });

  // Clone the scene so multiple instances don't share state
  const cloned = useRef<THREE.Group | null>(null);
  if (!cloned.current) {
    cloned.current = scene.clone(true);
  }

  useEffect(() => {
    // Apply orange/yellow tint to emissive-capable materials
    cloned.current?.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        const mesh = node as THREE.Mesh;
        const mat = mesh.material;
        if (Array.isArray(mat)) {
          mat.forEach((m) => applyTint(m));
        } else {
          applyTint(mat as THREE.Material);
        }
      }
    });
  }, []);

  function applyTint(mat: THREE.Material) {
    if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial) {
      mat.envMapIntensity = 2.5;
      // Subtle orange emissive glow on the model
      mat.emissive = new THREE.Color("#3a1400");
      mat.emissiveIntensity = 0.15;
      mat.needsUpdate = true;
    }
  }

  useFrame(() => {
    if (!groupRef.current) return;
    lerpedRot.current.x += (mouse.current.y * 0.2 - lerpedRot.current.x) * 0.04;
    lerpedRot.current.y += (mouse.current.x * 0.4 - lerpedRot.current.y) * 0.04;
    groupRef.current.rotation.x = lerpedRot.current.x;
    groupRef.current.rotation.y = lerpedRot.current.y;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.5}>
        <primitive
          object={cloned.current}
          scale={1.0}
          position={[0, -1, 0]}
          rotation={[0, Math.PI / 2.5, 0]} // Rotate to show side profile
          castShadow
          receiveShadow
        />
      </Float>
    </group>
  );
}

function FallbackBox() {
  return (
    <mesh>
      <boxGeometry args={[1, 2, 0.5]} />
      <meshStandardMaterial color="#f97316" wireframe />
    </mesh>
  );
}

export default function RunnerModel({
  compact = false,
}: {
  compact?: boolean;
}) {
  const mouse = useRef<MouseState>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", minHeight: compact ? "300px" : "600px" }}>
      <Canvas
        camera={{ position: [0, 1, compact ? 6 : 4.5], fov: compact ? 40 : 50 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]} // Cap resolution for performance
        shadows
      >
        {/* Lighting setup — orange key, yellow fill, white top */}
        <ambientLight intensity={0.5} />
        <spotLight
          position={[6, 8, 6]}
          angle={0.25}
          penumbra={0.8}
          intensity={4}
          color="#f97316"
          castShadow
          shadow-mapSize={[512, 512]} // Reduced shadow map size
        />
        <spotLight
          position={[-6, 4, -4]}
          angle={0.3}
          penumbra={1}
          intensity={2.5}
          color="#eab308"
        />
        <spotLight
          position={[0, 10, 2]}
          angle={0.4}
          penumbra={1}
          intensity={2}
          color="#ffffff"
        />
        {/* Rim light from behind — cinematic edge glow */}
        <spotLight
          position={[0, 3, -8]}
          angle={0.3}
          penumbra={0.6}
          intensity={3}
          color="#f97316"
        />

        <Suspense fallback={<FallbackBox />}>
          <RunnerMesh mouse={mouse} />
        </Suspense>

        <Environment preset="city" />

        <ContactShadows
          position={[0, -1.4, 0]}
          opacity={0.5}
          scale={8}
          blur={2}
          far={3}
          resolution={512} // Reduced shadow resolution
          color="#f97316"
        />

        <EffectComposer disableNormalPass multisampling={0}>
          <Bloom
            intensity={0.8}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            // Removed mipmapBlur as it is extremely heavy on GPUs
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
