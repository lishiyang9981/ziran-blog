import Link from "next/link";
import type { ContentItem } from "@/lib/content";

/* 详情页底部「更早 / 更新」相邻文章导航
   - older：发布时间更早的一篇（左）
   - newer：发布时间更新的一篇（右）*/
export function PostNav({
  older,
  newer,
}: {
  older?: ContentItem;
  newer?: ContentItem;
}) {
  if (!older && !newer) return null;

  return (
    <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {older ? (
        <Link
          href={older.href}
          className="card-item group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/15"
        >
          <p className="text-xs text-zinc-600">← 更早一篇</p>
          <p className="mt-1.5 line-clamp-1 text-sm font-medium text-zinc-300 group-hover:text-white">
            {older.title}
          </p>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {newer ? (
        <Link
          href={newer.href}
          className="card-item group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 text-right transition-all duration-300 hover:border-white/15"
        >
          <p className="text-xs text-zinc-600">更新一篇 →</p>
          <p className="mt-1.5 line-clamp-1 text-sm font-medium text-zinc-300 group-hover:text-white">
            {newer.title}
          </p>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}
    </div>
  );
}
