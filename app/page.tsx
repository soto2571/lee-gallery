import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { About } from "@/components/About";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Gallery />
      <About />
      <Pricing />
      <Contact />
    </main>
  );
}
