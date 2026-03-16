import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import DataRoadBg from "@/components/DataRoadBg";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "บริการติดตั้ง AI ส่วนตัว | RAG Fine-tune LINE Bot ERP ดูแลรายเดือน",
  description:
    "บริการติดตั้ง AI ครบวงจร: Setup ระบบ AI ฿15,000, RAG Pipeline ค้นเอกสาร ฿49,900, ปรับแต่งภาษาไทย ฿79,900, เชื่อม LINE Bot ฿59,900, เชื่อม ERP/CRM ฿79,900, อบรมทีมงาน ฿19,900, ดูแลรายเดือน ฿9,900 โดยทีม Developer มืออาชีพ Authorized Dealer Ingram Synnex SIS",
  keywords: [
    "บริการติดตั้ง AI",
    "RAG Pipeline Thailand",
    "Fine-tune ภาษาไทย",
    "LINE Bot AI",
    "เชื่อม AI กับ ERP",
    "AI สำหรับ CRM",
    "อบรม AI สำหรับองค์กร",
    "ดูแลระบบ AI รายเดือน",
    "ติดตั้ง Ollama",
    "ติดตั้ง Open WebUI",
    "AI Consulting Thailand",
    "Ingram Synnex SIS Dealer",
  ],
  openGraph: {
    title: "บริการติดตั้ง AI ส่วนตัวครบวงจร | LocalAI Thailand",
    description: "Setup, RAG, Fine-tune, LINE Bot, ERP, อบรม, ดูแลรายเดือน โดย Developer มืออาชีพ",
    url: "https://www.localaithai.com/services",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "บริการติดตั้ง AI ครบวงจร | LocalAI Thailand", description: "RAG, Fine-tune, LINE Bot, ดูแลรายเดือน" },
  alternates: { canonical: "https://www.localaithai.com/services" },
};

export default function ServicesPage() {
  return (
    <main className="relative">
      <DataRoadBg />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-20" />
        <Services />
        <WhyUs />
        <Footer />
      </div>
    </main>
  );
}
