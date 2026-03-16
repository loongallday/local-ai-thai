import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import DataRoadBg from "@/components/DataRoadBg";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ติดต่อเรา | ปรึกษาฟรี ขอใบเสนอราคา AI ส่วนตัว | LocalAI Thailand",
  description:
    "ติดต่อ LocalAI Thailand ปรึกษาฟรีเรื่องติดตั้ง AI ส่วนตัว ขอใบเสนอราคา ผ่าน LINE @542mgysj โทร อีเมล chavin@pace-design.co.th หรือกรอกฟอร์ม ตอบกลับภายใน 1 วันทำการ สำนักงาน กรุงเทพมหานคร",
  keywords: [
    "ติดต่อ LocalAI Thailand",
    "ขอใบเสนอราคา AI",
    "ปรึกษา AI ส่วนตัว",
    "LINE @542mgysj",
    "ติดตั้ง AI กรุงเทพ",
    "AI Consulting ไทย",
  ],
  openGraph: {
    title: "ติดต่อเรา | ปรึกษาฟรี | LocalAI Thailand",
    description: "ปรึกษาฟรี ขอใบเสนอราคา AI ส่วนตัว LINE @542mgysj ตอบกลับภายใน 1 วัน",
    url: "https://www.localaithai.com/contact",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "ติดต่อ LocalAI Thailand | ปรึกษาฟรี", description: "LINE @542mgysj ตอบกลับภายใน 1 วัน" },
  alternates: { canonical: "https://www.localaithai.com/contact" },
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
