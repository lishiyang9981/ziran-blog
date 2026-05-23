import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { getAllTags } from "@/lib/content";

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <main className="page-bg relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="page-grid pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/4 translate-x-1/3 rounded-full bg-purple-500/[0.07] blur-3xl" />

      <Navbar />

      <div className="relative z-10 mx-auto max-w-4xl px-8 pb-24 pt-32">
        <div className="mb-16">
          <p className="mb-3 text-xs tracking-[0.35em] text-zinc-600">TAGS</p>
          <h1 className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-6xl font-semibold tracking-tight text-transparent">
            标签
          </h1>
          <p className="mt-4 text-zinc-500">按主题浏览散落在各板块的内容。</p>
        </div>

        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {tags.map(({ tag, count }) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="tag-chip group flex items-center gap-2 rounded-full border border-white/[0.08] px-4 py-1.5 text-sm text-zinc-400 transition hover:border-white/25 hover:text-white"
              >
                {tag}
                <span className="text-xs text-zinc-600 group-hover:text-zinc-400">
                  {count}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-zinc-600">还没有标签。</p>
        )}
      </div>
    </main>
  );
}
