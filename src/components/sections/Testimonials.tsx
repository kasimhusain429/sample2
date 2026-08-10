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
  const sectionWrapperRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = scrollContainer.current;
      if (container) {
        gsap.to(container, {
          x: () => -(container.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: pinContainerRef.current,
            start: "top top",
            end: () => `+=${container.scrollWidth}`,
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
    <section ref={sectionWrapperRef} className="w-full bg-card text-card-foreground">
      <div ref={pinContainerRef} className="h-[100dvh] w-full flex flex-col justify-center overflow-hidden relative">
        <div className="w-full px-6 md:absolute md:top-24 md:left-12 md:z-10 mt-8 md:mt-0 shrink-0">
        <h2 className="font-heading text-3xl md:text-6xl text-foreground">What Our Clients Say</h2>
        <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-md">Trusted by customers worldwide for our quality and authentic Rajasthani designs.</p>
      </div>

      <div className="w-full flex items-center flex-1 md:flex-none">
        <div ref={scrollContainer} className="flex gap-6 md:gap-8 px-6 md:px-[20vw] md:pt-32 w-fit h-auto items-stretch py-4">
        {testimonials.map((t, i) => (
          <div 
            key={i} 
            className="w-[85vw] sm:w-[350px] md:w-[450px] flex-shrink-0 bg-background border border-border p-5 md:p-8 rounded-3xl shadow-lg relative flex flex-col"
          >
            <div className="flex gap-1 mb-4 md:mb-6 text-primary">
              {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" />)}
            </div>
            <p className="text-base md:text-xl font-sans text-foreground/80 leading-relaxed mb-6 md:mb-8 flex-1">
              &quot;{t.text}&quot;
            </p>
            <div className="mt-auto">
              <p className="font-heading text-lg md:text-xl font-bold">{t.name}</p>
              <p className="text-xs md:text-sm text-muted-foreground">{t.location}</p>
            </div>
          </div>
        ))}
        </div>
      </div>
      </div>
    </section>
  );
}
