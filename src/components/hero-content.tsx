"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const FADE_UP = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
});

export function HeroContent() {
  return (
    <div className="flex w-[45%] flex-col justify-center">

      {/* Badge */}
      <motion.div
        {...FADE_UP(0)}
        className="mb-8 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-zinc-400 backdrop-blur"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
        ITBP · 探索者 · 建设者
      </motion.div>

      {/* Headline */}
      <motion.h1
        {...FADE_UP(0.15)}
        className="text-5xl font-semibold leading-[1.08] tracking-[-0.04em] lg:text-6xl 2xl:text-7xl"
      >
        <span className="block bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent">
          持续探索
        </span>
        <span className="block">
          <span className="bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent">
            技术与认知的
          </span>
          <span className="bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">
            边界
          </span>
        </span>
      </motion.h1>

      {/* Sub */}
      <motion.p
        {...FADE_UP(0.3)}
        className="mt-6 max-w-md text-[15px] leading-8 text-zinc-500"
      >
        用代码构建系统，用思考理解世界，
        <br />
        在技术与哲学之间寻找更深层的确定性。
      </motion.p>

      {/* CTA */}
      <motion.div {...FADE_UP(0.45)}>
        <Link
          href="/blog"
          className="mt-10 flex w-fit items-center gap-3 rounded-full border border-white/20 px-6 py-3 text-sm text-white transition-all duration-300 hover:border-white/30 hover:bg-white/[0.05]"
        >
          探索我的数字花园
          <span className="text-zinc-500">→</span>
        </Link>
      </motion.div>

    </div>
  );
}
