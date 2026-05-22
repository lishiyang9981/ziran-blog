"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { Post } from "@/lib/posts";

const COVER_GRADIENTS = [
  "from-purple-500/25 to-blue-600/10",
  "from-blue-500/25 to-cyan-500/10",
  "from-emerald-500/20 to-teal-600/10",
  "from-pink-500/20 to-purple-600/10",
  "from-amber-500/20 to-orange-600/10",
];

const LAB_ITEMS = [
  { title: "RAG 实践笔记",  desc: "构建知识库与问答系统" },
  { title: "LLM 应用探索", desc: "探索大语言模型的应用边界" },
  { title: "AI 工具评测",   desc: "测评与分享优秀的 AI 工具" },
];

const FADE = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export function ContentSection({ posts }: { posts: Post[] }) {
  return (
    <section className="relative z-10 mx-auto mt-2 grid max-w-[1400px] grid-cols-1 gap-5 px-8 pb-6 lg:grid-cols-[1.65fr_1fr]">

      {/* ── Recent Articles ─────────────────── */}
      <motion.div
        {...FADE(0)}
        className="rounded-[28px] border border-white/[0.07] bg-white/[0.02] p-8 backdrop-blur"
      >
        <div className="mb-7 flex items-center justify-between">
          <h2 className="text-[22px] font-semibold text-white">近期文章</h2>
          <Link href="/blog" className="text-sm text-zinc-500 transition hover:text-white">
            查看全部 →
          </Link>
        </div>

        <div className="space-y-2">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex items-center gap-5 rounded-2xl border border-transparent p-3 transition-all duration-300 hover:border-white/[0.06] hover:bg-white/[0.02]"
              >
                <div
                  className={`relative h-[80px] w-[128px] flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br ${COVER_GRADIENTS[i % COVER_GRADIENTS.length]}`}
                >
                  {post.cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.cover} alt={post.title} className="h-full w-full object-cover" />
                  ) : (
                    /* 无封面时的装饰占位 */
                    <div className="flex h-full w-full flex-col items-start justify-end p-2.5">
                      <div className="mb-1.5 space-y-1 w-full">
                        <div className="h-[2px] w-10 rounded-full bg-white/20" />
                        <div className="h-[2px] w-7 rounded-full bg-white/12" />
                      </div>
                      <p className="line-clamp-2 text-[9px] font-medium leading-tight text-white/40">
                        {post.title}
                      </p>
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-[16px] font-medium text-white group-hover:text-zinc-100">
                    {post.title}
                  </h3>
                  <p className="mt-1 line-clamp-1 text-sm text-zinc-600">{post.description}</p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {post.tags?.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-full border border-white/[0.08] px-2.5 py-0.5 text-[11px] text-zinc-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0 text-xs text-zinc-600">{post.date}</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── AI Lab ──────────────────────────── */}
      <motion.div
        {...FADE(0.1)}
        className="overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.02] p-8 backdrop-blur"
      >
        <div className="mb-7 flex items-center justify-between">
          <h2 className="text-[22px] font-semibold text-white">AI Lab</h2>
          <Link href="/lab" className="text-sm text-zinc-500 transition hover:text-white">
            进入实验室 →
          </Link>
        </div>

        <div className="relative mb-7 flex h-[200px] items-center justify-center overflow-hidden rounded-[20px] border border-white/[0.07] bg-black/20">
          <div className="absolute h-36 w-36 rounded-full bg-purple-500/20 blur-3xl" />
          <div
            className="relative h-28 w-28 rounded-full"
            style={{
              background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.92), rgba(168,85,247,0.42), rgba(0,0,0,0.97))",
              boxShadow: "0 0 50px rgba(168,85,247,0.3)",
            }}
          />
          <p className="absolute bottom-4 text-[11px] tracking-[0.25em] text-zinc-600">
            探索 AI 技术的边界
          </p>
        </div>

        <div className="space-y-2.5">
          {LAB_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                href="/lab"
                className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5 transition-all duration-300 hover:bg-white/[0.04]"
              >
                <div>
                  <p className="text-sm font-medium text-zinc-200">{item.title}</p>
                  <p className="mt-0.5 text-xs text-zinc-600">{item.desc}</p>
                </div>
                <span className="text-xs text-zinc-600">→</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link href="/lab" className="mt-4 block text-center text-xs text-zinc-600 transition hover:text-zinc-400">
          更多实验记录 →
        </Link>
      </motion.div>

    </section>
  );
}
