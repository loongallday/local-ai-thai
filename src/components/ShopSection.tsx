"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Monitor, Cpu, HardDrive, BatteryCharging, Server, ExternalLink, ArrowRight, Tag } from "lucide-react";

/* ─── Types ─── */
interface Product {
  name: string;
  brand: string;
  image?: string;
  specs: string;
  detail: string;
  price: number;
  priceNote?: string;
  aiUse: string;
  badge?: string;
  badgeColor?: string;
  link?: string;
}

interface Category {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  color: string;
  products: Product[];
}

/* ─── Product Data (non-discounted retail prices, THB incl. VAT) ─── */
const categories: Category[] = [
  {
    id: "mac-mini",
    emoji: "🖥️",
    title: "Apple Mac Mini",
    subtitle: "AI ส่วนตัวเงียบสนิท ใช้ไฟ 20W วางบนโต๊ะได้",
    color: "#94a3b8",
    products: [
      {
        name: "Mac Mini M4 16GB / 256GB",
        brand: "Apple",
        specs: "M4 10C CPU / 10C GPU • 16GB • 256GB SSD",
        detail: "Entry-level สำหรับเริ่มต้น AI รัน model 7-8B ได้คล่อง",
        price: 20900,
        aiUse: "รัน 7B model (Qwen 7B, Llama 8B) ใช้ 1-2 คน",
        badge: "Entry",
        badgeColor: "#94a3b8",
      },
      {
        name: "Mac Mini M4 16GB / 512GB",
        brand: "Apple",
        specs: "M4 10C CPU / 10C GPU • 16GB • 512GB SSD",
        detail: "เหมือน 256GB แต่เก็บ model ได้มากกว่า",
        price: 27900,
        aiUse: "รัน 7B model + เก็บ model หลายตัว",
      },
      {
        name: "Mac Mini M4 24GB / 512GB",
        brand: "Apple",
        specs: "M4 10C CPU / 10C GPU • 24GB • 512GB SSD",
        detail: "RAM เพิ่มเป็น 24GB รัน model 14B ได้",
        price: 34900,
        aiUse: "รัน 14B model (Qwen 14B) ใช้ 1-3 คน",
        badge: "แนะนำ",
        badgeColor: "#00e5ff",
      },
      {
        name: "Mac Mini M4 Pro 24GB / 512GB",
        brand: "Apple",
        specs: "M4 Pro 12C CPU / 16C GPU • 24GB • 512GB SSD",
        detail: "Bandwidth 273 GB/s เร็วกว่า M4 สองเท่า",
        price: 49900,
        aiUse: "รัน 14B เร็วขึ้น 2x หรือ model ขนาดกลาง",
        badge: "Pro",
        badgeColor: "#00ff88",
      },
      {
        name: "Mac Mini M4 Pro (14C) 24GB / 512GB",
        brand: "Apple",
        specs: "M4 Pro 14C CPU / 20C GPU • 24GB • 512GB SSD",
        detail: "CPU/GPU cores มากกว่า สำหรับ multi-task",
        price: 56900,
        aiUse: "รัน AI + งานอื่นพร้อมกัน",
      },
      {
        name: "Mac Mini M4 Pro (14C) 64GB / 512GB",
        brand: "Apple",
        specs: "M4 Pro 14C CPU / 20C GPU • 64GB • 512GB SSD",
        detail: "64GB RAM รัน 70B model ได้ BTO สั่งผลิต",
        price: 77900,
        aiUse: "รัน 32B-70B model (Qwen 32B, Llama 70B Q4)",
        badge: "BTO",
        badgeColor: "#8b5cf6",
      },
      {
        name: "Mac Mini M4 Pro 48GB / 4TB",
        brand: "Apple",
        specs: "M4 Pro 12C CPU / 16C GPU • 48GB • 4TB SSD",
        detail: "48GB RAM + storage ใหญ่สุด BTO สั่งผลิต",
        price: 105900,
        aiUse: "รัน 32B model + เก็บ dataset ใหญ่",
        badge: "BTO",
        badgeColor: "#8b5cf6",
      },
    ],
  },
  {
    id: "mac-studio",
    emoji: "🏎️",
    title: "Apple Mac Studio",
    subtitle: "พลังสูงสุด Apple Silicon — 546 GB/s bandwidth",
    color: "#8b5cf6",
    products: [
      {
        name: "Mac Studio M4 Max 36GB / 512GB",
        brand: "Apple",
        specs: "M4 Max 14C CPU / 32C GPU • 36GB • 512GB SSD",
        detail: "Entry Mac Studio ถูกที่สุดที่ได้ M4 Max bandwidth 546 GB/s",
        price: 69900,
        aiUse: "รัน 32B model เร็วมาก (~20 tok/s)",
        badge: "Value",
        badgeColor: "#00e5ff",
      },
      {
        name: "Mac Studio M4 Max 64GB / 1TB",
        brand: "Apple",
        specs: "M4 Max 16C CPU / 40C GPU • 64GB • 1TB SSD",
        detail: "Best seller Mac Studio สำหรับ AI — 546 GB/s + 64GB",
        price: 99900,
        aiUse: "รัน 70B model Q4 ได้เร็ว (~20 tok/s)",
        badge: "Best Seller",
        badgeColor: "#00ff88",
      },
      {
        name: "Mac Studio M4 Max 128GB / 1TB",
        brand: "Apple",
        specs: "M4 Max 16C CPU / 40C GPU • 128GB • 1TB SSD",
        detail: "RAM สูงสุด 128GB — รัน 70B Q8 (คุณภาพสูงสุด) หรือ 100B+",
        price: 129400,
        aiUse: "รัน 70B Q8 หรือ 100B+ model ได้",
        badge: "Max RAM",
        badgeColor: "#f59e0b",
      },
    ],
  },
  {
    id: "gpu",
    emoji: "🎮",
    title: "NVIDIA GPU (การ์ดจอ)",
    subtitle: "สำหรับประกอบเครื่อง PC หรือ Server — VRAM คือหัวใจ",
    color: "#76B900",
    products: [
      {
        name: "RTX 4090 24GB GDDR6X",
        brand: "NVIDIA (Various)",
        specs: "24GB GDDR6X • 1,008 GB/s • 16,384 CUDA cores • 450W",
        detail: "GPU consumer ที่ดีที่สุดรุ่นก่อน ราคาลงมาแล้ว รัน 14B model ได้เร็วมาก",
        price: 68500,
        aiUse: "รัน 7B-14B model ได้เร็วมาก Inference only",
        badge: "คุ้มค่า",
        badgeColor: "#00ff88",
      },
      {
        name: "INNO3D RTX 5090 X3 32GB",
        brand: "INNO3D",
        specs: "32GB GDDR7 • 1,792 GB/s • 21,760 CUDA cores • 575W",
        detail: "RTX 5090 ราคาถูกที่สุดในไทย — VRAM 32GB รัน 22-27B ได้",
        price: 119900,
        aiUse: "รัน 7B-27B model ได้เร็วมาก",
        badge: "ถูกสุด",
        badgeColor: "#00e5ff",
      },
      {
        name: "INNO3D RTX 5090 X3 OC 32GB",
        brand: "INNO3D",
        specs: "32GB GDDR7 • 1,792 GB/s • OC Edition • 575W",
        detail: "เหมือน X3 แต่ factory overclock มาให้",
        price: 125000,
        aiUse: "รัน 27B model เร็วกว่ารุ่นปกติเล็กน้อย",
      },
      {
        name: "Gigabyte AORUS RTX 5090 Master 32GB",
        brand: "Gigabyte",
        specs: "32GB GDDR7 • 1,792 GB/s • Triple Fan • 575W",
        detail: "Premium cooling system เงียบกว่า เย็นกว่า",
        price: 139000,
        aiUse: "รัน 27B model + cooling ดีสำหรับ 24/7",
        badge: "Premium",
        badgeColor: "#f59e0b",
      },
      {
        name: "Gigabyte AORUS RTX 5090 Stealth ICE 32GB",
        brand: "Gigabyte",
        specs: "32GB GDDR7 • 1,792 GB/s • White Edition • 575W",
        detail: "รุ่น White สวยงาม ระบายความร้อนดีมาก",
        price: 148900,
        aiUse: "เหมือน Master แต่สวยกว่า",
      },
    ],
  },
  {
    id: "nas",
    emoji: "💾",
    title: "NAS & HDD Storage",
    subtitle: "เก็บไฟล์ สำรองข้อมูล RAG pipeline — ไม่ต้องจ่ายค่า Cloud",
    color: "#3b82f6",
    products: [
      {
        name: "Synology DS224+ (2-Bay)",
        brand: "Synology",
        specs: "Intel Celeron J4125 • 2GB DDR4 • 2x 3.5\" Bay • 1GbE",
        detail: "NAS 2-Bay ยอดนิยม ใช้ง่าย Synology Drive แทน Google Drive ได้",
        price: 11500,
        priceNote: "ไม่รวม HDD",
        aiUse: "เก็บเอกสารสำหรับ RAG + backup ระบบ AI",
        badge: "ยอดนิยม",
        badgeColor: "#00e5ff",
      },
      {
        name: "Synology DS423+ (4-Bay)",
        brand: "Synology",
        specs: "Intel Celeron J4125 • 2GB DDR4 • 4x 3.5\" Bay + 2x M.2 • 1GbE",
        detail: "4-Bay + SSD cache RAID 5 ให้ 3 เท่าของ HDD ตัวเดียว",
        price: 16050,
        priceNote: "ไม่รวม HDD",
        aiUse: "Dataset ใหญ่ + media library + RAG pipeline",
        badge: "Pro",
        badgeColor: "#00ff88",
      },
      {
        name: "Synology DS423 (4-Bay Budget)",
        brand: "Synology",
        specs: "Realtek RTD1619B • 2GB DDR4 • 4x 3.5\" Bay • 1GbE",
        detail: "4-Bay ราคาประหยัด ไม่มี M.2 slot แต่ใช้งานได้เหมือนกัน",
        price: 9500,
        priceNote: "ไม่รวม HDD",
        aiUse: "เก็บข้อมูล backup ราคาประหยัด",
      },
      {
        name: "Seagate IronWolf 4TB NAS HDD",
        brand: "Seagate",
        specs: "3.5\" SATA3 • 5,900 RPM • 64MB Cache • CMR • 24/7",
        detail: "HDD สำหรับ NAS โดยเฉพาะ ทนทาน 24/7 warranty 3 ปี",
        price: 3790,
        aiUse: "ใส่ NAS สำหรับเก็บเอกสาร RAG",
        badge: "NAS HDD",
        badgeColor: "#3b82f6",
      },
      {
        name: "Seagate IronWolf 8TB NAS HDD",
        brand: "Seagate",
        specs: "3.5\" SATA3 • 7,200 RPM • 256MB Cache • CMR • 24/7",
        detail: "ความจุเยอะขึ้นเท่าตัว สำหรับ media-heavy workload",
        price: 6990,
        aiUse: "Dataset ใหญ่ หรือ Creator ที่มี video เยอะ",
      },
    ],
  },
  {
    id: "ups",
    emoji: "🔋",
    title: "UPS สำรองไฟ",
    subtitle: "ป้องกันไฟดับ ข้อมูลไม่เสียหาย ปิดเครื่อง AI อัตโนมัติ",
    color: "#f59e0b",
    products: [
      {
        name: "Eaton 5E 650VA / 360W",
        brand: "Eaton",
        specs: "Line Interactive • 650VA/360W • 4 outlets • USB",
        detail: "เพียงพอสำหรับ Mac Mini ตัวเดียว สำรองได้ ~45 นาที",
        price: 3200,
        aiUse: "Mac Mini 1 เครื่อง",
      },
      {
        name: "Eaton 5E 1200VA / 660W",
        brand: "Eaton",
        specs: "Line Interactive • 1200VA/660W • 6 outlets • USB",
        detail: "สำรอง Mac Mini + NAS + จอ ได้สบาย",
        price: 6100,
        aiUse: "Mac Mini + NAS + จอ",
        badge: "แนะนำ",
        badgeColor: "#00e5ff",
      },
      {
        name: "Eaton 5E 2200VA / 1200W",
        brand: "Eaton",
        specs: "Line Interactive • 2200VA/1200W • 6 outlets • USB",
        detail: "สำหรับ Mac Studio หรือ Mac Mini + อุปกรณ์เยอะ",
        price: 7200,
        aiUse: "Mac Studio + NAS + อุปกรณ์เสริม",
        badge: "Pro",
        badgeColor: "#00ff88",
      },
      {
        name: "APC BX1400U-MS 1400VA / 700W",
        brand: "APC",
        specs: "Line Interactive • 1400VA/700W • 4 outlets • AVR",
        detail: "APC ยี่ห้อ UPS ที่นิยมที่สุด พร้อม AVR ป้องกันไฟกระชาก",
        price: 5490,
        aiUse: "Mac Mini + NAS",
      },
      {
        name: "APC BVG2200I-MSN 2200VA / 1200W",
        brand: "APC",
        specs: "Line Interactive • 2200VA/1200W • 4 outlets • AVR",
        detail: "กำลังสูง สำหรับเครื่อง AI ที่กินไฟมากกว่าปกติ",
        price: 7900,
        aiUse: "Mac Studio หรือ PC + GPU",
      },
    ],
  },
];

