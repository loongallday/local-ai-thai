import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import DataRoadBg from "@/components/DataRoadBg";
import Packages from "@/components/Packages";
import Comparison from "@/components/Comparison";
import SystemBuilder from "@/components/SystemBuilder";
import Infrastructure from "@/components/Infrastructure";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "แพ็คเกจ AI ส่วนตัว & ราคา | เริ่มต้น ฿59,900",
  description:
    "เปรียบเทียบแพ็คเกจติดตั้ง AI ส่วนตัว ตั้งแต่ Mac Mini ฿59,900 ไปจนถึง GPU Server ฿2,890,000 พร้อม UPS Rack NAS ครบวงจร ออกแบบระบบได้ตามต้องการ",
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
