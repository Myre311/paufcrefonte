'use client';

import { Suspense, useMemo, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

useGLTF.preload('/models/jersey.glb');

const KIT_COLORS = {
  home: '#1A1D38',
  away: '#FFFFFF',
  third: '#FFCC00',
};

const KIT_TEXT_COLORS = {
  home: '#FFFFFF',
  away: '#04091D',
  third: '#04091D',
};

function buildTexture(kit, name, number) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 1024, 1024);

  ctx.fillStyle = KIT_TEXT_COLORS[kit] || '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.font = 'bold 110px Arial, sans-serif';
  ctx.fillText(name.toUpperCase().slice(0, 12), 512, 380);

  ctx.font = 'bold 380px Arial, sans-serif';
  ctx.fillText(String(number).slice(0, 2), 512, 760);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function JerseyFallback({ bodyColor, flocageTexture }) {
  const sleeveLeft = [-1.45, 0.5, 0];
  const sleeveRight = [1.45, 0.5, 0];

  return (
    <group>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.2, 2.6, 0.5]} />
        <meshStandardMaterial color={bodyColor} roughness={0.7} metalness={0.1} />
      </mesh>

      <mesh position={[0, 0, -0.251]}>
        <planeGeometry args={[2.2, 2.6]} />
        <meshStandardMaterial map={flocageTexture} transparent roughness={0.7} />
      </mesh>

      <mesh position={sleeveLeft} castShadow>
        <boxGeometry args={[0.7, 1.4, 0.5]} />
        <meshStandardMaterial color={bodyColor} roughness={0.7} metalness={0.1} />
      </mesh>

      <mesh position={sleeveRight} castShadow>
        <boxGeometry args={[0.7, 1.4, 0.5]} />
        <meshStandardMaterial color={bodyColor} roughness={0.7} metalness={0.1} />
      </mesh>

      <mesh position={[-0.45, 0.6, 0.26]}>
        <planeGeometry args={[0.3, 0.3]} />
        <meshStandardMaterial color="#FFCC00" roughness={0.5} />
      </mesh>
    </group>
  );
}

function JerseyGLB({ bodyColor, flocageTexture }) {
  const { scene } = useGLTF('/models/jersey.glb');
  const groupRef = useRef();

  // Clone so multiple instances do not share material state.
  const cloned = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    cloned.traverse((child) => {
      if (!child.isMesh) return;
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach((m) => {
        if (!m) return;
        if (m.name === 'mat_jersey_main' || child.name === 'jersey_torso' ||
            child.name === 'jersey_sleeve_left' || child.name === 'jersey_sleeve_right' ||
            m.name === 'mat_jersey_back') {
          m.color = new THREE.Color(bodyColor);
          m.roughness = 0.7;
          m.metalness = 0.0;
          // Apply the flocage texture as map on the back-facing material only.
          if (m.name === 'mat_jersey_back') {
            m.map = flocageTexture;
            m.transparent = false;
          }
          m.needsUpdate = true;
        }
      });
      child.castShadow = true;
      child.receiveShadow = true;
    });
  }, [cloned, bodyColor, flocageTexture]);

  // Scale the imported model (in meters) up to match the existing scene units.
  return <primitive ref={groupRef} object={cloned} scale={3.2} />;
}

export default function JerseyMesh({ kit, name, number }) {
  const { invalidate } = useThree();

  const bodyColor = KIT_COLORS[kit] || KIT_COLORS.home;

  const flocageTexture = useMemo(
    () => buildTexture(kit, name, number),
    [kit, name, number]
  );

  useEffect(() => {
    invalidate();
    return () => {
      flocageTexture.dispose();
    };
  }, [flocageTexture, invalidate]);

  return (
    <Suspense fallback={<JerseyFallback bodyColor={bodyColor} flocageTexture={flocageTexture} />}>
      <JerseyGLB bodyColor={bodyColor} flocageTexture={flocageTexture} />
    </Suspense>
  );
}
