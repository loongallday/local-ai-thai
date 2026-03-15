"use client";
import { motion } from "framer-motion";
import { Lock, Banknote, Building2 } from "lucide-react";
import GridCanvas from "./GridCanvas";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GridCanvas />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.08)_0%,transparent_70%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#060a14] to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-6xl lg:text-8xl font-bold leading-tight mb-6 mt-16 sm:mt-0">
            <span className="text-[#f0f4f8]">ติดตั้ง AI ส่วนตัว</span>
            <br />
            <span className="gradient-text-cyan">สำหรับธุรกิจในประเทศไทย</span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-[#94a3b8] max-w-3xl mx-auto mb-4 leading-relaxed">
            เหมือนมี ChatGPT ส่วนตัว ทำงานบนเครื่องในออฟฟิศของคุณ
            <br className="hidden sm:block" />
            ข้อมูลไม่หลุดไปไหน ไม่มีค่ารายเดือน PDPA Compliant
          </p>
          <p className="text-base lg:text-lg text-[#64748b] max-w-xl mx-auto mb-12">
            บริการติดตั้ง AI ครบวงจร ตั้งแต่เลือกเครื่อง ติดตั้งระบบ จนพร้อมใช้งาน เริ่มต้น ฿59,900
          </p>

          {/* Value props as simple cards */}
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
            {[
              {
                icon: Lock,
                title: "ข้อมูลอยู่กับคุณ 100%",
                desc: "ทุกอย่างประมวลผลในเครื่องของคุณ ไม่ส่งออกไปที่ไหนเลย",
                color: "#00ff88",
              },
              {
                icon: Banknote,
                title: "จ่ายครั้งเดียวจบ",
                desc: "ไม่มีค่า Subscription รายเดือน ประหยัดกว่าบริการคลาวด์ในระยะยาว",
                color: "#00e5ff",
              },
              {
                icon: Building2,
                title: "ดูแลครบจบที่เดียว",
                desc: "ทั้งเครื่อง ระบบไฟ ตู้ Rack ที่เก็บข้อมูล เราจัดให้หมด",
                color: "#8b5cf6",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[#1e293b] bg-[#111827]/60 p-5 text-left"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: item.color + "15" }}
                >
                  <item.icon size={18} style={{ color: item.color }} />
                </div>
                <h3 className="text-sm font-bold text-[#f0f4f8] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#how-it-works"
              className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#00e5ff] to-[#00ff88] text-[#060a14] font-bold text-base hover:opacity-90 transition-opacity"
            >
              ดูว่า AI ส่วนตัวทำอะไรได้บ้าง
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-lg border border-[#1e293b] text-[#f0f4f8] font-semibold text-base hover:border-[#00e5ff] hover:text-[#00e5ff] transition-all"
            >
              ปรึกษาฟรี ไม่มีค่าใช้จ่าย
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
