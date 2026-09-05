"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Phone } from "lucide-react";

const cardClass = "flex items-center gap-4 p-5 rounded-xl bg-[#111827] border border-[#1e293b]";

export default function Contact() {
  return (
    <section id="contact" className="py-16 lg:py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-[#f0f4f8] mb-4">ขอเดโมและประเมินสเปก</h2>
          <p className="text-[#94a3b8]">บอก workload ของคุณ, เราจะช่วยวาง Local AI ที่เหมาะสม</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <a data-cta="line" className={cardClass}><MessageCircle size={22} className="text-[#00C300]" /><span className="text-[#f0f4f8] font-bold">แชทผ่าน LINE</span></a>
            <a data-cta="tel" className={`${cardClass} text-[#f0f4f8] font-bold`}><Phone size={22} className="text-[#00e5ff]" /></a>
            <a data-cta="email" className={`${cardClass} text-[#f0f4f8] font-bold`}><Mail size={22} className="text-[#8b5cf6]" /></a>
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-2xl bg-[#111827] border border-[#1e293b] p-6 md:p-8">
            <div data-cta="form" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
