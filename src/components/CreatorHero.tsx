"use client";
import { motion } from "framer-motion";

// ─── Mockup Social Cards ───

const InstagramPost = () => (
  <motion.div
    initial={{ opacity: 0, y: 30, rotate: -3 }}
    animate={{ opacity: 1, y: 0, rotate: -3 }}
    transition={{ delay: 0.3, duration: 0.6 }}
    className="absolute -left-4 sm:left-8 top-[30%] w-[200px] sm:w-[240px] rounded-2xl bg-[#111827] border border-[#1e293b] overflow-hidden shadow-2xl shadow-[#ec4899]/10 z-10"
  >
    {/* IG Header */}
    <div className="flex items-center gap-2 px-3 py-2 border-b border-[#1e293b]">
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#f59e0b] via-[#ec4899] to-[#8b5cf6]" />
      <span className="text-[10px] text-[#f0f4f8] font-semibold">your_brand</span>
      <span className="text-[8px] text-[#64748b] ml-auto">Sponsored</span>
    </div>
    {/* AI Generated Image placeholder */}
    <div className="h-[180px] sm:h-[220px] bg-gradient-to-br from-[#ec4899]/20 via-[#8b5cf6]/20 to-[#00e5ff]/20 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(236,72,153,0.3),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.2),transparent_50%)]" />
      <div className="text-center z-10">
        <span className="text-3xl">🎨</span>
        <p className="text-[9px] text-[#94a3b8] mt-1">AI Generated</p>
      </div>
      {/* Sparkle badge */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#00ff88]/20 border border-[#00ff88]/30"
      >
        <span className="text-[8px] text-[#00ff88] font-bold">AI ✨</span>
      </motion.div>
    </div>
    {/* IG Actions */}
    <div className="px-3 py-2">
      <div className="flex gap-3 mb-1.5">
        <span className="text-sm">❤️</span>
        <span className="text-sm">💬</span>
        <span className="text-sm">📤</span>
        <span className="text-sm ml-auto">🔖</span>
      </div>
      <p className="text-[9px] text-[#f0f4f8] font-semibold">2,847 likes</p>
      <p className="text-[9px] text-[#94a3b8] mt-0.5 line-clamp-2">
        <span className="text-[#f0f4f8] font-semibold">your_brand</span>{" "}
        AI สร้าง Caption ให้อัตโนมัติ พร้อม Hashtag 30 อัน 🚀✨
      </p>
    </div>
  </motion.div>
);

const TikTokCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 30, rotate: 2 }}
    animate={{ opacity: 1, y: 0, rotate: 2 }}
    transition={{ delay: 0.5, duration: 0.6 }}
    className="absolute -right-4 sm:right-8 top-[25%] w-[160px] sm:w-[190px] rounded-2xl bg-[#111827] border border-[#1e293b] overflow-hidden shadow-2xl shadow-[#00e5ff]/10 z-10"
  >
    {/* TikTok Video placeholder */}
    <div className="h-[260px] sm:h-[300px] bg-gradient-to-b from-[#0c1220] to-[#111827] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.1),transparent_70%)]" />
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <div className="w-0 h-0 border-l-[14px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
        </div>
      </div>
      {/* Right side actions */}
      <div className="absolute right-3 bottom-20 flex flex-col items-center gap-4">
        {[
          { emoji: "❤️", count: "42.5K" },
          { emoji: "💬", count: "1,203" },
          { emoji: "🔖", count: "8,901" },
          { emoji: "📤", count: "3,456" },
        ].map((action) => (
          <div key={action.emoji} className="text-center">
            <span className="text-base">{action.emoji}</span>
            <p className="text-[8px] text-[#f0f4f8] mt-0.5">{action.count}</p>
          </div>
        ))}
      </div>
      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-[9px] text-[#f0f4f8] font-semibold mb-0.5">@creator_th</p>
        <p className="text-[8px] text-[#94a3b8] line-clamp-2">
          AI เขียนสคริปต์ให้ใน 10 วินาที 🤯 #AICreator #LocalAI
        </p>
        {/* Music bar */}
        <div className="flex items-center gap-1 mt-1.5">
          <span className="text-[8px]">🎵</span>
          <div className="flex-1 h-[2px] bg-[#1e293b] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#00e5ff] rounded-full"
              animate={{ width: ["0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const YouTubeThumb = () => (
  <motion.div
    initial={{ opacity: 0, y: 20, rotate: 1 }}
    animate={{ opacity: 1, y: 0, rotate: 1 }}
    transition={{ delay: 0.7, duration: 0.6 }}
    className="absolute left-[5%] sm:left-[15%] bottom-[8%] w-[220px] sm:w-[280px] rounded-xl bg-[#111827] border border-[#1e293b] overflow-hidden shadow-2xl shadow-[#f87171]/10 z-10"
  >
    {/* Thumbnail */}
    <div className="h-[100px] sm:h-[130px] bg-gradient-to-br from-[#f87171]/15 via-[#ec4899]/10 to-[#8b5cf6]/15 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(255,0,0,0.15),transparent_60%)]" />
      {/* Duration badge */}
      <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[8px] text-white font-mono">
        12:34
      </div>
      {/* AI Generated badge */}
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#FF0000]/90"
      >
        <span className="text-[7px] text-white font-bold">AI Thumbnail ✨</span>
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-4xl opacity-60">▶️</span>
      </div>
    </div>
    {/* Info */}
    <div className="p-2.5 flex gap-2">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FF0000] to-[#ec4899] shrink-0" />
      <div className="min-w-0">
        <p className="text-[10px] text-[#f0f4f8] font-semibold line-clamp-2 leading-tight">
          AI เขียนสคริปต์ 15 นาทีให้ใน 30 วินาที 🤯 ดีกว่า ChatGPT?
        </p>
        <p className="text-[8px] text-[#64748b] mt-0.5">
          Creator Tech TH • 125K views • 2 days ago
        </p>
      </div>
    </div>
  </motion.div>
);

const NotificationBubbles = () => (
  <>
    {[
      { text: "💰 ประหยัด ฿3,330/เดือน", x: "right-[5%]", y: "top-[20%]", delay: 1, color: "#00ff88" },
      { text: "🚀 Generate รูป 4 แบบ ใน 20 วิ", x: "left-[3%]", y: "top-[60%]", delay: 1.5, color: "#00e5ff" },
      { text: "✍️ สคริปต์ 10 นาที เสร็จใน 30 วิ", x: "right-[10%]", y: "bottom-[20%]", delay: 2, color: "#ec4899" },
    ].map((bubble, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: bubble.delay, duration: 0.5 }}
        className={`absolute ${bubble.x} ${bubble.y} z-20 hidden lg:block`}
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
          className="px-3 py-1.5 rounded-full border backdrop-blur-sm"
          style={{
            background: bubble.color + "10",
            borderColor: bubble.color + "30",
          }}
        >
          <span className="text-xs font-medium" style={{ color: bubble.color }}>
            {bubble.text}
          </span>
        </motion.div>
      </motion.div>
    ))}
  </>
);

// ─── Stats ticker ───
const StatsTicker = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2 }}
    className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-10"
  >
    {[
      { value: "฿0", label: "ค่า AI ต่อเดือน", color: "#00ff88" },
      { value: "∞", label: "Generate ไม่จำกัด", color: "#00e5ff" },
      { value: "24/7", label: "ใช้ได้ตลอด", color: "#8b5cf6" },
      { value: "100%", label: "ข้อมูลเป็นของคุณ", color: "#ec4899" },
    ].map((stat) => (
      <div key={stat.label} className="text-center">
        <motion.div
          className="text-xl sm:text-2xl font-black"
          style={{ color: stat.color }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
        >
          {stat.value}
        </motion.div>
        <div className="text-[10px] sm:text-xs text-[#64748b]">{stat.label}</div>
      </div>
    ))}
  </motion.div>
);

