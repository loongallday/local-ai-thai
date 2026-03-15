import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import DataRoadBg from "@/components/DataRoadBg";
import Packages from "@/components/Packages";
import Comparison from "@/components/Comparison";
import SystemBuilder from "@/components/SystemBuilder";
import Infrastructure from "@/components/Infrastructure";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "แพ็คเกจ AI ส่วนตัว & ราคา | Mac Mini ฿59,900 ถึง GPU Server ฿2.89M",
  description:
    "เปรียบเทียบแพ็คเกจติดตั้ง AI ส่วนตัว 10 แพ็คเกจ: Mac Mini Starter ฿59,900, Pro ฿109,900, NVIDIA DGX Spark ฿179,900, GPU Server L40S ฿1,190,000 พร้อม UPS Rack NAS ครบวงจร ออกแบบระบบได้ตามต้องการ จ่ายครั้งเดียว ไม่มีค่ารายเดือน",
  keywords: [
    "ราคา AI ส่วนตัว",
    "แพ็คเกจ Local AI",
    "Mac Mini AI ราคา",
    "DGX Spark ราคาไทย",
    "GPU Server ราคา",
    "ติดตั้ง AI ราคาเท่าไหร่",
    "AI สำหรับ SME ราคา",
    "เปรียบเทียบ AI package",
    "AI ส่วนตัว จ่ายครั้งเดียว",
    "UPS Rack NAS สำหรับ AI",
    "System Builder AI",
    "NVIDIA L40S Thailand",
  ],
  openGraph: {
    title: "แพ็คเกจ AI ส่วนตัว & ราคา | เริ่มต้น ฿59,900 | LocalAI Thailand",
    description: "10 แพ็คเกจ ตั้งแต่ Mac Mini ฿59,900 ถึง GPU Server ฿2.89M จ่ายครั้งเดียว ไม่มีค่ารายเดือน",
    url: "https://localaithai.com/packages",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "แพ็คเกจ AI ส่วนตัว เริ่มต้น ฿59,900", description: "Mac Mini ถึง GPU Server จ่ายครั้งเดียว" },
  alternates: { canonical: "https://localaithai.com/packages" },
};

export default function PackagesPage() {
  return (
    <main className="relative">
      <DataRoadBg />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-20" />
        <Packages />
        <Comparison />
        <SystemBuilder />
        <Infrastructure />
        <Footer />
      </div>
    </main>
  );
}
