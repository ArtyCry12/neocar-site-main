"use client";

import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, ContactShadows, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import * as THREE from "three";

import { canRender3D } from "@/lib/device";

const MODEL_URL =
  process.env.NEXT_PUBLIC_HERO_GLB_URL ?? "/models/forklift.opt.glb";

function ForkliftPlaceholder({ active }: { active: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!active || !group.current) return;
    group.current.rotation.y += delta * 0.2;
  });

  return (
    <group ref={group} position={[0, -0.65, 0]} rotation={[0, Math.PI, 0]}>
      <mesh>
        <boxGeometry args={[2.35, 1.05, 3.1]} />
        <meshStandardMaterial
          color="#facc15"
          metalness={0.38}
          roughness={0.42}
        />
      </mesh>
      <mesh position={[0, 0.85, 1.35]}>
        <boxGeometry args={[1.75, 0.32, 0.32]} />
        <meshStandardMaterial
          color="#27272a"
          metalness={0.55}
          roughness={0.35}
        />
      </mesh>
      <mesh position={[0, -0.82, 1.25]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.34, 0.34, 0.12, 28]} />
        <meshStandardMaterial
          color="#18181b"
          metalness={0.65}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[0, -0.82, -1.25]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.34, 0.34, 0.12, 28]} />
        <meshStandardMaterial
          color="#18181b"
          metalness={0.65}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

function ForkliftGLB({
  active,
  isMobile,
}: {
  active: boolean;
  isMobile: boolean;
}) {
  const { scene } = useGLTF(MODEL_URL);
  const group = useRef<THREE.Group>(null);

  const model = useMemo(() => {
    const root = scene.clone();
    root.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = false;
        mesh.receiveShadow = false;
      }
    });
    const box = new THREE.Box3().setFromObject(root);
    const center = box.getCenter(new THREE.Vector3());
    root.position.sub(center);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z, 0.001);
    /* Mobile: larger footprint for hero band (desktop unchanged). */
    const target = isMobile ? 7.85 : 3.25;
    root.scale.setScalar(target / maxDim);
    return root;
  }, [scene, isMobile]);

  useEffect(() => {
    if (group.current) {
      group.current.rotation.set(0.08, Math.PI, 0);
    }
  }, []);

  useFrame((_, delta) => {
    if (!active || !group.current) return;
    group.current.rotation.y += delta * 0.2;
  });

  /* Mobile: center in tall canvas band (desktop branch unchanged). */
  const y = isMobile ? -0.42 : -0.35;
  const z = isMobile ? 0.06 : 0;

  return (
    <group ref={group} position={[0, y, z]}>
      <primitive object={model} />
    </group>
  );
}

type Props = {
  active: boolean;
  isMobile?: boolean;
};

export default function HeroCanvas({ active, isMobile = false }: Props) {
  const [can3D, setCan3D] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => {
      setCan3D(canRender3D());
      setIsDesktop(mq.matches);
    };
    const id = requestAnimationFrame(apply);
    mq.addEventListener("change", apply);
    return () => {
      cancelAnimationFrame(id);
      mq.removeEventListener("change", apply);
    };
  }, []);

  const useModel = process.env.NEXT_PUBLIC_HERO_USE_GLB !== "false";

  if (!can3D) {
    return (
      <div className="pointer-events-none relative h-full min-h-[78svh] w-full lg:min-h-[100svh]">
        <Image
          src="/media/hero/marquee-1.jpg"
          alt="NEOCAR — складская техника, фоновое фото"
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 55vw"
          className="object-cover brightness-[0.38]"
        />
      </div>
    );
  }

  const dprMax = isDesktop ? 1.5 : 1;
  const showShadowsAndHemi = isDesktop;
  const camera = isMobile
    ? { position: [0, 0.42, 6.1] as const, fov: 43 }
    : { position: [0, 1.0, 5.5] as const, fov: 44 };

  return (
    <div className="pointer-events-none relative h-full min-h-[78svh] w-full lg:min-h-[100svh]">
      <Canvas
        camera={camera}
        gl={{ antialias: isDesktop, alpha: true }}
        className="h-full w-full min-h-[78svh] lg:min-h-[100svh]"
        dpr={[1, dprMax]}
      >
        <color attach="background" args={["#0a0a0a"]} />
        <ambientLight intensity={showShadowsAndHemi ? 0.65 : 0.72} />
        {showShadowsAndHemi ? (
          <hemisphereLight
            color="#fff8f0"
            groundColor="#1f1e1e"
            intensity={0.55}
          />
        ) : null}
        <directionalLight
          position={[4.5, 8, 3]}
          intensity={showShadowsAndHemi ? 1.25 : 1.05}
          castShadow={false}
        />
        <Suspense
          fallback={
            <mesh position={[0, -0.65, 0]}>
              <boxGeometry args={[0.01, 0.01, 0.01]} />
              <meshBasicMaterial transparent opacity={0} />
            </mesh>
          }
        >
          <AdaptiveDpr />
          {showShadowsAndHemi ? (
            <ContactShadows
              opacity={0.18}
              position={[0, -1.05, 0]}
              scale={14}
              blur={2.3}
              frames={1}
            />
          ) : null}
          <ErrorBoundary fallback={<ForkliftPlaceholder active={active} />}>
            {useModel ? (
              <ForkliftGLB active={active} isMobile={isMobile} />
            ) : (
              <ForkliftPlaceholder active={active} />
            )}
          </ErrorBoundary>
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
