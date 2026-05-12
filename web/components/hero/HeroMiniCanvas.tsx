"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const MODEL_URL =
  process.env.NEXT_PUBLIC_HERO_GLB_URL ?? "/models/forklift.opt.glb";

function MiniForklift() {
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
    root.scale.setScalar(1.25 / maxDim);
    return root;
  }, [scene]);

  useEffect(() => {
    if (group.current) group.current.rotation.set(0, Math.PI, 0);
  }, []);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <primitive object={model} />
    </group>
  );
}

export default function HeroMiniCanvas() {
  const [visible, setVisible] = useState(false);
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsLg(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!isLg) return;
    const hero = document.querySelector("[data-section=\"hero\"]");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: [0, 0.05] },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [isLg]);

  if (!isLg || !visible) return null;

  return (
    <div className="pointer-events-none fixed bottom-24 right-4 z-30 h-24 w-24 overflow-hidden rounded-full border border-accent-burnt/30 bg-[#1A1A1A]/85 shadow-lg backdrop-blur-sm">
      <Canvas
        camera={{ position: [0, 0.48, 3.15], fov: 38 }}
        gl={{ antialias: false, alpha: true }}
        className="h-full w-full"
        dpr={[1, 1]}
      >
        <ambientLight intensity={0.72} />
        <directionalLight position={[2, 3, 2]} intensity={1} />
        <Suspense fallback={null}>
          <MiniForklift />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
