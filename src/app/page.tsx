import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DataRoadBg from "@/components/DataRoadBg";
import ScrollAnimation from "@/components/ScrollAnimation";
import HowItWorks from "@/components/HowItWorks";
import Packages from "@/components/Packages";
import Comparison from "@/components/Comparison";
import CreatorCTA from "@/components/CreatorCTA";
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
        <Packages />
        <Comparison />
        <CreatorCTA />
        <WhyUs />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
