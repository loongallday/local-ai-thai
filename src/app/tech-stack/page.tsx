import type { Metadata } from "next";
import DataRoadBg from "@/components/DataRoadBg";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TechStackSection from "@/components/TechStackSection";

export const metadata: Metadata = { title: "แอป Mimir สำหรับ Local AI", description: "Mimir Scan, Bridge, Echo, Ledger, Well, Chat และ Still สำหรับงานของทีมในองค์กร.", alternates: { canonical: "https://www.localaithai.com/tech-stack" } };
export default function TechStackPage() { return <main className="relative"><DataRoadBg /><div className="relative z-10"><Navbar /><div className="pt-24" /><TechStackSection /><Footer /></div></main>; }
