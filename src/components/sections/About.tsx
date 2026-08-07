"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

// Ensure plugin is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinning and complex reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%", // Increased scroll distance for dramatic effect
          pin: true,
          scrub: 1,
        }
      });

      // Initial state
      gsap.set(imageContainerRef.current, { 
        clipPath: "inset(40% 40% 40% 40% round 30px)",
        scale: 0.8
      });
      gsap.set(imageRef.current, { scale: 2 });
      
      const texts = gsap.utils.toArray(".reveal-text");
      gsap.set(texts, { y: 100, opacity: 0 });

      // Animation sequence
      tl.to(imageContainerRef.current, {
        clipPath: "inset(0% 0% 0% 0% round 30px)",
        scale: 1,
        duration: 2,
        ease: "power2.inOut"
      })
      .to(imageRef.current, {
        scale: 1,
        duration: 2,
        ease: "power2.inOut"
      }, "<")
      .to(texts, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=1.5");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-screen w-full flex items-center px-6 md:px-12 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 w-full h-full justify-center">
        
        {/* Text Content */}
        <div ref={textRef} className="flex-1 space-y-8 z-10">
          <p className="reveal-text text-primary font-semibold tracking-wider uppercase text-sm">
            Established 2002
          </p>
          <h2 className="reveal-text font-heading text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
            Curating the finest textiles for global homes.
          </h2>
          <p className="reveal-text text-lg text-muted-foreground leading-relaxed">
            Priva International is a name identical for providing an exclusive collection to our customers. 
            Indulged in manufacturing, supplying, and exporting a huge assortment of Vintage Kantha, 
            Cushion Covers, Bed Throws, and Designer Bedspreads, our roots in Jaipur ensure authentic, 
            high-quality Rajasthani designs.
          </p>
          <div className="reveal-text pt-4">
            <button className="relative overflow-hidden group px-8 py-4 bg-foreground text-background rounded-full hover:scale-105 transition-transform duration-300 shadow-xl">
              <span className="relative z-10 font-medium">
                Read Our Story
              </span>
            </button>
          </div>
        </div>

        {/* Visual Accent */}
        <div 
          ref={imageContainerRef}
          className="flex-1 w-full h-[50vh] md:h-[70vh] relative overflow-hidden bg-secondary/10"
        >
          <Image 
            ref={imageRef}
            src="/images/artisan_craft.png"
            alt="Artisan Craftsmanship"
            fill
            priority
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
}
