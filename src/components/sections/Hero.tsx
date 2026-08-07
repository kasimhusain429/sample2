"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ClothSimulation from "@/components/3d/ClothSimulation";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const subtitle = useRef<HTMLParagraphElement>(null);
  const cta = useRef<HTMLDivElement>(null);

  // Split text helper for the heading
  const headingText = "Heritage Woven into Every Thread";
  const words = headingText.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Select all the word spans
      const wordElements = gsap.utils.toArray(".hero-word");
      
      tl.from(wordElements, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.5
      })
      .from(subtitle.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.6")
      .from(cta.current, {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8");

      // Parallax scroll effect for the content
      gsap.to(container.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-background">
      {/* 3D WebGL Fabric Background */}
      <ClothSimulation />
      
      <div className="z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto mt-20">
        <h1 ref={title} className="font-heading text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-foreground mb-6 flex flex-wrap justify-center gap-x-4">
          {words.map((word, i) => (
            <span key={i} className="hero-word overflow-hidden inline-block pb-2">
              {word}
            </span>
          ))}
        </h1>
        <p ref={subtitle} className="text-lg md:text-xl text-foreground/90 max-w-2xl mb-10 font-sans">
          Discover our exclusive collection of Vintage Kantha, Block Printed Bed Covers, and artisan home textiles from Jaipur, Rajasthan.
        </p>
        <div ref={cta} className="flex flex-col sm:flex-row gap-4 items-center">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-full transition-transform hover:scale-105 duration-300">
            Explore Collection
          </Button>
          <Button variant="outline" size="lg" className="border-primary/20 text-foreground hover:bg-primary/5 text-lg px-8 py-6 rounded-full bg-background/50 backdrop-blur-sm transition-transform hover:scale-105 duration-300">
            Our Story
          </Button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ArrowDown className="w-6 h-6 text-foreground/50" />
      </div>
    </section>
  );
}
