import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { PinBadge } from "@/components/pin-badge";
import { DraftBadge } from "@/components/draft-badge";
import { Paginated } from "@/components/paginated";
import { getAllReading } from "@/lib/reading";

export default function ReadingPage() {
  const items = getAllReading();

  return (
    <main className="page-bg relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* Background grid */}
      <div className="page-grid pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Decorative glows — 暖色调，呼应"阅读" */}
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/4 translate-x-1/3 rounded-full bg-amber-500/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/3 left-0 h-[350px] w-[350px] -translate-x-1/3 rounded-full bg-orange-500/[0.05] blur-3xl" />

      <Navbar />

      <div className="relative z-10 mx-auto max-w-4xl px-8 pb-24 pt-32">

        <div className="mb-16">
          <p className="mb-3 text-xs tracking-[0.35em] text-zinc-600">书影</p>
          <h1 className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-6xl font-semibold tracking-tight text-transparent">
            观澜
          </h1>
          <p className="mt-4 text-zinc-500">坐在岸边，借镜他人光影的红尘观察。</p>
          <p className="mt-3 text-sm tracking-[0.2em]" style={{ color: "var(--accent)" }}>
            视野与悲悯
          </p>
        </div>

        <Paginated perPage={8} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/reading/${item.slug}`}
              className="card-item group rounded-[22px] border border-white/[0.07] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/12 hover:bg-white/[0.04]"
            >
              {item.cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.cover}
                  alt={item.title}
                  className="mb-4 h-44 w-full rounded-xl border border-white/10 object-cover"
                />
              )}
              {(item.draft || item.pinned) && (
                <div className="mb-2 flex gap-1.5">
                  {item.draft && <DraftBadge />}
                  {item.pinned && <PinBadge />}
                </div>
              )}
              <p className="mb-3 text-xs text-zinc-600">{item.date}</p>
              <h2 className="text-lg font-semibold text-white transition-colors group-hover:text-zinc-100">
                {item.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-500">
                {item.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="tag-chip rounded-full border border-white/[0.08] px-2.5 py-0.5 text-[11px] text-zinc-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </Paginated>

        {items.length === 0 && (
          <div className="card-item rounded-[24px] border border-white/[0.07] bg-white/[0.02] p-16 text-center backdrop-blur-sm">
            <p className="text-zinc-600">观澜还空着，去 /keystatic 写第一篇吧。</p>
          </div>
        )}
      </div>
    </main>
  );
}
