import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CloudSection from "@/components/CloudSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DataRoadBg from "@/components/DataRoadBg";

export const metadata: Metadata = {
  title: "Cloud AI Setup | ติดตั้งระบบ AI บน VPS ใช้ Frontier Model ราคาประหยัด",
  description:
    "บริการติดตั้งระบบ AI Automation บน Cloud/VPS ไม่ต้องซื้อ Hardware แพง ใช้ Frontier Model (GPT-5, Claude Opus 4.6, Gemini 3.1 Pro, DeepSeek V3) + n8n, OpenClaw, Flowise, Dify สร้าง Workflow อัตโนมัติ เริ่มต้น ฿19,900",
  keywords: [
    "AI Automation Thailand",
    "n8n Thailand",
    "OpenClaw setup",
    "Flowise AI Thailand",
    "Dify AI Thailand",
    "Cloud AI Setup",
    "VPS AI Thailand",
    "AI Workflow Automation",
    "ติดตั้ง AI บน Cloud",
    "Frontier Model Thailand",
    "GPT-5 Thailand",
    "Claude Opus 4.6 Thailand",
    "Gemini 3.1 Pro Thailand",
    "DeepSeek V3 Thailand",
  ],
  openGraph: {
    title: "Cloud AI Setup | ระบบ AI อัตโนมัติบน Cloud | LocalAI Thailand",
    description: "ติดตั้ง AI Automation บน VPS เริ่มต้น ฿19,900 — n8n, OpenClaw, Flowise, Dify",
    url: "https://www.localaithai.com/cloud",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Cloud AI Setup | LocalAI Thailand", description: "AI Automation บน Cloud/VPS เริ่ม ฿19,900" },
  alternates: { canonical: "https://www.localaithai.com/cloud" },
};

export default function CloudPage() {
  return (
    <main className="relative">
      <DataRoadBg />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-24" />
        <CloudSection />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
