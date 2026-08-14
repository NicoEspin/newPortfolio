import Hero from "@/components/sections/Hero";
import SelectedWork from "@/components/sections/SelectedWork";
import Outcomes from "@/components/sections/Outcomes";
import Experience from "@/components/sections/Experience";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Outcomes />
      <Experience />
      <About />
      <Contact />
    </>
  );
}
