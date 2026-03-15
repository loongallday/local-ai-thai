"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Cpu, Server } from "lucide-react";

const sizes = [
  {
    id: "compact",
    size: "S",
    icon: Monitor,
    title: "เครื่องตั้งโต๊ะ",
    sub: "Mac Mini / Studio",
    color: "#00e5ff",
    specs: [
      { label: "💰 ราคา", value: "฿59,900 - 219,900" },
      { label: "👥 ใช้พร้อมกัน", value: "1-10 คน" },
      { label: "🧠 ความฉลาด AI", value: "ดี - ดีมาก" },
      { label: "📐 ขนาดเครื่อง", value: "เท่าฝ่ามือ" },
      { label: "🔇 เสียง", value: "เงียบสนิท" },
      { label: "⚡ ไฟที่ใช้", value: "เท่าชาร์จมือถือ" },
      { label: "⏱ ติดตั้ง", value: "1-2 วัน" },
      { label: "🎯 เหมาะกับ", value: "ออฟฟิศ, คลินิก, Creator" },
    ],
  },
  {
    id: "powerstation",
    size: "M",
    icon: Cpu,
    title: "ซูเปอร์คอมฯ ตั้งโต๊ะ",
    sub: "NVIDIA Blackwell",
    color: "#00ff88",
    specs: [
      { label: "💰 ราคา", value: "฿179,900 - 399,900" },
      { label: "👥 ใช้พร้อมกัน", value: "3-15 คน" },
      { label: "🧠 ความฉลาด AI", value: "ดีมาก - เยี่ยม" },
      { label: "📐 ขนาดเครื่อง", value: "เท่ากล่องทิชชู่" },
      { label: "🔇 เสียง", value: "เสียงพัดลมเบาๆ" },
      { label: "⚡ ไฟที่ใช้", value: "เท่าคอมพิวเตอร์ 1 ตัว" },
      { label: "⏱ ติดตั้ง", value: "1-3 วัน" },
      { label: "🎯 เหมาะกับ", value: "ทีม Dev, Startup" },
    ],
  },
  {
    id: "infra",
    size: "L",
    icon: Server,
    title: "เซิร์ฟเวอร์องค์กร",
    sub: "GPU Server",
    color: "#8b5cf6",
    specs: [
      { label: "💰 ราคา", value: "฿1.19M - ติดต่อเรา" },
      { label: "👥 ใช้พร้อมกัน", value: "50-500+ คน" },
      { label: "🧠 ความฉลาด AI", value: "สูงสุด" },
      { label: "📐 ขนาดเครื่อง", value: "ตู้ Rack ในห้อง Server" },
      { label: "🔇 เสียง", value: "ต้องอยู่ในห้องเฉพาะ" },
      { label: "⚡ ไฟที่ใช้", value: "ต้องมีระบบไฟเฉพาะ" },
      { label: "⏱ ติดตั้ง", value: "3-14 วัน" },
      { label: "🎯 เหมาะกับ", value: "โรงพยาบาล, ธนาคาร, รัฐ" },
    ],
  },
];

// Desktop table rows
const rows = sizes[0].specs.map((_, i) => ({
  label: sizes[0].specs[i].label,
  compact: sizes[0].specs[i].value,
  powerstation: sizes[1].specs[i].value,
  infra: sizes[2].specs[i].value,
}));

export default function Comparison() {
  const [active, setActive] = useState("compact");
  const current = sizes.find((s) => s.id === active)!;

  return (
    <section className="py-16 lg:py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#f0f4f8] mb-4">
            เปรียบเทียบให้เห็นภาพชัดๆ
          </h2>
          <p className="text-[#94a3b8] max-w-lg mx-auto text-sm">
            ไม่แน่ใจว่าเลือกขนาดไหน? ดูตารางนี้เลย
          </p>
        </div>

        {/* ─── Mobile: S M L Picker + Card ─── */}
        <div className="md:hidden">
          {/* Size picker */}
          <div className="flex justify-center gap-3 mb-6">
            {sizes.map((s) => {
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className="flex flex-col items-center gap-1.5 transition-all"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-300"
                    style={{
                      borderColor: isActive ? s.color : "#1e293b",
                      background: isActive ? s.color + "15" : "#111827",
                      transform: isActive ? "scale(1.1)" : "scale(1)",
                      boxShadow: isActive
                        ? `0 0 20px ${s.color}20`
                        : "none",
                    }}
                  >
                    <span
                      className="text-2xl font-black"
                      style={{ color: isActive ? s.color : "#64748b" }}
                    >
                      {s.size}
                    </span>
                  </div>
                  <span
                    className="text-[10px] font-semibold transition-colors"
                    style={{ color: isActive ? "#f0f4f8" : "#64748b" }}
                  >
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl bg-[#111827] border border-[#1e293b] overflow-hidden"
            >
              {/* Header */}
              <div
                className="flex items-center gap-3 px-4 py-3 border-b border-[#1e293b]"
                style={{ background: current.color + "08" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: current.color + "15" }}
                >
                  <current.icon
                    size={18}
                    style={{ color: current.color }}
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#f0f4f8]">
                    {current.title}
                  </p>
                  <p className="text-[10px] text-[#64748b]">{current.sub}</p>
                </div>
                <span
                  className="ml-auto text-2xl font-black"
                  style={{ color: current.color + "30" }}
                >
                  {current.size}
                </span>
              </div>

              {/* Specs */}
              <div className="divide-y divide-[#1e293b]">
                {current.specs.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`flex justify-between items-center px-4 py-3 ${i % 2 === 0 ? "bg-[#0c1220]/30" : ""}`}
                  >
                    <span className="text-xs text-[#94a3b8]">
                      {spec.label}
                    </span>
                    <span
                      className="text-sm font-medium text-right"
                      style={{ color: "#f0f4f8" }}
                    >
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── Desktop: Table ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hidden md:block rounded-2xl border border-[#1e293b] bg-[#111827] overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-4 border-b border-[#1e293b]">
            <div className="p-4" />
            {sizes.map((s) => (
              <div
                key={s.id}
                className={`p-4 text-center border-l border-[#1e293b] ${s.id === "powerstation" ? "bg-[#00ff88]/5" : ""}`}
              >
                <s.icon
                  size={20}
                  className="mx-auto mb-1"
                  style={{ color: s.color }}
                />
                <div className="text-sm font-bold text-[#f0f4f8]">
                  {s.title}
                </div>
                <div className="text-xs text-[#64748b]">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-4 ${
                i < rows.length - 1 ? "border-b border-[#1e293b]" : ""
              } ${i % 2 === 0 ? "bg-[#0c1220]/30" : ""}`}
            >
              <div className="p-4 text-sm font-medium text-[#94a3b8] flex items-center">
                {row.label}
              </div>
              <div className="p-4 text-sm text-[#f0f4f8] text-center border-l border-[#1e293b] flex items-center justify-center">
                {row.compact}
              </div>
              <div className="p-4 text-sm text-[#f0f4f8] text-center border-l border-[#1e293b] bg-[#00ff88]/5 flex items-center justify-center">
                {row.powerstation}
              </div>
              <div className="p-4 text-sm text-[#f0f4f8] text-center border-l border-[#1e293b] flex items-center justify-center">
                {row.infra}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