// ─── Main Hero ───
export default function CreatorHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(236,72,153,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_70%,rgba(139,92,246,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,229,255,0.04),transparent_60%)]" />

      {/* Floating social mockups */}
      <div className="absolute inset-0 hidden md:block">
        <InstagramPost />
        <TikTokCard />
        <YouTubeThumb />
      </div>

      {/* Notification bubbles */}
      <NotificationBubbles />

      {/* Center content */}
      <div className="relative z-20 max-w-3xl mx-auto px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Platform badges */}
          <div className="flex justify-center gap-2 mb-6">
            {[
              { name: "YouTube", color: "#FF0000", bg: "#FF000020" },
              { name: "Instagram", color: "#E4405F", bg: "#E4405F20" },
              { name: "TikTok", color: "#ffffff", bg: "#ffffff15" },
              { name: "Facebook", color: "#1877F2", bg: "#1877F220" },
              { name: "Threads", color: "#ffffff", bg: "#ffffff10" },
            ].map((p) => (
              <motion.span
                key={p.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: Math.random() * 0.5 }}
                className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                style={{ background: p.bg, color: p.color, border: `1px solid ${p.color}30` }}
              >
                {p.name}
              </motion.span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black leading-tight mb-6">
            <span className="text-[#f0f4f8]">สร้าง Content</span>
            <br />
            <span className="bg-gradient-to-r from-[#ec4899] via-[#8b5cf6] to-[#00e5ff] bg-clip-text text-transparent">
              ด้วย AI ส่วนตัว
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#94a3b8] max-w-xl mx-auto mb-4 leading-relaxed">
            เขียนสคริปต์ สร้างรูป ทำ Thumbnail สร้าง Caption + Hashtag
            <br className="hidden sm:block" />
            ทั้งหมดบนเครื่องของคุณ <span className="text-[#00ff88] font-semibold">ไม่มีค่ารายเดือน</span>
          </p>

          {/* Strikethrough price */}
          <div className="mb-8">
            <span className="text-sm text-[#f87171] line-through mr-3">
              Subscription ฿3,330/เดือน
            </span>
            <span className="text-lg font-bold text-[#00ff88]">
              → ฿59,900 ครั้งเดียว ใช้ตลอดชีวิต
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#creator"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#ec4899] to-[#8b5cf6] text-white font-bold text-base hover:opacity-90 transition-opacity shadow-lg shadow-[#ec4899]/20"
            >
              ดูแพ็คเกจสำหรับ Creator →
            </a>
            <a
              href="/contact"
              className="px-8 py-4 rounded-xl border border-[#1e293b] text-[#f0f4f8] font-semibold text-base hover:border-[#ec4899] hover:text-[#ec4899] transition-all"
            >
              ปรึกษาฟรี
            </a>
          </div>

          <StatsTicker />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#060a14] to-transparent z-10" />
    </section>
  );
}
