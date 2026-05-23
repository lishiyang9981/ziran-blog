"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";

export default function AboutPage() {
  return (
    <main className="page-bg relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="page-grid pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/4 translate-x-1/3 rounded-full bg-purple-500/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] translate-y-1/3 -translate-x-1/4 rounded-full bg-pink-500/[0.04] blur-3xl" />
      <Navbar />

      <div className="relative z-10 mx-auto max-w-[1000px] px-8 pb-24 pt-32">
        <div className="flex flex-col items-center gap-14 lg:flex-row lg:items-center lg:gap-20">

          {/* 左侧：文字 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-1"
          >
            <p className="mb-3 text-xs tracking-[0.35em] text-zinc-600">关于</p>
            <h1 className="mb-4 bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-6xl font-semibold tracking-tight text-transparent">
              栖迟
            </h1>
            <p className="mb-2 text-zinc-500">灵魂居所，生命状态与自我存照。</p>
            <p className="mb-6 text-sm tracking-[0.2em]" style={{ color: "var(--accent)" }}>
              归宿与本色
            </p>
            <p className="mb-9 max-w-md text-[15px] leading-8 text-zinc-400">
              这里是「栖迟」，也是我在网络世界里为自己留的一处歇脚亭。走过见山、观澜、从心、止水，在此停驻。我是 CWR&amp;L，幸会，同路人～
            </p>
<div className="space-y-5 text-[15px] leading-8">

  <div className="flex items-center text-zinc-400">
    <span className="w-12 text-zinc-400 tracking-[0.15em]">
      CWR
    </span>
    <span>热忱者 · 共鸣者 · ENFJ · 金牛</span>
  </div>

  <div className="flex items-center text-zinc-400">
    <span className="w-12 pl-[18px] text-zinc-400 tracking-[0.15em]">
      L
    </span>
    <span>探索者 · 思考者 · INFP · 狮子</span>
  </div>

  <p className="text-zinc-400">
    希望余生的我们，能修炼五样东西：
    扬在脸上的自信，长在心底的善良，
    融进血里的骨气，清风拂面的温柔，
    刻进命里的坚强。
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
