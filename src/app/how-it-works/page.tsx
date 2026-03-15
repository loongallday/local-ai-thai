import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import DataRoadBg from "@/components/DataRoadBg";
import ScrollAnimation from "@/components/ScrollAnimation";
import HowItWorks from "@/components/HowItWorks";
import DataFlowDiagram from "@/components/DataFlowDiagram";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AI ส่วนตัวทำงานยังไง | ระบบ RAG Pipeline ภาษาไทย",
  description:
    "เข้าใจวิธีทำงานของ AI ส่วนตัว ตั้งแต่นำเอกสารเข้าระบบ ตัดแบ่ง Embedding จัดเก็บใน Vector Database จนถึงถามคำถามภาษาไทยแล้วได้คำตอบทันที",
  alternates: { canonical: "https://localaithai.com/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <main className="relative">
      <DataRoadBg />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-20" />
        <ScrollAnimation />
        <HowItWorks />
        <DataFlowDiagram />
        <Footer />
      </div>
    </main>
  );
}
