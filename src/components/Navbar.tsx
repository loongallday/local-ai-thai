"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

/* ─── Nav structure: top-level links + dropdowns ─── */
interface NavLink {
  href: string;
  label: string;
  highlight?: boolean;
  desc?: string;
}

interface NavGroup {
  label: string;
  children: NavLink[];
}

type NavItem = NavLink | NavGroup;

function isGroup(item: NavItem): item is NavGroup {
  return "children" in item;
}

const navItems: NavItem[] = [
  { href: "/how-it-works", label: "วิธีทำงาน" },
  {
    label: "บริการ",
    children: [
      { href: "/packages", label: "แพ็คเกจ & ราคา", desc: "ติดตั้ง AI ครบชุด" },
      { href: "/personal", label: "ใช้ที่บ้าน", desc: "AI ส่วนตัว JARVIS" },
      { href: "/creator", label: "Creator", highlight: true, desc: "สำหรับ Content Creator" },
      { href: "/cloud", label: "Cloud AI Setup", desc: "AI Automation บน VPS" },
      { href: "/services", label: "บริการทั้งหมด", desc: "ดูบริการทุกรูปแบบ" },
      { href: "/support", label: "ดูแลระบบ", desc: "Maintenance & Support" },
    ],
  },
  {
    label: "Hardware",
    children: [
      { href: "/hardware", label: "เปรียบเทียบ Hardware", desc: "สเปค Benchmark ทุกเครื่อง" },
      { href: "/shop", label: "ร้านค้า", desc: "ซื้อ Hardware ราคาปลีก" },
      { href: "/tech-stack", label: "Tech Stack", desc: "ซอฟต์แวร์ 35+ ตัว" },
    ],
  },
  { href: "/contact", label: "ติดต่อเรา" },
];

/* ─── Desktop Dropdown ─── */
function DesktopDropdown({ group, pathname }: { group: NavGroup; pathname: string }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const isChildActive = group.children.some((c) => pathname === c.href);

  const enter = () => { clearTimeout(timeout.current); setOpen(true); };
  const leave = () => { timeout.current = setTimeout(() => setOpen(false), 150); };

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 text-sm font-medium transition-colors ${
          isChildActive ? "text-[#00e5ff]" : "text-[#94a3b8] hover:text-[#00e5ff]"
        }`}
      >
        {group.label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={14} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-xl bg-[#0c1220]/95 backdrop-blur-xl border border-[#1e293b] shadow-2xl shadow-black/40 overflow-hidden"
          >
            {group.children.map((child) => {
              const isActive = pathname === child.href;
              return (
                <a
                  key={child.href}
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 transition-all hover:bg-[#1e293b]/50 ${
                    isActive ? "bg-[#00e5ff]/5" : ""
                  }`}
                >
                  <span className={`text-sm font-medium block ${
                    isActive
                      ? "text-[#00e5ff]"
                      : child.highlight
                        ? "text-[#ec4899]"
                        : "text-[#f0f4f8]"
                  }`}>
                    {child.label}
                    {isActive && <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00e5ff] ml-2 align-middle" />}
                  </span>
                  {child.desc && <span className="text-[11px] text-[#64748b] block mt-0.5">{child.desc}</span>}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Mobile Group ─── */
function MobileGroup({ group, pathname, onNavigate }: { group: NavGroup; pathname: string; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3 font-medium text-[#94a3b8] hover:text-[#00e5ff] transition-colors"
      >
        {group.label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-4 pb-2 space-y-0.5">
              {group.children.map((child) => {
                const isActive = pathname === child.href;
                return (
                  <a
                    key={child.href}
                    href={child.href}
                    onClick={onNavigate}
                    className={`block py-2 px-3 rounded-lg transition-colors text-sm ${
                      isActive
                        ? "text-[#00e5ff] bg-[#00e5ff]/5"
                        : child.highlight
                          ? "text-[#ec4899]"
                          : "text-[#94a3b8] hover:text-[#f0f4f8] hover:bg-[#1e293b]/30"
                    }`}
                  >
                    {isActive && "→ "}{child.label}
                    {child.desc && <span className="text-[10px] text-[#64748b] block">{child.desc}</span>}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Navbar ─── */
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#060a14]/90 backdrop-blur-xl border-b border-[#1e293b]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <img src="/icon.svg" alt="LocalAI" width={32} height={32} className="rounded-lg" />
          <span className="text-lg font-bold tracking-tight">
            <span className="gradient-text-cyan">Local</span>
            <span className="text-[#f0f4f8]">AI</span>
            <span className="text-[#64748b] text-xs ml-1.5 font-normal hidden sm:inline">
              Thailand
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item, i) =>
            isGroup(item) ? (
              <DesktopDropdown key={item.label} group={item} pathname={pathname} />
            ) : (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors relative ${
                  pathname === item.href
                    ? "text-[#00e5ff]"
                    : item.highlight
                      ? "text-[#ec4899] hover:text-[#ec4899]/80"
                      : "text-[#94a3b8] hover:text-[#00e5ff]"
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#00e5ff] rounded-full" />
                )}
              </a>
            )
          )}
          <a
            href="/contact"
            className="text-sm font-semibold px-5 py-2 rounded-lg bg-gradient-to-r from-[#00e5ff] to-[#00ff88] text-[#060a14] hover:opacity-90 transition-opacity"
          >
            ขอใบเสนอราคา
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-[#94a3b8] p-1"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={open ? "close" : "menu"}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
              className="block"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden"
          >
            <div className="bg-[#0c1220]/95 backdrop-blur-xl border-b border-[#1e293b] px-6 pb-6">
              {navItems.map((item) =>
                isGroup(item) ? (
                  <MobileGroup key={item.label} group={item} pathname={pathname} onNavigate={() => setOpen(false)} />
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block py-3 font-medium transition-colors ${
                      pathname === item.href
                        ? "text-[#00e5ff]"
                        : item.highlight
                          ? "text-[#ec4899]"
                          : "text-[#94a3b8] hover:text-[#00e5ff]"
                    }`}
                  >
                    {pathname === item.href && "→ "}{item.label}
                  </a>
                )
              )}
              <a
                href="/contact"
                onClick={() => setOpen(false)}
                className="block mt-4 text-center text-sm font-semibold px-5 py-3 rounded-lg bg-gradient-to-r from-[#00e5ff] to-[#00ff88] text-[#060a14]"
              >
                ขอใบเสนอราคา
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
