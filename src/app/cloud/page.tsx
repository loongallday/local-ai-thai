import type { Metadata } from "next";
import CloudSection from "@/components/CloudSection";
import Contact from "@/components/Contact";
import DataRoadBg from "@/components/DataRoadBg";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = { title: "Mimir Suites Cloud | Suite บนเครื่องพนักงาน", description: "Mimir Suites Cloud ติดตั้งแยกบนเครื่องพนักงาน ใช้โมเดลจากผู้ให้บริการคลาวด์โดยไม่ต้องมี AI hardware.", alternates: { canonical: "https://www.localaithai.com/cloud" } };
export default function CloudPage() { return <main className="relative"><DataRoadBg /><div className="relative z-10"><Navbar /><div className="pt-24" /><CloudSection /><Contact /><Footer /></div></main>; }
