"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const spring = useSpring(from, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    if (isInView) {
      spring.set(to);
    }
  }, [isInView, spring, to]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export default function Stats() {
  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Subtle background graphic */}
      <div className="absolute inset-0 opacity-10 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-[120%] h-[120%] fill-current animate-[spin_60s_linear_infinite]">
          <path d="M50 0 L100 50 L50 100 L0 50 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-primary-foreground/20">
        
        <div className="pt-8 md:pt-0">
          <p className="text-5xl md:text-7xl font-heading font-bold mb-4">
            <Counter from={0} to={2002} />
          </p>
          <p className="text-lg text-primary-foreground/80 uppercase tracking-widest font-semibold">Established</p>
        </div>

        <div className="pt-8 md:pt-0">
          <p className="text-5xl md:text-7xl font-heading font-bold mb-4">
            <Counter from={0} to={10} />k+
          </p>
          <p className="text-lg text-primary-foreground/80 uppercase tracking-widest font-semibold">Happy Clients</p>
        </div>

        <div className="pt-8 md:pt-0">
          <p className="text-5xl md:text-7xl font-heading font-bold mb-4">
            <Counter from={0} to={50} />+
          </p>
          <p className="text-lg text-primary-foreground/80 uppercase tracking-widest font-semibold">Global Destinations</p>
        </div>

      </div>
    </section>
  );
}
