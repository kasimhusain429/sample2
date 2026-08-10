"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const collections = [
  {
    title: "Block Printed Bed Covers",
    description: "Authentic hand-blocked prints using natural dyes.",
    color: "bg-primary/10",
    image: "/images/block_print.png"
  },
  {
    title: "Vintage Kantha Throws",
    description: "Upcycled saris hand-stitched into vibrant throws.",
    color: "bg-secondary/20",
    image: "/images/vintage_kantha.png"
  },
  {
    title: "Designer Cushions",
    description: "Elegant accents for modern living spaces.",
    color: "bg-accent/10",
    image: "/images/designer_cushion.png"
  },
  {
    title: "Floor Stools",
    description: "Comfortable, ethnic seating solutions.",
    color: "bg-muted",
    image: "/images/floor_stool.png"
  }
];

export default function Collection() {
  const sectionWrapperRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const carousel = carouselRef.current;
      if (carousel) {
        // Calculate total rotation based on number of items (45 degrees per item)
        const totalRotation = (collections.length - 1) * -45;

        gsap.to(carousel, {
          rotateY: totalRotation,
          ease: "none",
          scrollTrigger: {
            trigger: pinContainerRef.current,
            start: "top top",
            end: "+=2500", // 2500px of scrolling for smooth rotation
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });
      }
    }, sectionWrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionWrapperRef} className="w-full bg-background relative">
      <style dangerouslySetInnerHTML={{
        __html: `
        .carousel-3d-scene { --carousel-radius: 400px; }
        @media (min-width: 640px) { .carousel-3d-scene { --carousel-radius: 600px; } }
        @media (min-width: 768px) { .carousel-3d-scene { --carousel-radius: 800px; } }
      `}} />

      <div ref={pinContainerRef} className="h-screen w-full relative overflow-hidden flex items-center justify-center carousel-3d-scene">
        <div className="absolute top-24 left-6 md:left-12 z-50 max-w-xl pointer-events-none">
          <h2 className="font-heading text-5xl md:text-7xl text-foreground mb-4">Our Collection</h2>
          <p className="text-muted-foreground text-lg md:text-xl">
            Explore our curated selection of hand-crafted home styling essentials, directly from the artisans of Rajasthan.
          </p>
        </div>

        {/* 3D Scene */}
        <div className="w-full h-full flex items-center justify-center overflow-visible" style={{ perspective: "1500px" }}>

          {/* Camera offset container */}
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(calc(-1 * var(--carousel-radius))) rotateX(-5deg)"
            }}
          >
            {/* Rotating Carousel Ring */}
            <div
              ref={carouselRef}
              className="relative w-full h-full flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              {collections.map((item, i) => (
                <div
                  key={i}
                  className={`absolute top-1/2 left-1/2 group rounded-3xl p-8 flex flex-col justify-end overflow-hidden cursor-pointer 
                    w-[300px] h-[400px] sm:w-[350px] sm:h-[500px] md:w-[450px] md:h-[600px] 
                    ${item.color}`}
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    transform: `translate(-50%, -50%) rotateY(${i * 45}deg) translateZ(var(--carousel-radius))`
                  }}
                >

                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  </div>

                  <div className="relative z-10 flex justify-between items-end transform translate-z-[50px]">
                    <div>
                      <h3 className="font-heading text-2xl md:text-3xl font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-white/80 font-sans text-sm md:text-lg">{item.description}</p>
                    </div>
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 flex-shrink-0 ml-4">
                      <ArrowUpRight className="text-black w-6 h-6 md:w-7 md:h-7" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
