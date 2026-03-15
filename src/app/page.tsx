import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DataRoadBg from "@/components/DataRoadBg";
import ScrollAnimation from "@/components/ScrollAnimation";
import HowItWorks from "@/components/HowItWorks";
import DataFlowDiagram from "@/components/DataFlowDiagram";
import Packages from "@/components/Packages";
import Comparison from "@/components/Comparison";
import CreatorCTA from "@/components/CreatorCTA";
import SystemBuilder from "@/components/SystemBuilder";
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

        {/* 1. HOOK — What is this? */}
        <Hero />

        {/* 2. SHOW — Visual demo of how it works */}
        <ScrollAnimation />

        {/* 3. EXPLAIN — Step by step for non-tech users */}
        <HowItWorks />

        {/* 4. DEEP DIVE — Technical flow for interested users */}
        <DataFlowDiagram />

        {/* 5. BUY — Pricing packages */}
        <Packages />

        {/* 6. COMPARE — Help them decide */}
        <Comparison />

        {/* 7. CREATOR — Dedicated CTA for influencers */}
        <CreatorCTA />

        {/* 8. CUSTOMIZE — Build your own system */}
        <SystemBuilder />

        {/* 9. INFRASTRUCTURE — UPS, Rack, NAS add-ons */}
        <Infrastructure />

        {/* 10. SERVICES — What we do for you */}
        <Services />

        {/* 11. TRUST — Why choose us */}
        <WhyUs />

        {/* 12. ACTION — Contact & quote form */}
        <Contact />

        <Footer />
      </div>
    </main>
  );
}
