"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Simple wave effect for cloth simulation
    float noiseFreq = 1.5;
    float noiseAmp = 0.5;
    vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
    
    // Create rippling effect
    pos.z += sin(noisePos.x) * noiseAmp * sin(pos.y * 3.14);
    pos.z += cos(noisePos.y * 2.0 + uTime) * 0.2;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  
  void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    
    // Add subtle vignette or darkening to the edges
    float dist = distance(vUv, vec2(0.5));
    texColor.rgb *= smoothstep(0.8, 0.2, dist) * 0.5 + 0.5;
    
    gl_FragColor = texColor;
  }
`;

function ClothMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  // Using the previously generated premium image for the cloth texture
  const texture = useTexture("/images/hero_bg.png");
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uTexture: { value: texture }
  }), [texture]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-0.1, 0, 0]} scale={[1.4, 1.4, 1.4]}>
      <planeGeometry args={[16, 9, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function ClothSimulation() {
  return (
    <div className="absolute inset-0 z-0 bg-[#1a1a1a]">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} gl={{ antialias: true, alpha: false }}>
        <color attach="background" args={['#1a1a1a']} />
        <Suspense fallback={null}>
          <ClothMesh />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-background/50 z-10" />
    </div>
  );
}
