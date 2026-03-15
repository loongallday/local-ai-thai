"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Cpu } from "lucide-react";

const links = [
  { href: "/how-it-works", label: "วิธีทำงาน" },
  { href: "/packages", label: "แพ็คเกจ & ราคา" },
  { href: "/creator", label: "สำหรับ Creator", highlight: true },
  { href: "/services", label: "บริการ" },
  { href: "/contact", label: "ติดต่อเรา" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

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
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#00ff88] flex items-center justify-center">
            <Cpu size={18} className="text-[#060a14]" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            <span className="gradient-text-cyan">Local</span>
            <span className="text-[#f0f4f8]">AI</span>
            <span className="text-[#64748b] text-xs ml-1.5 font-normal hidden sm:inline">
              Thailand
            </span>
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                (l as any).highlight
                  ? "text-[#ec4899] hover:text-[#ec4899]/80"
                  : "text-[#94a3b8] hover:text-[#00e5ff]"
              }`}
            >
              {l.label}
            </a>
          ))}
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
          className="md:hidden text-[#94a3b8]"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#0c1220]/95 backdrop-blur-xl border-b border-[#1e293b] px-6 pb-6"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block py-3 font-medium transition-colors ${
                (l as any).highlight
                  ? "text-[#ec4899]"
                  : "text-[#94a3b8] hover:text-[#00e5ff]"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/contact"
            onClick={() => setOpen(false)}
            className="block mt-2 text-center text-sm font-semibold px-5 py-3 rounded-lg bg-gradient-to-r from-[#00e5ff] to-[#00ff88] text-[#060a14]"
          >
            ขอใบเสนอราคา
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
