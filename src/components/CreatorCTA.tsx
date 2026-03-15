"use client";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Image, PenTool, Video, Hash } from "lucide-react";

export default function CreatorCTA() {
  return (
    <section className="py-16 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-[#ec4899]/20 bg-gradient-to-br from-[#ec4899]/5 via-[#111827] to-[#8b5cf6]/5 p-8 md:p-12 overflow-hidden relative"
        >
          {/* Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ec4899]/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8b5cf6]/5 rounded-full blur-[100px]" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ec4899]/10 border border-[#ec4899]/30 text-[#ec4899] text-xs font-bold mb-4">
                <Sparkles size={12} />
                สำหรับ YouTuber, TikToker, Creator
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#f0f4f8] mb-4">
                AI สำหรับ Creator
                <br />
                <span className="gradient-text-purple">
                  จ่ายครั้งเดียว ใช้ได้ไม่อั้น
                </span>
              </h2>
              <p className="text-[#94a3b8] mb-6 leading-relaxed max-w-lg">
                หยุดจ่าย Midjourney + ChatGPT + Canva ฿3,330/เดือน
                — สร้างรูป เขียนสคริปต์ ทำ Thumbnail ด้วย AI ส่วนตัว เริ่มต้น ฿59,900
              </p>

              {/* Mini feature icons */}
              <div className="grid grid-cols-2 gap-3 mb-6 max-w-sm">
                {[
                  { icon: Image, text: "สร้างรูปไม่จำกัด" },
                  { icon: PenTool, text: "เขียนสคริปต์ภาษาไทย" },
                  { icon: Video, text: "ตัดต่อ & Upscale วิดีโอ" },
                  { icon: Hash, text: "Batch Caption & Hashtag" },
                ].map((f) => (
                  <div
                    key={f.text}
                    className="flex items-center gap-2 text-xs text-[#f0f4f8]"
                  >
                    <f.icon size={12} className="text-[#ec4899]" />
                    {f.text}
                  </div>
                ))}
              </div>

              <a
                href="/creator"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] text-white font-bold hover:opacity-90 transition-opacity"
              >
                ดูแพ็คเกจ Creator
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Price highlight */}
            <div className="shrink-0 text-center lg:text-right">
              <p className="text-xs text-[#64748b] mb-1">เริ่มต้น</p>
              <p className="text-4xl md:text-5xl font-black gradient-text-purple mb-2">
                ฿59,900
              </p>
              <p className="text-sm text-[#94a3b8]">จ่ายครั้งเดียว</p>
              <p className="text-xs text-[#00ff88] mt-2">
                ประหยัด ฿20,000+ เทียบกับ Subscription 2 ปี
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
