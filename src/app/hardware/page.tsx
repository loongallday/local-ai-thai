import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HardwareSection from "@/components/HardwareSection";
import Footer from "@/components/Footer";
import DataRoadBg from "@/components/DataRoadBg";

export const metadata: Metadata = {
  title: "Hardware สำหรับ AI ส่วนตัว | Mac Mini, DGX Spark, GPU Server, NAS, UPS",
  description:
    "เปรียบเทียบ Hardware สำหรับ AI ส่วนตัว: Mac Mini M4 Pro, Mac Studio M4 Max, NVIDIA DGX Spark, ASUS GX10, GPU Server L40S H100 H200, Synology NAS, Eaton UPS พร้อมสเปค Benchmark ราคา และคำแนะนำว่าเลือกอะไรดี",
  keywords: [
    "Mac Mini AI",
    "Mac Studio AI",
    "DGX Spark Thailand",
    "ASUS GX10 ราคา",
    "NVIDIA L40S Thailand",
    "H100 Thailand",
    "GPU Server AI",
    "Apple Silicon AI",
    "Synology NAS AI",
    "Eaton UPS AI",
    "Hardware AI ส่วนตัว",
    "เลือกเครื่อง AI",
    "Benchmark AI ภาษาไทย",
    "Memory Bandwidth AI",
  ],
  openGraph: {
    title: "Hardware สำหรับ AI ส่วนตัว | LocalAI Thailand",
    description: "Mac Mini ถึง GPU Server เปรียบเทียบสเปค Benchmark ราคา เลือกให้ถูกตัว",
    url: "https://www.localaithai.com/hardware",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Hardware AI ส่วนตัว | Mac Mini, DGX Spark, GPU Server", description: "สเปค Benchmark ราคา เปรียบเทียบครบ" },
  alternates: { canonical: "https://www.localaithai.com/hardware" },
};

export default function HardwarePage() {
  return (
    <main className="relative">
      <DataRoadBg />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-24" />
        <HardwareSection />
        <Footer />
      </div>
    </main>
  );
}
