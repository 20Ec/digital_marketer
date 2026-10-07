import { About } from "@/components/About";
import { Brands } from "@/components/Brands";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Process } from "@/components/Process";
import { SectionReveal } from "@/components/SectionReveal";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";
import { Tools } from "@/components/Tools";
import { VideoGallery } from "@/components/VideoGallery";

export default function Home() {
  return (
    <main className="bg-white text-slate-900">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Skills />
      <Experience />
      <Brands />
      <VideoGallery />
      <Process />
      <Tools />
      <Contact />
      <Footer />
      <SectionReveal />
    </main>
  );
}
