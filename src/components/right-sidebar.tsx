"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Hash } from "lucide-react";

const STATUS_ITEMS = [
  { label: "探索中", active: true },
  { label: "构建中", active: false },
  { label: "思考中", active: false },
];

export function RightSidebar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex">

      {/* NOW 状态 */}
      <p className="text-[9px] tracking-[0.35em] text-zinc-600">NOW</p>
      <div className="flex flex-col gap-3.5">
        {STATUS_ITEMS.map((s) => (
          <div key={s.label} className="flex items-center gap-2.5">
            <div
              className={`h-1.5 w-1.5 rounded-full transition-all ${
                s.active ? "bg-purple-400" : "bg-zinc-700"
              }`}
              style={
                s.active
                  ? { boxShadow: `0 0 6px rgba(var(--accent-rgb),0.9)` }
                  : undefined
              }
            />
            <span className={`text-[11px] ${s.active ? "text-zinc-300" : "text-zinc-600"}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* 标签入口：强调色胶囊（一行），与上方 NOW 灰色状态点做功能区分 */}
      <Link
        href="/tags"
        title="按标签浏览"
        className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium transition duration-200 hover:brightness-125"
        style={{
          borderColor: "rgba(var(--accent-rgb),0.4)",
          backgroundColor: "rgba(var(--accent-rgb),0.12)",
          color: "var(--accent)",
          boxShadow: "0 0 12px rgba(var(--accent-rgb),0.15)",
        }}
      >
        <Hash className="h-3 w-3" />
        标签
      </Link>

      {/* 分隔线 */}
      <div className="h-px w-4 bg-zinc-800" />

      {/* SCROLL 提示（未滚动时显示）↕ 回顶按钮（滚动后显示）*/}
      <AnimatePresence mode="wait">
        {!scrolled ? (
          <motion.div
            key="scroll"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center gap-2"
          >
            <p className="text-[9px] tracking-[0.35em] text-zinc-600">SCROLL</p>
            <div className="flex h-7 w-[18px] items-start justify-center rounded-full border border-zinc-700 pt-1">
              <div className="h-1 w-px animate-bounce rounded-full bg-zinc-500" />
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="totop"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            onClick={scrollTop}
            aria-label="回到顶部"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-500 backdrop-blur-sm transition-all hover:border-white/20 hover:text-white"
            style={{ boxShadow: `0 0 12px rgba(var(--accent-rgb),0.12)` }}
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
