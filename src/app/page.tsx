import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DataRoadBg from "@/components/DataRoadBg";
import ScrollAnimation from "@/components/ScrollAnimation";
import HowItWorks from "@/components/HowItWorks";
import DataFlowDiagram from "@/components/DataFlowDiagram";
import SystemBuilder from "@/components/SystemBuilder";
import Packages from "@/components/Packages";
import CreatorCTA from "@/components/CreatorCTA";
import Comparison from "@/components/Comparison";
import Infrastructure from "@/components/Infrastructure";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <DataRoadBg />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <ScrollAnimation />
        <HowItWorks />
        <DataFlowDiagram />
        <SystemBuilder />
        <Packages />
        <CreatorCTA />
        <Comparison />
        <Infrastructure />
        <Services />
        <WhyUs />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
