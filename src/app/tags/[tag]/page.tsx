import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { getAllTags, getContentByTag } from "@/lib/content";

type Props = {
  params: Promise<{ tag: string }>;
};

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag: encodeURIComponent(tag) }));
}

export default async function TagPage({ params }: Props) {
  const { tag: raw } = await params;
  const tag = decodeURIComponent(raw);
  const items = getContentByTag(tag);

  if (items.length === 0) notFound();

  return (
    <main className="page-bg relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="page-grid pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[450px] w-[450px] -translate-y-1/3 translate-x-1/4 rounded-full bg-purple-500/[0.07] blur-3xl" />

      <Navbar />

      <div className="relative z-10 mx-auto max-w-3xl px-8 pb-24 pt-32">
        <Link
          href="/tags"
          className="mb-10 flex items-center gap-2 text-sm text-zinc-600 transition hover:text-white"
        >
          ← 所有标签
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            <span className="text-purple-400">#</span> {tag}
          </h1>
          <p className="mt-3 text-sm text-zinc-500">共 {items.length} 篇</p>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <Link
              key={`${item.section}-${item.slug}`}
              href={item.href}
              className="card-item group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.03]"
            >
              <span className="flex-shrink-0 rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-zinc-500">
                {item.sectionLabel}
              </span>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-[15px] font-medium text-zinc-200 group-hover:text-white">
                  {item.title}
                </p>
                <p className="mt-0.5 line-clamp-1 text-xs text-zinc-600">
                  {item.description}
                </p>
              </div>
              <span className="hidden flex-shrink-0 text-xs text-zinc-600 sm:block">
                {item.date}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
