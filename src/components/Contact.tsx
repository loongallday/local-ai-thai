"use client";
import { motion } from "framer-motion";
import { MessageCircle, Phone, Mail, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,229,255,0.06)_0%,transparent_60%)]" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#f0f4f8] mb-4">
            ปรึกษาฟรี ไม่มีค่าใช้จ่าย
          </h2>
          <p className="text-[#94a3b8] max-w-lg mx-auto text-base leading-relaxed">
            ไม่แน่ใจว่าต้องใช้อะไร? บอกเราว่าธุรกิจของคุณทำอะไร ใช้กี่คน
            <br />
            เราจะแนะนำแพ็คเกจที่เหมาะที่สุดให้
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact methods */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <a
              href="#"
              className="flex items-center gap-4 p-5 rounded-xl bg-[#111827] border border-[#1e293b] hover:border-[#00ff88]/40 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#00C300]/15 flex items-center justify-center shrink-0">
                <MessageCircle size={22} className="text-[#00C300]" />
              </div>
              <div>
                <p className="font-bold text-[#f0f4f8] group-hover:text-[#00C300] transition-colors">
                  แชทผ่าน LINE (ตอบเร็วที่สุด)
                </p>
                <p className="text-sm text-[#64748b]">@localai.th</p>
              </div>
            </a>

            <a
              href="tel:+66000000000"
              className="flex items-center gap-4 p-5 rounded-xl bg-[#111827] border border-[#1e293b] hover:border-[#00e5ff]/40 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#00e5ff]/10 flex items-center justify-center shrink-0">
                <Phone size={22} className="text-[#00e5ff]" />
              </div>
              <div>
                <p className="font-bold text-[#f0f4f8] group-hover:text-[#00e5ff] transition-colors">
                  โทรหาเรา
                </p>
                <p className="text-sm text-[#64748b]">
                  0XX-XXX-XXXX (จ-ศ 9:00-18:00)
                </p>
              </div>
            </a>

            <a
              href="mailto:hello@localaithai.com"
              className="flex items-center gap-4 p-5 rounded-xl bg-[#111827] border border-[#1e293b] hover:border-[#8b5cf6]/40 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center shrink-0">
                <Mail size={22} className="text-[#8b5cf6]" />
              </div>
              <div>
                <p className="font-bold text-[#f0f4f8] group-hover:text-[#8b5cf6] transition-colors">
                  ส่งอีเมล
                </p>
                <p className="text-sm text-[#64748b]">hello@localaithai.com</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-5 rounded-xl bg-[#111827] border border-[#1e293b]">
              <div className="w-12 h-12 rounded-xl bg-[#ec4899]/10 flex items-center justify-center shrink-0">
                <MapPin size={22} className="text-[#ec4899]" />
              </div>
              <div>
                <p className="font-bold text-[#f0f4f8]">ออฟฟิศ</p>
                <p className="text-sm text-[#64748b]">
                  กรุงเทพมหานคร, ประเทศไทย
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-[#111827] border border-[#1e293b] p-6 md:p-8"
          >
            <h3 className="text-lg font-bold text-[#f0f4f8] mb-2">
              ขอใบเสนอราคา
            </h3>
            <p className="text-xs text-[#64748b] mb-6">
              กรอกข้อมูลคร่าวๆ แล้วเราจะติดต่อกลับภายใน 1 วันทำการ
            </p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-xs text-[#94a3b8] mb-1 block">
                  ชื่อ / บริษัท
                </label>
                <input
                  type="text"
                  placeholder="เช่น สมชาย / บริษัท ABC จำกัด"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0c1220] border border-[#1e293b] text-[#f0f4f8] text-sm placeholder:text-[#64748b] focus:outline-none focus:border-[#00e5ff] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-[#94a3b8] mb-1 block">
                  เบอร์โทร / LINE ID
                </label>
                <input
                  type="text"
                  placeholder="0XX-XXX-XXXX หรือ LINE ID"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0c1220] border border-[#1e293b] text-[#f0f4f8] text-sm placeholder:text-[#64748b] focus:outline-none focus:border-[#00e5ff] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-[#94a3b8] mb-1 block">
                  สนใจเรื่องอะไร
                </label>
                <select className="w-full px-4 py-2.5 rounded-lg bg-[#0c1220] border border-[#1e293b] text-[#f0f4f8] text-sm focus:outline-none focus:border-[#00e5ff] transition-colors">
                  <option value="">เลือกหัวข้อ</option>
                  <option>AI สำหรับออฟฟิศ / ทีมเล็ก</option>
                  <option>AI สำหรับ Startup / Developer</option>
                  <option>AI สำหรับองค์กรขนาดใหญ่</option>
                  <option>แพ็คเกจ Creator / Influencer</option>
                  <option>UPS / Rack / NAS</option>
                  <option>ยังไม่แน่ใจ — ขอคำปรึกษาก่อน</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-[#94a3b8] mb-1 block">
                  เล่าให้ฟังคร่าวๆ
                </label>
                <textarea
                  rows={3}
                  placeholder="เช่น มีทีม 10 คน อยากให้ AI ช่วยค้นเอกสารและตอบลูกค้า..."
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0c1220] border border-[#1e293b] text-[#f0f4f8] text-sm placeholder:text-[#64748b] focus:outline-none focus:border-[#00e5ff] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#00e5ff] to-[#00ff88] text-[#060a14] font-bold text-sm hover:opacity-90 transition-opacity"
              >
                <Send size={16} />
                ส่งข้อมูล
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
