"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <div className="mx-auto max-w-[1000px] px-8 pb-24 pt-32">
        <div className="flex flex-col items-center gap-14 lg:flex-row lg:items-center lg:gap-20">

          {/* 左侧：文字 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-1"
          >
            <p className="mb-3 text-xs tracking-[0.35em] text-zinc-600">ABOUT</p>
            <h1 className="mb-8 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-6xl font-semibold tracking-tight text-transparent">
              关于我们
            </h1>
            <div className="space-y-5 text-[15px] leading-8 text-zinc-400">
              <p>热忱者 · 共鸣者 · ENFJ · 金 牛</p>
              <p>探索者 · 思考者 · INFP · 狮 子</p>
              <p>
                希望余生的我们，能修炼五样东西：扬在脸上的自信，长在心底的善良，
                融进血里的骨气，清风拂面的温柔，刻进命里的坚强。
              </p>
            </div>
          </motion.div>

          {/* 右侧：图片 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-[260px] flex-shrink-0 sm:w-[300px]"
          >
            <div
              className="relative overflow-hidden rounded-[24px] border border-white/[0.08]"
              style={{
                boxShadow: "0 0 50px rgba(168,85,247,0.15), 0 0 100px rgba(168,85,247,0.07)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/avatar.jpg"
                alt=""
                className="h-auto w-full object-cover"
              />
              {/* 底部融合遮罩 */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#050505]/50 to-transparent" />
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
