"use client";

import { motion } from "framer-motion";

export function TimelineSection() {
  return (
    <section className="relative z-10 mx-auto max-w-[1400px] px-8 pb-8">

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="card-item relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.02] px-8 py-20 text-center backdrop-blur"
      >
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/[0.07] blur-3xl" />
        <div className="relative z-10">
          <p className="text-xl text-zinc-600">「</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-[28px] font-medium leading-[1.75] text-zinc-200">
            一切有为法，如梦幻泡影，
            <br />
            如露亦如电，应作如是观。
          </h2>
          <p className="mt-6 text-sm text-zinc-600">— 《金刚经》</p>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="pb-10 pt-12"
      >
        <div className="theme-border flex flex-col items-center justify-between gap-6 border-t border-white/[0.07] pt-8 sm:flex-row">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-zinc-300">
              CWR&amp;L
            </p>
            <p className="mt-1 text-xs text-zinc-600">
              持续探索技术与认知的边界
            </p>
          </div>
          <p className="text-xs text-zinc-600">
            © 2026 CWR&amp;L. All rights reserved.
          </p>
        </div>
      </motion.footer>

    </section>
  );
}
