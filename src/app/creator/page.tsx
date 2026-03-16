import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CreatorHero from "@/components/CreatorHero";
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
    "AI สร้าง Caption Hashtag",
    "Batch Content AI",
    "AI ตัดต่อวิดีโอ",
    "AI Subtitle ภาษาไทย",
    "ComfyUI Thailand",
    "AI Lifestyle Influencer",
    "AI Food Reviewer",
    "AI Beauty Creator",
  ],
  openGraph: {
    title: "AI สำหรับ Creator & Influencer | หยุดจ่าย Subscription ฿3,330/เดือน",
    description:
      "สร้างรูป เขียนสคริปต์ ทำ Thumbnail Caption Hashtag Subtitle ด้วย AI ส่วนตัว ใช้ไม่อั้น เริ่มต้น ฿59,900 ครั้งเดียว",
    url: "https://www.localaithai.com/creator",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "AI สำหรับ Creator | หยุดจ่าย Midjourney + ChatGPT", description: "จ่ายครั้งเดียว ฿59,900 สร้าง Content ไม่จำกัด" },
  alternates: {
    canonical: "https://www.localaithai.com/creator",
  },
};

export default function CreatorPage() {
  return (
    <main className="relative">
      <DataRoadBg />
      <div className="relative z-10">
        <Navbar />
        <CreatorHero />
        <CreatorSection />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
