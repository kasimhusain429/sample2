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
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = scrollContainerRef.current;
      if (container) {
        gsap.to(container, {
          x: () => -(container.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => "+=" + container.scrollWidth,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-screen w-full bg-background relative overflow-hidden flex items-center">
      <div className="absolute top-24 left-6 md:left-12 z-10 max-w-xl">
        <h2 className="font-heading text-5xl md:text-7xl text-foreground mb-4">Our Collection</h2>
        <p className="text-muted-foreground text-lg md:text-xl">
          Explore our curated selection of hand-crafted home styling essentials, directly from the artisans of Rajasthan.
        </p>
      </div>

      <div ref={scrollContainerRef} className="flex gap-8 px-6 md:px-[20vw] pt-32 h-[60vh] items-center w-fit">
        {collections.map((item, i) => (
          <div
            key={i}
            className={`group relative rounded-3xl p-8 flex flex-col justify-end overflow-hidden cursor-pointer h-full w-[350px] md:w-[500px] flex-shrink-0 ${item.color}`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image 
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
            </div>
            
            <div className="relative z-10 flex justify-between items-end">
              <div>
                <h3 className="font-heading text-3xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/80 font-sans text-lg">{item.description}</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                <ArrowUpRight className="text-black w-7 h-7" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
