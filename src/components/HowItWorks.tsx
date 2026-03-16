"use client";
import { motion } from "framer-motion";
import {
  FileText,
  ArrowRight,
  Cpu,
  MessageSquareText,
  Search,
  Image,
  BarChart3,
} from "lucide-react";

const steps = [
  {
    num: "01",
    title: "นำเอกสาร & ข้อมูลของคุณเข้าระบบ",
    desc: "ไม่ว่าจะเป็นไฟล์ Word, PDF, Excel, อีเมล หรือข้อมูลลูกค้า — เราใส่เข้าระบบ AI ให้คุณ เหมือนสอนพนักงานใหม่ให้รู้จักบริษัท",
    icon: FileText,
    color: "#00e5ff",
  },
  {
    num: "02",
    title: "AI เรียนรู้ & เข้าใจข้อมูลของคุณ",
    desc: "ระบบจะจัดระเบียบและทำความเข้าใจข้อมูลทั้งหมด ทำงานอยู่ในเครื่องของคุณตลอดเวลา ไม่ส่งข้อมูลออกไปข้างนอก",
    icon: Cpu,
    color: "#00ff88",
  },
  {
    num: "03",
    title: "ถาม พิมพ์ สั่ง — ได้คำตอบทันที",
    desc: "ถาม AI เป็นภาษาไทยได้เลย เช่น \"สรุปยอดขายเดือนนี้\" หรือ \"ร่างอีเมลตอบลูกค้า\" — ได้คำตอบใน 2-3 วินาที",
    icon: MessageSquareText,
    color: "#8b5cf6",
  },
];

