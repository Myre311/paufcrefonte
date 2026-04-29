'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import JerseyMesh from './JerseyMesh';
import { useIsMobile } from '@/lib/use-is-mobile';

function SceneInvalidator({ kit, name, number }) {
  const { invalidate } = useThree();
  useEffect(() => {
    invalidate();
  }, [kit, name, number, invalidate]);
  return null;
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function JerseyScene3D({ kit, name, number }) {
  const controlsRef = useRef(null);
  const reduceMotion = prefersReducedMotion();
  const isMobile = useIsMobile();

  function handleReset() {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  }

  return (
    <div className="relative w-full aspect-square bg-pau-primary">
      <p className="absolute top-3 left-0 right-0 text-center text-[10px] font-sans uppercase tracking-widest text-white/30 z-10 pointer-events-none select-none">
        PREVISUALISATION 3D
      </p>

      <Canvas
        camera={{ position: [0, 0, 5], fov: 35 }}
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
        shadows
        frameloop="demand"
        className="w-full h-full"
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[3, 4, 3]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-3, 1, 2]} intensity={0.6} />
        <hemisphereLight args={['#ffffff', '#1A1D38', 0.4]} />

        <OrbitControls
          ref={controlsRef}
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={(2 * Math.PI) / 3}
          autoRotate={!reduceMotion && !isMobile}
          autoRotateSpeed={1.5}
          makeDefault
        />

        <JerseyMesh kit={kit} name={name} number={number} />
        <SceneInvalidator kit={kit} name={name} number={number} />
      </Canvas>

      <button
        type="button"
        onClick={handleReset}
        aria-label="Reinitialiser la rotation du maillot"
        className="absolute bottom-3 right-3 z-10 text-[10px] font-sans uppercase tracking-widest text-white/40 hover:text-white/80 border border-white/20 hover:border-white/40 px-3 py-1.5 transition-colors duration-200"
      >
        Reinitialiser
      </button>
    </div>
  );
}
