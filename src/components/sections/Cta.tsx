"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Cta() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-32 bg-foreground text-background relative overflow-hidden">
      
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <h2 className="font-heading text-5xl md:text-7xl font-bold mb-6">
          Ready to elevate your space?
        </h2>
        <p className="text-xl text-background/80 mb-12 max-w-2xl mx-auto">
          Contact us for bulk orders, custom designs, or to explore our complete catalog of Rajasthan&apos;s finest textiles.
        </p>

        {!submitted ? (
          <form 
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
          >
            <input 
              type="email" 
              required
              placeholder="Enter your email address" 
              className="flex-1 px-6 py-4 rounded-full bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button type="submit" size="lg" className="rounded-full px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground">
              Get in Touch
            </Button>
          </form>
        ) : (
          <div className="p-6 bg-primary/20 rounded-2xl border border-primary/30 inline-block text-primary text-xl font-medium">
            Thank you! We&apos;ll be in touch soon.
          </div>
        )}
      </div>
    </section>
  );
}