const useCases = [
  {
    icon: Search,
    title: "ค้นหาข้อมูลในบริษัท",
    desc: "แทนที่จะเปิดไฟล์ทีละอัน ถาม AI ได้เลยว่า \"สัญญากับบริษัท XYZ อยู่ไหน\"",
    example: "\"หาเอกสารสัญญาที่เซ็นเดือนมกราคม\"",
  },
  {
    icon: MessageSquareText,
    title: "ร่างเอกสาร & ตอบข้อความ",
    desc: "ให้ AI ช่วยเขียนอีเมล ร่างรายงาน หรือตอบข้อความลูกค้าเป็นภาษาไทย",
    example: "\"ร่างอีเมลตอบลูกค้าที่ถามเรื่องราคา\"",
  },
  {
    icon: BarChart3,
    title: "สรุป & วิเคราะห์ข้อมูล",
    desc: "ส่งไฟล์ Excel หรือ PDF ยาวๆ ให้ AI สรุปให้เข้าใจง่ายๆ ใน 1 นาที",
    example: "\"สรุปรายงานประจำปี 50 หน้านี้ให้หน่อย\"",
  },
  {
    icon: Image,
    title: "สร้างรูปภาพ & คอนเทนต์",
    desc: "สำหรับ Creator — สร้างภาพ Thumbnail, แก้ไขรูป, เขียนสคริปต์ โดยไม่ต้องจ่าย Subscription",
    example: "\"สร้าง Thumbnail สำหรับวิดีโอรีวิวมือถือ\"",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#f0f4f8] mb-4">
            ระบบ AI ส่วนตัวทำงานยังไง?
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
            ง่ายมาก — เหมือนมีพนักงานที่รู้ข้อมูลทุกอย่างในบริษัท
            <br />
            แต่ทำงานเร็วกว่า และพร้อมตอบ 24 ชั่วโมง
          </p>
        </div>

        {/* 3-step diagram */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative rounded-2xl bg-[#111827] border border-[#1e293b] p-6"
            >
              {/* Step number */}
              <span
                className="text-5xl font-black absolute top-4 right-5 opacity-10"
                style={{ color: step.color }}
              >
                {step.num}
              </span>

              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: step.color + "15" }}
              >
                <step.icon size={20} style={{ color: step.color }} />
              </div>
              <h3 className="text-lg font-bold text-[#f0f4f8] mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Arrow flow (desktop) */}
        <div className="hidden md:flex justify-center items-center gap-2 mb-20 text-[#64748b]">
          <span className="text-xs">ใส่ข้อมูล</span>
          <ArrowRight size={14} />
          <span className="text-xs">AI เรียนรู้</span>
          <ArrowRight size={14} />
          <span className="text-xs">ใช้งานได้ทันที</span>
        </div>

        {/* Use cases */}
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#f0f4f8] mb-3">
            ใช้ทำอะไรได้บ้าง?
          </h3>
          <p className="text-[#94a3b8] text-sm">
            ตัวอย่างที่ธุรกิจจริงใช้กันทุกวัน
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-xl bg-[#111827] border border-[#1e293b] p-5 hover:border-[#00e5ff]/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#00e5ff]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <uc.icon size={18} className="text-[#00e5ff]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#f0f4f8] mb-1">{uc.title}</h4>
                  <p className="text-sm text-[#94a3b8] mb-3 leading-relaxed">
                    {uc.desc}
                  </p>
                  {/* Example prompt */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0c1220] border border-[#1e293b]">
                    <MessageSquareText size={12} className="text-[#00ff88]" />
                    <span className="text-xs text-[#00ff88] font-mono">
                      {uc.example}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Simple cost comparison */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl border border-[#1e293b] bg-[#111827] overflow-hidden"
        >
          <div className="p-6 md:p-8 text-center border-b border-[#1e293b]">
            <h3 className="text-xl font-bold text-[#f0f4f8] mb-2">
              ทำไม AI ส่วนตัวถึงคุ้มกว่า?
            </h3>
            <p className="text-sm text-[#94a3b8]">
              เปรียบเทียบค่าใช้จ่ายจริงกับบริการคลาวด์
            </p>
          </div>
          <div className="grid md:grid-cols-2">
            {/* Cloud */}
            <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-[#1e293b]">
              <div className="text-sm font-bold text-[#f87171] mb-4">
                ❌ ใช้บริการคลาวด์ (ChatGPT, API)
              </div>
              <ul className="space-y-3 text-sm text-[#94a3b8]">
                <li>• ค่า API ประมาณ ฿5,000-50,000/เดือน ขึ้นอยู่กับจำนวนผู้ใช้</li>
                <li>• ข้อมูลของคุณถูกส่งไปประมวลผลบนเซิร์ฟเวอร์ต่างประเทศ</li>
                <li>• ถ้าเน็ตล่ม ใช้งานไม่ได้</li>
                <li>• ยิ่งใช้มาก ยิ่งจ่ายมาก ไม่มีเพดาน</li>
              </ul>
              <div className="mt-4 text-xs text-[#f87171] font-mono">
                ค่าใช้จ่าย 2 ปี: ฿120,000 - 1,200,000
              </div>
            </div>
            {/* Local */}
            <div className="p-6 md:p-8">
              <div className="text-sm font-bold text-[#00ff88] mb-4">
                ✓ AI ส่วนตัว (LocalAI Thailand)
              </div>
              <ul className="space-y-3 text-sm text-[#94a3b8]">
                <li>• จ่ายครั้งเดียว ฿59,900 ขึ้นไป ใช้ได้ตลอด</li>
                <li>• ข้อมูลอยู่ในออฟฟิศของคุณ 100%</li>
                <li>• ไม่ต้องพึ่งอินเทอร์เน็ต ทำงานได้ตลอด</li>
                <li>• ใช้กี่คนก็ได้ ไม่มีค่าใช้จ่ายเพิ่ม</li>
              </ul>
              <div className="mt-4 text-xs text-[#00ff88] font-mono">
                ค่าใช้จ่าย 2 ปี: ฿59,900 - 219,900 (จ่ายครั้งเดียว)
              </div>
            </div>
          </div>
        </motion.div>
        {/* Why not just pay ฿700/month for ChatGPT? */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-[#f0f4f8] mb-3">
              แล้วทำไมไม่จ่าย ฿700/เดือน ใช้ ChatGPT ก็พอ?
            </h3>
            <p className="text-sm text-[#94a3b8] max-w-lg mx-auto">
              คำถามที่ทุกคนถาม — นี่คือคำตอบตรงๆ
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                emoji: "🚫",
                title: "ChatGPT ปฏิเสธตอบเรื่องสำคัญ",
                desc: "ถามเรื่องกฎหมาย การแพทย์ สัญญา ข้อมูลละเอียดอ่อน → \"ขอโทษ ผมไม่สามารถให้คำปรึกษาได้\" แต่ธุรกิจคุณต้องการคำตอบเหล่านั้น",
                local: "AI ส่วนตัวตอบได้ทุกอย่าง ไม่มี censorship",
                color: "#f87171",
              },
              {
                emoji: "📤",
                title: "ข้อมูลถูกส่งไปต่างประเทศ",
                desc: "ทุกครั้งที่ถาม ChatGPT ข้อมูลบริษัท สัญญา ข้อมูลลูกค้า ถูกส่งไป server สหรัฐฯ Samsung เคยโดน source code หลุดจาก ChatGPT",
                local: "ข้อมูลไม่ออกจากเครื่อง เลย แม้แต่ byte เดียว",
                color: "#f87171",
              },
              {
                emoji: "⏳",
                title: "โควต้าหมด กลางวันทำงาน",
                desc: "\"You've reached your limit\" ตอนกำลัง flow ดีๆ ต้องรอ 3 ชม. หรือจ่ายเพิ่ม ยิ่งทีมใหญ่ ยิ่งหมดเร็ว",
                local: "ไม่มี limit ไม่มี cap ถามได้ทั้งวันทั้งคืน",
                color: "#f59e0b",
              },
              {
                emoji: "💸",
                title: "ทีม 10 คน = ฿7,000/เดือน ตลอดไป",
                desc: "ChatGPT Plus ฿700/คน × 10 = ฿7,000/เดือน = ฿168,000 ใน 2 ปี แล้วก็ต้องจ่ายต่อไปเรื่อยๆ ไม่มีวันจบ",
                local: "฿109,900 ครั้งเดียว ทั้งทีมใช้ได้ ไม่จ่ายอีก",
                color: "#f59e0b",
              },
              {
                emoji: "🔄",
                title: "Model เปลี่ยน ไม่บอก",
                desc: "OpenAI update model ตลอด — prompt ที่เคยใช้ได้ดี วันดีคืนดีตอบแย่ลง คุณ control อะไรไม่ได้เลย",
                local: "Model ของคุณไม่เปลี่ยน จนกว่าคุณจะเปลี่ยนเอง",
                color: "#8b5cf6",
              },
              {
                emoji: "📡",
                title: "เน็ตล่ม = ทำงานไม่ได้",
                desc: "Server OpenAI ล่มเฉลี่ย 2-3 ครั้ง/เดือน เน็ตบริษัทมีปัญหา ไปถ่ายนอกสถานที่ ทุกอย่างหยุด",
                local: "ทำงานได้ 100% แม้ไม่มี internet",
                color: "#8b5cf6",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl bg-[#111827] border border-[#1e293b] p-5"
              >
                <span className="text-2xl block mb-3">{item.emoji}</span>
                <h4 className="text-sm font-bold text-[#f0f4f8] mb-2">{item.title}</h4>
                <p className="text-xs text-[#94a3b8] leading-relaxed mb-3">{item.desc}</p>
                <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-[#00ff88]/5 border border-[#00ff88]/15">
                  <span className="text-[#00ff88] text-xs shrink-0">✓</span>
                  <span className="text-xs text-[#00ff88]">{item.local}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#64748b] mb-4">
              ChatGPT ดีสำหรับใช้ส่วนตัว — แต่สำหรับธุรกิจที่มีข้อมูลสำคัญ AI ส่วนตัวคือคำตอบ
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#00e5ff] to-[#00ff88] text-[#060a14] font-bold text-sm hover:opacity-90 transition-opacity"
            >
              ปรึกษาฟรี ว่าเหมาะกับธุรกิจคุณไหม
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
