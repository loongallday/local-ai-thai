"use client";
import { motion } from "framer-motion";
import { ArrowRight, Cloud, Zap, Brain, Globe } from "lucide-react";

const models = [
  { name: "GPT-5", color: "#10a37f" },
  { name: "Claude 4.6", color: "#d4a574" },
  { name: "Gemini 3.1", color: "#4285f4" },
  { name: "DeepSeek V3", color: "#5b6abf" },
];

const benefits = [
  { icon: <Cloud size={16} />, text: "ไม่ต้องซื้อ Hardware" },
  { icon: <Brain size={16} />, text: "Frontier Model ฉลาดที่สุด" },
  { icon: <Zap size={16} />, text: "Setup fee เริ่ม ฿19,900" },
  { icon: <Globe size={16} />, text: "เข้าถึงจากทุกที่" },
];

export default function CloudCTA() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl p-[1px]"
          style={{ background: "linear-gradient(135deg, #00e5ff40, #8b5cf620, #00ff8830)" }}
        >
          <div className="rounded-2xl bg-[#0c1220] p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left: Text */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">☁️</span>
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#00e5ff]/10 text-[#00e5ff]">
                    ไม่ต้องซื้อเครื่อง
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-black text-[#f0f4f8] mb-3">
                  ไม่เน้น Privacy?<br />
                  <span className="gradient-text-cyan">ใช้ Cloud AI ได้เลย</span>
                </h2>

                <p className="text-sm text-[#94a3b8] mb-4 leading-relaxed">
                  ถ้าข้อมูลไม่ sensitive มาก และต้องการ AI ที่ฉลาดที่สุดในโลก — Cloud AI Setup เหมาะกว่า
                  ใช้ Frontier Model อย่าง GPT-5, Claude Opus 4.6, Gemini 3.1 Pro
                  ผ่าน n8n, OpenClaw, Flowise ได้ทันที ไม่ต้องลงทุน Hardware
                </p>

                {/* Benefits */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {benefits.map((b) => (
                    <div key={b.text} className="flex items-center gap-2 text-xs text-[#94a3b8]">
                      <span className="text-[#00e5ff]">{b.icon}</span>
                      {b.text}
                    </div>
                  ))}
                </div>

                <a
                  href="/cloud"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#8b5cf6] text-[#060a14] font-bold text-sm hover:opacity-90 transition-opacity"
                >
                  ดู Cloud AI Setup <ArrowRight size={16} />
                </a>
              </div>

              {/* Right: Model cards + comparison */}
              <div className="space-y-4">
                {/* Model pills */}
                <div>
                  <p className="text-[10px] text-[#64748b] mb-2 font-bold uppercase tracking-wider">Frontier Models ที่ใช้ได้</p>
                  <div className="flex flex-wrap gap-2">
                    {models.map((m) => (
                      <span
                        key={m.name}
                        className="text-xs font-bold px-3 py-1.5 rounded-lg border"
                        style={{ borderColor: m.color + "40", color: m.color, background: m.color + "08" }}
                      >
                        {m.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick comparison */}
                <div className="rounded-xl bg-[#111827] border border-[#1e293b] overflow-hidden">
                  <div className="grid grid-cols-3 text-center text-[10px] font-bold py-2 border-b border-[#1e293b]">
                    <span className="text-[#64748b]"></span>
                    <span className="text-[#00e5ff]">☁️ Cloud</span>
                    <span className="text-[#00ff88]">🖥️ Local</span>
                  </div>
                  {[
                    ["ลงทุนเริ่มต้น", "฿19,900", "฿59,900+"],
                    ["Model", "GPT-5 level", "Qwen/Llama"],
                    ["ค่ารายเดือน", "฿700+", "฿0"],
                    ["Privacy", "VPS ของคุณ", "100% offline"],
                  ].map(([label, cloud, local], i) => (
                    <div key={label} className={`grid grid-cols-3 text-center text-[11px] py-2 ${i % 2 === 0 ? "bg-[#0c1220]/50" : ""}`}>
                      <span className="text-[#64748b]">{label}</span>
                      <span className="text-[#f0f4f8]">{cloud}</span>
                      <span className="text-[#f0f4f8]">{local}</span>
                    </div>
                  ))}
                </div>

                <p className="text-[10px] text-[#64748b] text-center">
                  เหมาะกับ: Startup, ทีมเล็ก, งบจำกัด, ต้องการ AI ฉลาดสุด
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
