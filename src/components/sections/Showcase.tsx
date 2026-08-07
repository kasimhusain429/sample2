"use client";

import { useEffect, useRef, Suspense } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image as DreiImage, ScrollControls, useScroll } from "@react-three/drei";
import * as THREE from "three";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function FloatingImages() {
  const { width, height } = useThree((state) => state.viewport);
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const offset = scroll.offset;
      groupRef.current.position.y = offset * height * 1.5;
      
      // Floating animation
      groupRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(state.clock.elapsedTime + i) * 0.002;
      });
    }
  });

  return (
    <group ref={groupRef}>
      <DreiImage url="/images/craftsmanship_showcase.png" position={[-width * 0.1, 0, 0]} scale={[width * 0.5, width * 0.35]} />
      <DreiImage url="/images/artisan_craft.png" position={[width * 0.25, -height * 0.6, 1]} scale={[width * 0.35, width * 0.45]} />
      <DreiImage url="/images/floor_stool.png" position={[-width * 0.3, -height * 1.1, 0.5]} scale={[width * 0.3, width * 0.3]} />
      <DreiImage url="/images/vintage_kantha.png" position={[width * 0.15, -height * 1.6, -0.5]} scale={[width * 0.45, width * 0.3]} />
    </group>
  );
}

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animation for text
      gsap.from(".showcase-text", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-primary/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12">
        
        {/* Text */}
        <div className="flex-1 space-y-6 z-10 text-center md:text-left">
          <h2 className="showcase-text font-heading text-4xl md:text-5xl lg:text-6xl text-foreground">
            360° Artisan Craftsmanship
          </h2>
          <p className="showcase-text text-lg text-muted-foreground max-w-lg mx-auto md:mx-0">
            Every thread tells a story. Our products are meticulously hand-crafted, blending traditional Rajasthani motifs with modern comfort and style.
          </p>
          <div className="showcase-text pt-6">
             <button className="relative overflow-hidden group px-8 py-4 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300 shadow-lg">
              <span className="relative z-10 font-semibold uppercase tracking-wider text-sm">
                View Gallery
              </span>
            </button>
          </div>
        </div>

        {/* 3D Showcase */}
        <div className="flex-1 w-full h-[500px] md:h-[700px] relative rounded-3xl overflow-hidden shadow-2xl bg-background/50 backdrop-blur-sm border border-border">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true }}>
            <Suspense fallback={null}>
              <ScrollControls pages={1.5} damping={0.1}>
                <FloatingImages />
              </ScrollControls>
            </Suspense>
          </Canvas>
        </div>

      </div>
    </section>
  );
}
