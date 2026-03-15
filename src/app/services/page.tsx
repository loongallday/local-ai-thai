import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import DataRoadBg from "@/components/DataRoadBg";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "บริการติดตั้ง AI ส่วนตัว | RAG, Fine-tune, LINE Bot, Support",
  description:
    "บริการติดตั้ง AI ครบวงจร ตั้งแต่ Setup ระบบ RAG Pipeline ปรับแต่งภาษาไทย เชื่อม LINE Bot ERP CRM พัฒนา AI App เฉพาะทาง อบรมทีมงาน ดูแลรายเดือน",
  alternates: { canonical: "https://localai-th.com/services" },
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
