"use client";
import { motion } from "framer-motion";
import {
  Wrench,
  FileSearch,
  Languages,
  MessageSquare,
  Code2,
  HeadphonesIcon,
  GraduationCap,
  MapPin,
} from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "ติดตั้งระบบ AI ให้พร้อมใช้",
    desc: "เราเซ็ทอัพทุกอย่างให้ — เปิดเครื่องมา พิมพ์ถามได้เลย ไม่ต้องรู้เรื่องเทคนิค",
    price: "฿15,000 - 30,000",
    color: "#00e5ff",
  },
  {
    icon: FileSearch,
    title: "สอน AI ให้ค้นเอกสารของคุณ",
    desc: "ใส่ไฟล์ PDF, Word, Excel เข้าไป แล้วถาม AI ได้ เช่น \"หาสัญญาที่เซ็นเมื่อเดือนที่แล้ว\"",
    price: "฿30,000 - 80,000",
    color: "#00ff88",
  },
  {
    icon: Languages,
    title: "ปรับ AI ให้เก่งภาษาไทย",
    desc: "สอน AI ให้เข้าใจศัพท์เฉพาะทางของธุรกิจคุณ เช่น ชื่อสินค้า คำย่อ ภาษาเฉพาะกลุ่ม",
    price: "฿50,000 - 150,000",
    color: "#8b5cf6",
  },
  {
    icon: MessageSquare,
    title: "เชื่อม AI กับ LINE / ระบบที่ใช้อยู่",
    desc: "ให้ AI ตอบข้อความ LINE ลูกค้าอัตโนมัติ หรือเชื่อมกับระบบบัญชี, CRM ที่ใช้อยู่",
    price: "฿30,000 - 100,000 / ระบบ",
    color: "#00e5ff",
  },
  {
    icon: Code2,
    title: "พัฒนา AI App เฉพาะทาง",
    desc: "ต้องการ AI ทำอะไรพิเศษ? เราพัฒนาให้ตามต้องการ เช่น AI วิเคราะห์ภาพ, AI จัดหมวดหมู่สินค้า",
    price: "฿100,000 - 500,000+",
    color: "#ec4899",
  },
  {
    icon: HeadphonesIcon,
    title: "ดูแลรายเดือน",
    desc: "อัพเดท AI ให้ฉลาดขึ้นเรื่อยๆ แก้ปัญหาเมื่อมี เพิ่มฟีเจอร์ใหม่ตามที่ต้องการ",
    price: "฿10,000 - 80,000 / เดือน",
    color: "#00ff88",
  },
  {
    icon: GraduationCap,
    title: "อบรมทีมงาน",
    desc: "สอนพนักงานของคุณให้ใช้ AI ได้เก่ง ทำเป็น Workshop ครึ่งวันหรือเต็มวัน",
    price: "฿15,000 - 30,000",
    color: "#8b5cf6",
  },
  {
    icon: MapPin,
    title: "ติดตั้งถึงที่",
    desc: "ทีมช่างมาติดตั้ง UPS, Rack, NAS, เดินสาย ตั้งเซิร์ฟเวอร์ให้ถึงออฟฟิศ",
    price: "฿8,000 - 15,000 / วัน",
    color: "#00e5ff",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 lg:py-20 bg-[#0c1220]/50 relative">
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#060a14] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#f0f4f8] mb-4">
            เราทำอะไรให้คุณได้บ้าง
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
            ไม่ใช่แค่ขายเครื่อง — เรามีทีมโปรแกรมเมอร์มืออาชีพ
            <br />
            พร้อมพัฒนา ติดตั้ง สอนใช้ และดูแลให้ตลอด
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl bg-[#111827] border border-[#1e293b] p-5 hover:border-opacity-60 transition-all duration-300 group hover:-translate-y-1"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  svc.color + "40";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#1e293b";
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                style={{ background: svc.color + "15" }}
              >
                <svc.icon size={18} style={{ color: svc.color }} />
              </div>
              <h3 className="text-sm font-bold text-[#f0f4f8] mb-2">
                {svc.title}
              </h3>
              <p className="text-xs text-[#94a3b8] mb-3 leading-relaxed">
                {svc.desc}
              </p>
              <p
                className="text-sm font-bold font-mono"
                style={{ color: svc.color }}
              >
                {svc.price}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
