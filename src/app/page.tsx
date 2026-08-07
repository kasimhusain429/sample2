import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Collection from "@/components/sections/Collection";
import Showcase from "@/components/sections/Showcase";
import Testimonials from "@/components/sections/Testimonials";
import Stats from "@/components/sections/Stats";
import Cta from "@/components/sections/Cta";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="w-full h-full overflow-hidden">
      <Hero />
      <About />
      <Collection />
      <Showcase />
      <Testimonials />
      <Stats />
      <Cta />
      <Footer />
    </main>
  );
}