/* ─── Helpers ─── */
function formatPrice(n: number) {
  return "฿" + n.toLocaleString("th-TH");
}

function GlowCard({ children, color = "#00e5ff", className = "" }: { children: React.ReactNode; color?: string; className?: string }) {
  return (
    <div className={`relative rounded-2xl p-[1px] ${className}`} style={{ background: `linear-gradient(135deg, ${color}40, transparent 50%, ${color}20)` }}>
      <div className="rounded-2xl bg-[#0c1220] h-full">{children}</div>
    </div>
  );
}

/* ─── Product Card ─── */
function ProductCard({ product, catColor }: { product: Product; catColor: string }) {
  const [open, setOpen] = useState(false);

  return (
    <GlowCard color={product.badgeColor || catColor}>
      <div className="p-4 sm:p-5">
        <button onClick={() => setOpen(!open)} className="w-full text-left">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="text-sm font-bold text-[#f0f4f8]">{product.name}</h3>
                {product.badge && (
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0" style={{ background: (product.badgeColor || catColor) + "15", color: product.badgeColor || catColor }}>
                    {product.badge}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#64748b] font-mono">{product.specs}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-lg font-black" style={{ color: product.badgeColor || catColor }}>{formatPrice(product.price)}</p>
              {product.priceNote && <p className="text-[9px] text-[#f87171]">{product.priceNote}</p>}
            </div>
          </div>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="mt-3 pt-3 border-t border-[#1e293b] space-y-2">
                <p className="text-xs text-[#94a3b8]">{product.detail}</p>
                <div className="flex items-start gap-2 text-xs">
                  <Cpu size={12} className="text-[#00e5ff] mt-0.5 shrink-0" />
                  <span className="text-[#94a3b8]"><span className="text-[#f0f4f8] font-medium">ใช้กับ AI:</span> {product.aiUse}</span>
                </div>
                <a href="/contact" className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold px-4 py-2 rounded-lg" style={{ background: (product.badgeColor || catColor) + "15", color: product.badgeColor || catColor }}>
                  สั่งซื้อ / สอบถาม <ArrowRight size={12} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GlowCard>
  );
}

/* ─── Bundles ─── */
const bundles = [
  {
    name: "ชุด AI Starter",
    items: "Mac Mini M4 24GB + NAS DS224+ + 2x IronWolf 4TB + UPS Eaton 1200VA",
    total: 59580,
    color: "#00e5ff",
  },
  {
    name: "ชุด AI Pro",
    items: "Mac Mini M4 Pro 64GB + NAS DS423+ + 4x IronWolf 4TB + UPS Eaton 2200VA",
    total: 116310,
    color: "#00ff88",
  },
  {
    name: "ชุด AI Ultra",
    items: "Mac Studio M4 Max 128GB + NAS DS423+ + 4x IronWolf 8TB + UPS 2200VA",
    total: 180410,
    color: "#8b5cf6",
  },
];

/* ─── Main Component ─── */
export default function ShopSection() {
  const [activeCategory, setActiveCategory] = useState("mac-mini");
  const current = categories.find((c) => c.id === activeCategory)!;

  return (
    <section className="relative">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="text-center mb-10">
          <span className="text-4xl mb-4 block">🛒</span>
          <h1 className="text-3xl md:text-5xl font-black text-[#f0f4f8] mb-4">ร้านค้า Hardware</h1>
          <p className="text-[#94a3b8] max-w-2xl mx-auto text-base">
            จำหน่าย Hardware สำหรับ AI ส่วนตัว ราคาปลีกมาตรฐาน — ซื้อเครื่องเปล่า หรือเพิ่มบริการติดตั้ง AI ได้
          </p>
        </div>

        {/* Notice */}
        <div className="rounded-xl p-4 bg-[#111827] border border-[#1e293b] mb-8 text-center">
          <p className="text-xs text-[#94a3b8]">
            <span className="text-[#f59e0b] font-bold">💡 หมายเหตุ:</span> ราคาเป็นราคาปลีกมาตรฐาน (รวม VAT) อ้างอิง Apple Store TH และร้านค้าชั้นนำในไทย — สั่งซื้อผ่านเราพร้อมบริการจัดส่ง + ติดตั้ง AI ได้
          </p>
        </div>

        {/* Category nav */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 sm:mx-0 sm:px-0 sm:justify-center sm:flex-wrap sm:overflow-x-visible sm:pb-0 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shrink-0 ${
                activeCategory === cat.id ? "text-[#060a14] shadow-lg" : "text-[#94a3b8] bg-[#111827] border border-[#1e293b]"
              }`}
              style={activeCategory === cat.id ? { background: cat.color, boxShadow: `0 4px 20px ${cat.color}30` } : {}}
            >
              <span>{cat.emoji}</span>
              <span className="hidden sm:inline">{cat.title.split("(")[0].trim()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Product list */}
      <AnimatePresence mode="wait">
        <motion.div key={current.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="max-w-5xl mx-auto px-6 mb-20">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-black text-[#f0f4f8] flex items-center gap-3">
              <span className="text-2xl">{current.emoji}</span> {current.title}
            </h2>
            <p className="text-xs text-[#94a3b8] mt-1">{current.subtitle}</p>
          </div>

          <div className="space-y-3 sm:space-y-3">
            {current.products.map((product, i) => (
              <motion.div key={product.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <ProductCard product={product} catColor={current.color} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bundle suggestions */}
      <div className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-3xl mb-3 block">📦</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#f0f4f8] mb-3">ชุดแนะนำ (Hardware Only)</h2>
            <p className="text-sm text-[#94a3b8]">ประกอบชุดเอง ราคา hardware รวม — เพิ่มบริการติดตั้ง AI ดู<a href="/packages" className="text-[#00e5ff] hover:underline ml-1">แพ็คเกจ</a></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bundles.map((bundle) => (
              <GlowCard key={bundle.name} color={bundle.color}>
                <div className="p-5">
                  <h3 className="text-base font-bold text-[#f0f4f8] mb-2">{bundle.name}</h3>
                  <p className="text-xs text-[#94a3b8] mb-4 leading-relaxed">{bundle.items}</p>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] text-[#64748b]">รวม hardware</p>
                      <p className="text-xl font-black" style={{ color: bundle.color }}>{formatPrice(bundle.total)}</p>
                    </div>
                    <a href="/contact" className="text-xs font-bold px-3 py-2 rounded-lg" style={{ background: bundle.color + "15", color: bundle.color }}>
                      สั่งซื้อ
                    </a>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </div>

      {/* Upsell to packages */}
      <div className="py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <GlowCard color="#00e5ff">
            <div className="p-8">
              <span className="text-3xl mb-3 block">🤖</span>
              <h2 className="text-xl md:text-2xl font-black text-[#f0f4f8] mb-3">ต้องการติดตั้ง AI ด้วย?</h2>
              <p className="text-sm text-[#94a3b8] mb-6 max-w-lg mx-auto">
                ซื้อ hardware แล้ว เราติดตั้ง AI ให้ครบ — Ollama, Open WebUI, RAG, NAS integration, อบรมทีมงาน พร้อมใช้งานทันที
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/packages" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#00ff88] text-[#060a14] font-bold hover:opacity-90 transition-opacity">
                  ดูแพ็คเกจติดตั้ง AI <ArrowRight size={16} />
                </a>
                <a href="/support" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#1e293b] text-[#94a3b8] font-bold hover:text-[#00e5ff] transition-colors">
                  บริการดูแลระบบ
                </a>
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
