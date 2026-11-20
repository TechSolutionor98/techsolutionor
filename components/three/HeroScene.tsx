"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import type { Group } from "three";

type BubbleProps = {
  position: [number, number, number];
  scale: number;
  color: string;
  flip?: boolean;
  speed?: number;
  dots?: boolean;
};

/** A soft 3D chat bubble: rounded slab, a little tail, and optional "typing" dots. */
function Bubble({ position, scale, color, flip = false, speed = 1.2, dots = false }: BubbleProps) {
  const side = flip ? 1 : -1;
  return (
    <Float speed={speed} rotationIntensity={0.7} floatIntensity={1.3} floatingRange={[-0.18, 0.18]}>
      <group position={position} scale={scale} rotation={[0.12, side * -0.45, side * 0.06]}>
        <RoundedBox args={[1.7, 1.05, 0.36]} radius={0.17} smoothness={5}>
          <meshStandardMaterial color={color} roughness={0.38} metalness={0.04} />
        </RoundedBox>
        <mesh position={[side * 0.52, -0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.34, 0.34, 0.3]} />
          <meshStandardMaterial color={color} roughness={0.38} metalness={0.04} />
        </mesh>
        {dots
          ? [-0.36, 0, 0.36].map((x) => (
              <mesh key={x} position={[x, 0, 0.2]}>
                <sphereGeometry args={[0.1, 20, 20]} />
                <meshStandardMaterial color="#ffffff" roughness={0.3} />
              </mesh>
            ))
          : null}
      </group>
    </Float>
  );
}

const bubbles: BubbleProps[] = [
  { position: [5.4, 2.5, -1.5], scale: 0.9, color: "#10b981", flip: true, dots: true, speed: 1.1 },
  { position: [-7.4, 2.9, -2.5], scale: 0.8, color: "#a7f3d0", speed: 1.4 },
  { position: [-7, -3.1, -1], scale: 0.62, color: "#34d399", flip: true, speed: 1.6 },
  { position: [6.2, -2.4, -3], scale: 1.05, color: "#d1fae5", dots: true, speed: 0.9 },
  { position: [0.6, 3.4, -4], scale: 0.7, color: "#6ee7b7", speed: 1.3 },
  { position: [0.4, -4.3, -3.5], scale: 0.75, color: "#ecfdf5", flip: true, speed: 1 },
];

/** Leans the whole scene gently toward the pointer and shrinks it on narrow screens. */
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const viewportWidth = useThree((state) => state.viewport.width);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const ease = Math.min(1, delta * 2.5);
    g.rotation.y += (pointer.current.x * 0.16 - g.rotation.y) * ease;
    g.rotation.x += (pointer.current.y * 0.1 - g.rotation.x) * ease;
  });

  // The bubbles are laid out for a wide viewport; squeeze them in on phones.
  // Most drift off the sides there, leaving a couple peeking in at the edges.
  const fit = Math.max(0.5, Math.min(1, viewportWidth / 13));
  return (
    <group ref={group} scale={fit}>
      {children}
    </group>
  );
}

export default function HeroScene({ active }: { active: boolean }) {
  return (
    <Canvas
      aria-hidden
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 9], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={active ? "always" : "never"}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={1.5} />
      <hemisphereLight args={["#ffffff", "#a7f3d0", 1.1]} />
      <directionalLight position={[4, 6, 6]} intensity={2.2} />
      <directionalLight position={[-6, -2, 3]} intensity={0.6} color="#d1fae5" />
      <Rig>
        {bubbles.map((b, i) => (
          <Bubble key={i} {...b} />
        ))}
      </Rig>
    </Canvas>
  );
}
