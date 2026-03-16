import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SupportSection from "@/components/SupportSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DataRoadBg from "@/components/DataRoadBg";

export const metadata: Metadata = {
  title: "บริการดูแลระบบ AI | Preventive Maintenance, Repair, Support รายเดือน",
  description:
    "บริการดูแลระบบ AI ส่วนตัวครบวงจร: Preventive Maintenance อัพเดท model, Repair แก้ปัญหาเร่งด่วน, Monthly Support ดูแลรายเดือน, Training อบรมทีมงาน, Upgrade อัพเกรดระบบ ตั้งแต่ ฿9,900/เดือน",
  keywords: [
    "ดูแลระบบ AI",
    "AI Maintenance Thailand",
    "Support AI ส่วนตัว",
    "ซ่อม AI",
    "อัพเดท AI model",
    "AI Support รายเดือน",
    "บำรุงรักษา AI",
    "IT Support AI",
  ],
  openGraph: {
    title: "บริการดูแลระบบ AI ครบวงจร | LocalAI Thailand",
    description: "Preventive Maintenance, Repair, Monthly Support เริ่มต้น ฿9,900/เดือน",
    url: "https://localaithai.com/support",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "ดูแลระบบ AI | LocalAI Thailand", description: "Maintenance, Repair, Support เริ่ม ฿9,900/เดือน" },
  alternates: { canonical: "https://localaithai.com/support" },
};

export default function SupportPage() {
  return (
    <main className="relative">
      <DataRoadBg />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-24" />
        <SupportSection />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
