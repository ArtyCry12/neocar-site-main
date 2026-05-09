"use client";

import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, ContactShadows, useGLTF } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import * as THREE from "three";

import { heroStages } from "@/content/stages";

const MODEL_URL =
  process.env.NEXT_PUBLIC_HERO_GLB_URL ?? "/models/forklift.opt.glb";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpVec(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

function stageBlend(progress: number) {
  const sp = progress * 4;
  const si = Math.min(3, Math.max(0, Math.floor(sp)));
  const lt = si < 3 ? sp - si : 0;
  const cur = heroStages[si];
  const next = si < 3 ? heroStages[si + 1] : cur;
  return { cur, next, lt };
}

function ForkliftPlaceholder({
  progress,
  active,
}: {
  progress: MotionValue<number>;
  active: boolean;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!active || !group.current) return;
    const p = progress.get();
    const { cur, next, lt } = stageBlend(p);
    const pos = lerpVec(cur.model.position, next.model.position, lt);
    const rot = lerpVec(cur.model.rotation, next.model.rotation, lt);
    const scale = lerp(cur.model.scale, next.model.scale, lt);
    group.current.position.set(...pos);
    group.current.rotation.set(...rot);
    group.current.scale.setScalar(scale);
    group.current.lookAt(
      new THREE.Vector3(...lerpVec(cur.model.lookAt, next.model.lookAt, lt)),
    );
  });

  return (
    <group ref={group} position={[0, -0.65, 0]}>
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
  progress,
  active,
}: {
  progress: MotionValue<number>;
  active: boolean;
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
    const target = 3.25;
    root.scale.setScalar(target / maxDim);
    return root;
  }, [scene]);

  useFrame(() => {
    if (!active || !group.current) return;
    const p = progress.get();
    const { cur, next, lt } = stageBlend(p);
    const pos = lerpVec(cur.model.position, next.model.position, lt);
    const rot = lerpVec(cur.model.rotation, next.model.rotation, lt);
    const scale = lerp(cur.model.scale, next.model.scale, lt);
    group.current.position.set(...pos);
    group.current.rotation.set(...rot);
    group.current.scale.setScalar(scale);
    group.current.lookAt(
      new THREE.Vector3(...lerpVec(cur.model.lookAt, next.model.lookAt, lt)),
    );
  });

  return (
    <group ref={group} position={[0, -0.65, 0]}>
      <primitive object={model} />
    </group>
  );
}

type Props = {
  progress: MotionValue<number>;
  active: boolean;
};

export default function HeroCanvas({ progress, active }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    const section = document.querySelector('[data-testid="home-hero"]');
    if (!section) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.25) {
          try {
            useGLTF.preload(MODEL_URL);
          } catch {
            /* ignore preload failures */
          }
          io.disconnect();
        }
      },
      { threshold: [0.25] },
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  const useModel = process.env.NEXT_PUBLIC_HERO_USE_GLB !== "false";

  if (isMobile) {
    return (
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/media/hero/marquee-1.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.38]"
        />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 1.1, 6.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        className="h-full w-full"
        dpr={[1, isMobile ? 1.25 : 1.5]}
      >
        <color attach="background" args={["#050506"]} />
        <ambientLight intensity={0.65} />
        <hemisphereLight
          color="#fff8f0"
          groundColor="#1f1e1e"
          intensity={0.55}
        />
        <directionalLight
          position={[4.5, 8, 3]}
          intensity={1.25}
          castShadow={false}
        />
        <Suspense
          fallback={
            <mesh position={[0, -0.65, 0]}>
              <icosahedronGeometry args={[0.8, 1]} />
              <meshStandardMaterial color="#27272a" wireframe />
            </mesh>
          }
        >
          <AdaptiveDpr />
          <ContactShadows
            opacity={0.18}
            position={[0, -1.05, 0]}
            scale={14}
            blur={2.3}
            frames={1}
          />
          <ErrorBoundary
            fallback={<ForkliftPlaceholder progress={progress} active={active} />}
          >
            {useModel ? (
              <ForkliftGLB progress={progress} active={active} />
            ) : (
              <ForkliftPlaceholder progress={progress} active={active} />
            )}
          </ErrorBoundary>
        </Suspense>
      </Canvas>
    </div>
  );
}
