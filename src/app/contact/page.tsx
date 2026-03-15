import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import DataRoadBg from "@/components/DataRoadBg";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ติดต่อเรา | ปรึกษาฟรี ขอใบเสนอราคา AI ส่วนตัว",
  description:
    "ติดต่อ LocalAI Thailand ปรึกษาฟรีเรื่องติดตั้ง AI ส่วนตัว ขอใบเสนอราคา LINE @localai.th โทร ส่งอีเมล หรือกรอกฟอร์ม ตอบกลับภายใน 1 วันทำการ",
  alternates: { canonical: "https://localai-th.com/contact" },
};

export default function ContactPage() {
  return (
    <main className="relative">
      <DataRoadBg />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-20" />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
