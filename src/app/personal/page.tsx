import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PersonalHero from "@/components/PersonalHero";
import PersonalSection from "@/components/PersonalSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DataRoadBg from "@/components/DataRoadBg";

export const metadata: Metadata = {
  title: "AI ส่วนตัวที่บ้าน เหมือนมี JARVIS | สรุปอีเมล ช่วยการบ้านลูก เขียนงาน ฿59,900",
  description:
    "AI ส่วนตัวสำหรับใช้ที่บ้าน เหมือนมี JARVIS จาก Iron Man สรุปอีเมล สรุปข่าว ช่วยการบ้านลูก แนะนำเมนูอาหาร เขียนงาน แปลภาษา ทำงานบนเครื่องที่บ้าน ข้อมูลไม่หลุด จ่ายครั้งเดียว ฿59,900",
  keywords: [
    "AI ส่วนตัวที่บ้าน",
    "JARVIS ที่บ้าน",
    "AI ผู้ช่วยส่วนตัว",
    "AI สรุปอีเมล",
    "AI ช่วยการบ้าน",
    "AI แนะนำเมนูอาหาร",
    "AI แปลภาษา",
    "Mac Mini AI ที่บ้าน",
    "ChatGPT ส่วนตัว",
    "AI ไม่ต้องจ่ายรายเดือน",
    "AI สำหรับครอบครัว",
    "Local AI ที่บ้าน",
  ],
  openGraph: {
    title: "AI ส่วนตัวที่บ้าน — เหมือนมี JARVIS | LocalAI Thailand",
    description: "สรุปอีเมล ช่วยการบ้านลูก เขียนงาน แนะนำอาหาร จ่ายครั้งเดียว ฿59,900",
    url: "https://localai-th.com/personal",
  },
  alternates: { canonical: "https://localai-th.com/personal" },
};

export default function PersonalPage() {
  return (
    <main className="relative">
      <DataRoadBg />
      <div className="relative z-10">
        <Navbar />
        <PersonalHero />
        <PersonalSection />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
