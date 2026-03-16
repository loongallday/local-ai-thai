import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import DataRoadBg from "@/components/DataRoadBg";
import ScrollAnimation from "@/components/ScrollAnimation";
import HowItWorks from "@/components/HowItWorks";
import DataFlowDiagram from "@/components/DataFlowDiagram";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AI ส่วนตัวทำงานยังไง | RAG Pipeline ภาษาไทย ค้นเอกสาร สรุปข้อมูล",
  description:
    "เข้าใจวิธีทำงานของ AI ส่วนตัว ตั้งแต่นำเอกสาร PDF Word Excel เข้าระบบ ตัดแบ่ง Embedding จัดเก็บใน Vector Database จนถึงถามคำถามภาษาไทยแล้วได้คำตอบทันที พร้อมอ้างอิงเอกสารต้นฉบับ PDPA Compliant 100%",
  keywords: [
    "RAG Pipeline ภาษาไทย",
    "AI ค้นเอกสาร",
    "Vector Database",
    "AI อ่าน PDF",
    "Embedding ภาษาไทย",
    "AI สรุปเอกสาร",
    "LlamaIndex Thailand",
    "ChromaDB",
    "AI ส่วนตัวทำงานยังไง",
    "Local AI วิธีการทำงาน",
  ],
  openGraph: {
    title: "AI ส่วนตัวทำงานยังไง | LocalAI Thailand",
    description: "ดูวิธีทำงานทีละขั้น ตั้งแต่นำเอกสารเข้า จนถึง AI ตอบคำถามภาษาไทย พร้อมอ้างอิง",
    url: "https://www.localaithai.com/how-it-works",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "AI ส่วนตัวทำงานยังไง | LocalAI Thailand", description: "RAG Pipeline ภาษาไทย ค้นเอกสาร สรุปข้อมูล ตอบคำถาม" },
  alternates: { canonical: "https://www.localaithai.com/how-it-works" },
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
