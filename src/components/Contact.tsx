"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Mail, MessageCircle, Phone, Send } from "lucide-react";

const fieldClass = "w-full px-4 py-2.5 rounded-lg bg-[#0c1220] border border-[#2a3a4e] text-[#f0f4f8] text-sm placeholder:text-[#64748b] focus:outline-none focus:border-[#00e5ff]";

export default function Contact() {
  const pathname = usePathname();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const data = new FormData(event.currentTarget);
    data.set("source_page", pathname);
    const searchParams = new URLSearchParams(window.location.search);
    data.set("campaign", searchParams.get("campaign") ?? "");
    data.set("keyword", searchParams.get("keyword") ?? "");
    const response = await fetch("https://formspree.io/f/mvzwbyrd", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    setSubmitting(false);
    if (response.ok) setSubmitted(true);
  }

  return (
    <section id="contact" className="py-16 lg:py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-[#f0f4f8] mb-4">ขอเดโมและประเมินสเปก</h2>
          <p className="text-[#94a3b8]">บอก workload ของคุณ, เราจะช่วยวาง Local AI ที่เหมาะสม</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <a href="https://lin.ee/rYvSzrg" className="flex items-center gap-4 p-5 rounded-xl bg-[#111827] border border-[#1e293b]"><MessageCircle size={22} className="text-[#00C300]" /><span className="text-[#f0f4f8] font-bold">แชทผ่าน LINE</span></a>
            <a href="tel:+66827047606" className="flex items-center gap-4 p-5 rounded-xl bg-[#111827] border border-[#1e293b]"><Phone size={22} className="text-[#00e5ff]" /><span className="text-[#f0f4f8] font-bold">082-704-7606</span></a>
            <a href="mailto:chavin@pace-design.co.th" className="flex items-center gap-4 p-5 rounded-xl bg-[#111827] border border-[#1e293b]"><Mail size={22} className="text-[#8b5cf6]" /><span className="text-[#f0f4f8] font-bold">chavin@pace-design.co.th</span></a>
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-2xl bg-[#111827] border border-[#1e293b] p-6 md:p-8">
            {submitted ? <div className="py-12 text-center"><CheckCircle size={32} className="text-[#00ff88] mx-auto mb-4" /><p className="font-bold text-[#f0f4f8]">ส่งข้อมูลเรียบร้อยแล้ว</p></div> : <form className="space-y-4" onSubmit={handleSubmit}>
              <input type="hidden" name="source_domain" value="localaithai.com" />
              <input type="hidden" name="crm_source" value="Local AI Thai" />
              <input type="hidden" name="source_page" value={pathname} />
              <input type="hidden" name="campaign" value="" />
              <input type="hidden" name="keyword" value="" />
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="text-xs text-[#94a3b8]">ชื่อผู้ติดต่อ<input required name="contact_name" className={fieldClass} /></label>
                <label className="text-xs text-[#94a3b8]">โทรศัพท์ อีเมล หรือ LINE<input required name="contact_channel" className={fieldClass} /></label>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="text-xs text-[#94a3b8]">บริษัท<input required name="company" className={fieldClass} /></label>
                <label className="text-xs text-[#94a3b8]">ประเภทองค์กร<select required name="customer_type" className={fieldClass}><option value="">เลือกประเภท</option><option value="SME">SME</option><option value="clinic">คลินิก</option><option value="professional_office">สำนักงานวิชาชีพ</option><option value="enterprise">องค์กรขนาดใหญ่</option><option value="public_sector">ภาครัฐ</option><option value="other">อื่นๆ</option></select></label>
              </div>
              <label className="block text-xs text-[#94a3b8]">ต้องการให้ AI ช่วยอะไร<textarea required name="use_case" rows={3} className={fieldClass} placeholder="เช่น อ่านเอกสาร แปลภาษา ถอดเสียง หรือค้นหาความรู้บริษัท" /></label>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="text-xs text-[#94a3b8]">จำนวนผู้ใช้โดยประมาณ<input required name="estimated_users" className={fieldClass} placeholder="เช่น 12 คน" /></label>
                <label className="text-xs text-[#94a3b8]">ความต้องการโมเดล<input name="model_requirements" className={fieldClass} placeholder="เช่น ไทย อังกฤษ ภาพ" /></label>
                <label className="text-xs text-[#94a3b8]">ความละเอียดอ่อนของข้อมูล<select required name="data_sensitivity" className={fieldClass}><option value="">เลือก</option><option value="general">ข้อมูลทั่วไป</option><option value="internal">ข้อมูลภายในองค์กร</option><option value="sensitive">ข้อมูลอ่อนไหว</option></select></label>
                <label className="text-xs text-[#94a3b8]">สนใจ hardware<select required name="hardware_interest" className={fieldClass}><option value="">ยังไม่แน่ใจ</option><option value="spark_class">Spark-class desk box</option><option value="dual_spark">Dual Spark</option><option value="rtx_5090">RTX 5090 workstation</option><option value="gpu_server">GPU server</option><option value="hardware_only">hardware only</option></select></label>
                <label className="text-xs text-[#94a3b8]">แอป Mimir ที่สนใจ<input name="software_interest" className={fieldClass} placeholder="เช่น Scan, Bridge, Echo" /></label>
                <label className="text-xs text-[#94a3b8]">งบประมาณ<input name="budget" className={fieldClass} /></label>
              </div>
              <label className="block text-xs text-[#94a3b8]">ช่วงเวลาที่ต้องการ<input required name="timeline" className={fieldClass} placeholder="เช่น ภายในไตรมาสนี้" /></label>
              <button type="submit" disabled={submitting} className="w-full flex justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#00e5ff] to-[#00ff88] text-[#060a14] font-bold text-sm"><Send size={16} />{submitting ? "กำลังส่ง..." : "ส่งข้อมูล"}</button>
            </form>}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
