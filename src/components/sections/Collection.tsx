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
      <style dangerouslySetInnerHTML={{ __html: `
        .carousel-3d-scene { --carousel-radius: 400px; }
        @media (min-width: 640px) { .carousel-3d-scene { --carousel-radius: 500px; } }
        @media (min-width: 768px) { .carousel-3d-scene { --carousel-radius: 600px; } }
      `}} />

      <div ref={pinContainerRef} className="h-[100dvh] w-full relative overflow-hidden flex flex-col md:flex-row items-center justify-start md:justify-center carousel-3d-scene">
        
        {/* Header Section */}
        <div className="w-full md:w-1/3 pt-12 md:pt-0 px-6 md:pl-12 md:pr-0 z-50 flex flex-col justify-center relative shrink-0">
          <h2 className="font-heading text-4xl md:text-7xl text-foreground mb-4">Our Collection</h2>
          <p className="text-muted-foreground text-base md:text-xl max-w-md">
            Explore our curated selection of hand-crafted home styling essentials, directly from the artisans of Rajasthan.
          </p>
        </div>

        {/* 3D Scene */}
        <div className="w-full md:w-2/3 flex-1 w-full md:h-full flex items-center justify-center overflow-visible mt-4 md:mt-0" style={{ perspective: "1500px" }}>
          
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
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group rounded-3xl p-5 md:p-8 flex flex-col justify-end overflow-hidden cursor-pointer 
                    w-[260px] h-[340px] sm:w-[320px] sm:h-[450px] md:w-[400px] md:h-[550px] 
                    ${item.color}`}
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden", // Safari support
                    transform: `rotateY(${i * 45}deg) translateZ(var(--carousel-radius))`
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
                      <h3 className="font-heading text-xl md:text-3xl font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-white/80 font-sans text-sm md:text-lg">{item.description}</p>
                    </div>
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 flex-shrink-0 ml-4">
                      <ArrowUpRight className="text-black w-5 h-5 md:w-7 md:h-7" />
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
