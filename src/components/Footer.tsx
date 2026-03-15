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
              LocalAI Thailand
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-[#64748b]">
            <a href="#how-it-works" className="hover:text-[#00e5ff] transition-colors">
              วิธีทำงาน
            </a>
            <a href="#packages" className="hover:text-[#00e5ff] transition-colors">
              แพ็คเกจ & ราคา
            </a>
            <a href="/creator" className="hover:text-[#ec4899] transition-colors">
              สำหรับ Creator
            </a>
            <a href="#services" className="hover:text-[#00e5ff] transition-colors">
              บริการ
            </a>
            <a href="#contact" className="hover:text-[#00e5ff] transition-colors">
              ติดต่อเรา
            </a>
          </div>

          <p className="text-xs text-[#64748b]">
            &copy; 2026 LocalAI Thailand — บริการติดตั้ง AI ส่วนตัวสำหรับธุรกิจ
          </p>
        </div>

        {/* SEO footer text */}
        <div className="mt-8 pt-6 border-t border-[#1e293b]/50 text-center">
          <p className="text-[10px] text-[#64748b]/60 max-w-4xl mx-auto leading-relaxed">
            LocalAI Thailand — บริการติดตั้งระบบ AI ส่วนตัว (Private AI / Local AI) สำหรับธุรกิจในประเทศไทย
            ทำงานบนเครื่องของคุณ 100% ไม่ส่งข้อมูลขึ้นคลาวด์ สอดคล้องกับ PDPA
            รองรับภาษาไทย จ่ายครั้งเดียวไม่มีค่ารายเดือน
            เหมาะสำหรับ SME, คลินิก, สำนักงานกฎหมาย, โรงพยาบาล, ธนาคาร, หน่วยงานรัฐ, Creator, Influencer
            พร้อมบริการ UPS สำรองไฟ, ตู้ Rack, NAS เก็บข้อมูล ครบวงจร
            ตัวแทนจำหน่าย Ingram Micro, TD Synnex, SIS, Eaton, Schneider Electric
          </p>
        </div>
      </div>
    </footer>
  );
}
