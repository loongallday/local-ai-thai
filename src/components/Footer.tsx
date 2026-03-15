"use client";
import { Cpu } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#1e293b] py-10 bg-[#060a14]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#00ff88] flex items-center justify-center">
              <Cpu size={14} className="text-[#060a14]" />
            </div>
            <span className="text-sm font-bold text-[#f0f4f8]">
              NeuralBox Thailand
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-[#64748b]">
            <a href="#packages" className="hover:text-[#00e5ff] transition-colors">
              แพ็คเกจ
            </a>
            <a href="#infrastructure" className="hover:text-[#00e5ff] transition-colors">
              โครงสร้างพื้นฐาน
            </a>
            <a href="#services" className="hover:text-[#00e5ff] transition-colors">
              บริการ
            </a>
            <a href="#contact" className="hover:text-[#00e5ff] transition-colors">
              ติดต่อ
            </a>
          </div>

          <p className="text-xs text-[#64748b]">
            &copy; 2026 NeuralBox Thailand. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
