import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DataRoadBg from "@/components/DataRoadBg";
import ScrollAnimation from "@/components/ScrollAnimation";
import HowItWorks from "@/components/HowItWorks";
import Packages from "@/components/Packages";
import Comparison from "@/components/Comparison";
import CloudCTA from "@/components/CloudCTA";
import WhyUs from "@/components/WhyUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative">
      <DataRoadBg />
      <div className="relative z-10">
        <Navbar />
        <main id="content" tabIndex={-1}>
          <Hero />
          <ScrollAnimation />
          <HowItWorks />
          <Packages />
          <Comparison />
          <CloudCTA />
          <WhyUs />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
