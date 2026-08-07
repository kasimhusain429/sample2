"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Liza Berlinam",
    location: "Dubbo",
    text: "Appreciate your bedsheets especially fast colors Keep it up. Good quality fabrics, appealing Rajasthan designs. Highly appreciative of your timely and predictive delivery.",
  },
  {
    name: "Maira Sharin",
    location: "Regina",
    text: "This is my third time purchase of double coat bed sheets which are very good quality. Really appreciated. Please try to keep up your standard. Your service is really awesome.",
  },
  {
    name: "Laura Amin",
    location: "Calgary",
    text: "Very good collection and products are of good quality. The prints are very good and the colour doesn't run. I received the package within 7 days and it was well packed.",
  },
  {
    name: "Vaishali Manghani",
    location: "Jaipur",
    text: "Received the 2nd consignment also. Now totally I have purchased 5 bedsheets. All bedsheets are superb, fantastic. The bedsheets are of very good material, soft and can easily fit any king sized bed.",
  }
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = scrollContainer.current;
      if (container) {
        gsap.to(container, {
          x: () => -(container.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${container.scrollWidth}`,
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
    <section ref={sectionRef} className="h-screen bg-card text-card-foreground flex items-center overflow-hidden">
      <div className="absolute top-24 left-12 z-10">
        <h2 className="font-heading text-4xl md:text-6xl text-foreground">What Our Clients Say</h2>
        <p className="text-muted-foreground mt-2 max-w-md">Trusted by customers worldwide for our quality and authentic Rajasthani designs.</p>
      </div>

      <div ref={scrollContainer} className="flex gap-8 px-[20vw] pt-32 w-fit h-auto items-center">
        {testimonials.map((t, i) => (
          <div 
            key={i} 
            className="w-[350px] md:w-[450px] flex-shrink-0 bg-background border border-border p-8 rounded-3xl shadow-lg relative"
          >
            <div className="flex gap-1 mb-6 text-primary">
              {[1,2,3,4,5].map(star => <Star key={star} size={20} fill="currentColor" />)}
            </div>
            <p className="text-lg md:text-xl font-sans text-foreground/80 leading-relaxed mb-8">
              &quot;{t.text}&quot;
            </p>
            <div>
              <p className="font-heading text-xl font-bold">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.location}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
