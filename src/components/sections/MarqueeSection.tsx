"use client";

import React, { useEffect, useRef } from "react";

const images = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif"
];

const row1 = [...images.slice(0, 11), ...images.slice(0, 11), ...images.slice(0, 11)];
const row2 = [...images.slice(11), ...images.slice(11), ...images.slice(11)];

export const MarqueeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current && row1Ref.current && row2Ref.current) {
            const sectionTop = sectionRef.current.offsetTop;
            const scrollY = window.scrollY;
            const innerHeight = window.innerHeight;
            
            const offset = (scrollY - sectionTop + innerHeight) * 0.3;
            
            row1Ref.current.style.transform = `translate3d(${offset - 200}px, 0, 0)`;
            row2Ref.current.style.transform = `translate3d(${-(offset - 200)}px, 0, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // init

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden flex flex-col gap-3">
      <div ref={row1Ref} className="flex gap-3 w-max will-change-transform ml-[-420px]">
        {row1.map((src, i) => (
          <img key={`r1-${i}`} src={src} alt="Project Preview" className="block min-w-[420px] min-h-[270px] w-[420px] h-[270px] rounded-2xl object-cover shrink-0 bg-[#1A1A1A]" referrerPolicy="no-referrer" />
        ))}
      </div>
      <div ref={row2Ref} className="flex gap-3 w-max will-change-transform">
        {row2.map((src, i) => (
          <img key={`r2-${i}`} src={src} alt="Project Preview" className="block min-w-[420px] min-h-[270px] w-[420px] h-[270px] rounded-2xl object-cover shrink-0 bg-[#1A1A1A]" referrerPolicy="no-referrer" />
        ))}
      </div>
    </section>
  );
};
