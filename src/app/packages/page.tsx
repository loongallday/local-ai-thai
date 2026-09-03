import type { Metadata } from "next";
import Comparison from "@/components/Comparison";
import DataRoadBg from "@/components/DataRoadBg";
import Footer from "@/components/Footer";
import Infrastructure from "@/components/Infrastructure";
import Navbar from "@/components/Navbar";
import Packages from "@/components/Packages";
import SystemBuilder from "@/components/SystemBuilder";

export const metadata: Metadata = { title: "Local AI: ขนาดระบบและราคาเริ่มต้น", description: "สี่จุดเริ่มต้นสำหรับ Local AI, กำหนดสเปกและราคาสุดท้ายตาม workload ขององค์กร.", alternates: { canonical: "https://www.localaithai.com/packages" } };
export default function PackagesPage() { return <main className="relative"><DataRoadBg /><div className="relative z-10"><Navbar /><div className="pt-20" /><Packages /><Comparison /><SystemBuilder /><Infrastructure /><Footer /></div></main>; }
