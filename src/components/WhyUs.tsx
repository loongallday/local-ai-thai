"use client";
import { motion } from "framer-motion";
import {
  Award,
  Code2,
  Shield,
  Languages,
  CreditCard,
  Users,
} from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "สินค้าแท้ ประกันศูนย์",
    desc: "เราเป็นตัวแทนจำหน่ายอย่างเป็นทางการจาก Ingram, Synnex, SIS — ทุกชิ้นของแท้ ประกันเต็ม ออกใบกำกับภาษีได้",
    color: "#00e5ff",
  },
  {
    icon: Code2,
    title: "ทีมโปรแกรมเมอร์ของเราเอง",
    desc: "เราไม่ใช่ร้านขายคอม — เรามีทีม Developer มืออาชีพที่พัฒนาระบบ AI ได้ ปรับแต่งให้เข้ากับธุรกิจของคุณ",
    color: "#00ff88",
  },
  {
    icon: Shield,
    title: "ข้อมูลปลอดภัย 100%",
    desc: "ข้อมูลของคุณไม่ออกไปไหนเลย ทุกอย่างอยู่ในเครื่องของคุณ สอดคล้องกับ พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล (PDPA)",
    color: "#8b5cf6",
  },
  {
    icon: Languages,
    title: "เชี่ยวชาญ AI ภาษาไทย",
    desc: "เราปรับแต่ง AI ให้เข้าใจภาษาไทยได้ดีมาก รวมถึงคำศัพท์เฉพาะทางในธุรกิจของคุณ",
    color: "#ec4899",
  },
  {
    icon: CreditCard,
    title: "จ่ายครั้งเดียว ใช้ได้ตลอด",
    desc: "ไม่มีค่า Subscription รายเดือน ไม่ต้องจ่ายค่า API ให้ต่างประเทศ ยิ่งใช้นานยิ่งคุ้ม",
    color: "#00e5ff",
  },
  {
    icon: Users,
    title: "ดูแลครบทุกด้าน",
    desc: "ตั้งแต่เครื่อง AI ไปจนถึง UPS, ตู้ Rack, NAS, เดินสาย — มีทีมเฉพาะทางดูแลให้ครบจบ",
    color: "#00ff88",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-16 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#f0f4f8] mb-4">
            ทำไมลูกค้าถึงเลือกเรา
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto text-base lg:text-lg">
            เพราะเราไม่ใช่แค่ร้านขายของ — เราเป็นทีมที่ช่วยคุณ
            <br />
            ตั้งแต่เลือกเครื่อง ติดตั้งระบบ จนใช้งาน AI ได้จริง
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl bg-[#111827] border border-[#1e293b] p-6 hover:border-opacity-60 transition-all duration-300 hover:-translate-y-1"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  r.color + "40";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#1e293b";
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: r.color + "12" }}
              >
                <r.icon size={22} style={{ color: r.color }} />
              </div>
              <h3 className="text-lg font-bold text-[#f0f4f8] mb-2">
                {r.title}
              </h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                {r.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Partner logos */}
        <div className="mt-16 text-center">
          <p className="text-xs text-[#64748b] uppercase tracking-widest mb-6">
            พาร์ทเนอร์ที่เราร่วมงานด้วย
          </p>
          <div className="flex justify-center items-center gap-12 flex-wrap opacity-50">
            {["INGRAM MICRO", "TD SYNNEX", "SIS", "EATON", "SCHNEIDER"].map(
              (name) => (
                <span
                  key={name}
                  className="text-lg md:text-xl font-bold text-[#64748b] tracking-wider"
                >
                  {name}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
