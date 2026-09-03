import type { Metadata } from "next";
import DataRoadBg from "@/components/DataRoadBg";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Contact from "@/components/Contact";

export const metadata: Metadata = { title: "งานที่ Mimir ช่วยทีมได้", description: "ใช้ Mimir Scan, Bridge, Echo, Ledger, Well, Chat และ Still สำหรับงานในองค์กร.", alternates: { canonical: "https://www.localaithai.com/services" } };
export default function ServicesPage() { return <main className="relative"><DataRoadBg /><div className="relative z-10"><Navbar /><div className="pt-24" /><Services /><Contact /><Footer /></div></main>; }
