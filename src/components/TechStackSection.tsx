"use client";
import { motion } from "framer-motion";
import { FileSearch, Image, Languages, MessageSquareText, Mic2, ReceiptText, BookOpen } from "lucide-react";

const apps = [
  { icon: FileSearch, name: "Mimir Scan", outcome: "OCR และอ่านเอกสาร", color: "#00e5ff" },
  { icon: Languages, name: "Mimir Bridge", outcome: "แปลภาษา", color: "#00ff88" },
  { icon: Mic2, name: "Mimir Echo", outcome: "ถอดเสียง", color: "#8b5cf6" },
  { icon: ReceiptText, name: "Mimir Ledger", outcome: "เตรียมข้อมูลก่อนทำบัญชี", color: "#f59e0b" },
  { icon: BookOpen, name: "Mimir Well", outcome: "ความรู้บริษัท", color: "#ec4899" },
  { icon: MessageSquareText, name: "Mimir Chat", outcome: "สนทนา ค้นหา และร่างงาน", color: "#00e5ff" },
  { icon: Image, name: "Mimir Still", outcome: "สร้างภาพ", color: "#00ff88" },
];

export default function TechStackSection() {
  return <section className="py-16 lg:py-20"><div className="max-w-6xl mx-auto px-6"><div className="text-center mb-10"><h1 className="text-3xl md:text-5xl font-black text-[#f0f4f8] mb-4">แอป Mimir สำหรับงานจริง</h1><p className="text-[#94a3b8] max-w-2xl mx-auto">พนักงานใช้แอปใน Mimir Suites, ส่วน Ollama และ ComfyUI ถูกจัดเตรียมบน AI machine ระหว่างการติดตั้งและไม่ใช่หน้าจอสำหรับพนักงาน</p></div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{apps.map((app, index) => <motion.div key={app.name} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="rounded-2xl bg-[#111827] border border-[#1e293b] p-5"><app.icon size={22} style={{ color: app.color }} className="mb-4" /><h2 className="font-bold text-[#f0f4f8] mb-1">{app.name}</h2><p className="text-sm text-[#94a3b8]">{app.outcome}</p></motion.div>)}</div><p className="text-center text-xs text-[#64748b] mt-8">ข้อมูลอยู่ในองค์กรของคุณ, ออกแบบการใช้งานให้สอดคล้องกับ PDPA</p></div></section>;
}
