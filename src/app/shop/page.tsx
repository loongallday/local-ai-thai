import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ShopSection from "@/components/ShopSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DataRoadBg from "@/components/DataRoadBg";

export const metadata: Metadata = {
  title: "ร้านค้า Hardware AI | Mac Mini, Mac Studio, GPU, NAS, UPS ราคาปลีก",
  description:
    "จำหน่าย Hardware สำหรับ AI ส่วนตัว ราคาปลีก: Apple Mac Mini M4/M4 Pro, Mac Studio M4 Max, NVIDIA RTX 5090, Synology NAS, Seagate IronWolf, Eaton UPS พร้อมจัดส่งและติดตั้ง",
  keywords: [
    "ซื้อ Mac Mini M4",
    "Mac Mini M4 Pro ราคา",
    "Mac Studio M4 Max ราคา",
    "RTX 5090 ราคา ไทย",
    "Synology NAS ราคา",
    "Seagate IronWolf ราคา",
    "Eaton UPS ราคา",
    "Hardware AI ราคาปลีก",
    "ซื้อเครื่อง AI",
    "ร้านขาย Hardware AI",
  ],
  openGraph: {
    title: "ร้านค้า Hardware AI | LocalAI Thailand",
    description: "จำหน่าย Hardware AI ราคาปลีก Mac Mini, Mac Studio, GPU, NAS, UPS",
    url: "https://localaithai.com/shop",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "ร้านค้า Hardware AI | LocalAI Thailand", description: "Mac Mini, Mac Studio, GPU, NAS, UPS ราคาปลีก" },
  alternates: { canonical: "https://localaithai.com/shop" },
};

export default function ShopPage() {
  return (
    <main className="relative">
      <DataRoadBg />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-24" />
        <ShopSection />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
