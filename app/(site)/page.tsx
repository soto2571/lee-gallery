import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { About } from "@/components/About";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";
import { getGallery } from "@/lib/gallery-store";

// The gallery is edited from /admin, so it is read on every request instead of
// being frozen into the build.
export const dynamic = "force-dynamic";

export default async function Home() {
  const { images } = await getGallery();

  return (
    <main>
      <Hero />
      <Gallery images={images} />
      <About />
      <Pricing />
      <Contact />
    </main>
  );
}
