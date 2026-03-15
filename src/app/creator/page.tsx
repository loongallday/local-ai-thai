import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CreatorSection from "@/components/CreatorSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DataRoadBg from "@/components/DataRoadBg";

export const metadata: Metadata = {
  title:
    "AI สำหรับ Creator & Influencer | สร้างรูป เขียนสคริปต์ ไม่จำกัด จ่ายครั้งเดียว ฿59,900",
  description:
    "หยุดจ่าย Midjourney ChatGPT Canva ทุกเดือน ติดตั้ง AI ส่วนตัวบนเครื่องของคุณ สร้างรูป เขียนสคริปต์ภาษาไทย Batch Caption Hashtag ตัดต่อวิดีโอ ใช้ได้ไม่อั้น สำหรับ YouTuber TikToker Influencer เริ่มต้น ฿59,900",
  keywords: [
    "AI สำหรับ Creator",
    "AI Influencer Thailand",
    "Stable Diffusion Mac Mini",
    "สร้างรูป AI ไม่จำกัด",
    "AI เขียนสคริปต์ภาษาไทย",
    "เลิกจ่าย Midjourney",
    "AI YouTuber",
    "AI TikToker",
    "AI สร้าง Thumbnail",
    "AI Content Creator ไทย",
    "Local AI Creator",
    "AI ส่วนตัวสำหรับ Creator",
    "AI สร้าง Caption",
    "AI สร้าง Hashtag",
    "Mac Mini สำหรับ Creator",
  ],
  openGraph: {
    title: "AI สำหรับ Creator & Influencer | LocalAI Thailand",
    description:
      "หยุดจ่าย Subscription ทุกเดือน สร้าง Content ด้วย AI ส่วนตัว ไม่จำกัด เริ่มต้น ฿59,900",
    url: "https://localai-th.com/creator",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://localai-th.com/creator",
  },
};

export default function CreatorPage() {
  return (
    <main className="relative">
      <DataRoadBg />
      <div className="relative z-10">
        <Navbar />
        {/* Hero for Creator page */}
        <section className="min-h-[60vh] flex items-center justify-center pt-20 pb-8 px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ec4899]/10 border border-[#ec4899]/30 text-[#ec4899] text-xs font-bold mb-6">
              สำหรับ Creator & Influencer โดยเฉพาะ
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-[#f0f4f8] leading-tight mb-6">
              <span className="gradient-text-purple">หยุดจ่าย Subscription</span>
              <br />
              สร้าง Content ด้วย AI ส่วนตัว
            </h1>
            <p className="text-lg sm:text-xl text-[#94a3b8] max-w-2xl mx-auto mb-8 leading-relaxed">
              Midjourney + ChatGPT + Canva = ฿3,330/เดือน = ฿79,920 ใน 2 ปี
              <br />
              <span className="text-[#00ff88] font-semibold">
                LocalAI = ฿59,900 ครั้งเดียว ใช้ได้ตลอดชีวิต ไม่จำกัด
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#creator"
                className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] text-white font-bold text-base hover:opacity-90 transition-opacity"
              >
                ดูแพ็คเกจ Creator
              </a>
              <a
                href="#contact"
                className="px-8 py-3.5 rounded-lg border border-[#1e293b] text-[#f0f4f8] font-semibold text-base hover:border-[#ec4899] hover:text-[#ec4899] transition-all"
              >
                ปรึกษาฟรี
              </a>
            </div>
          </div>
        </section>

        <CreatorSection />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
