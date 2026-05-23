"use client";

import { usePathname } from "next/navigation";
import { Home, Eye } from "lucide-react";

/* Keystatic 后台底部浮条：回到首页 / 查看当前正在编辑的文章。
   仅本地开发显示。 */

const SECTION_BASE: Record<string, string> = {
  blog: "/blog",
  notes: "/notes",
  reading: "/reading",
  life: "/life",
};

export function KeystaticBar() {
  const pathname = usePathname();
  if (process.env.NODE_ENV !== "development") return null;

  // 匹配条目编辑页 /keystatic/collection/<section>/item/<slug>
  const m = pathname?.match(/^\/keystatic\/collection\/([^/]+)\/item\/(.+)$/);
  const articleHref =
    m && SECTION_BASE[m[1]]
      ? `${SECTION_BASE[m[1]]}/${decodeURIComponent(m[2])}`
      : null;

  return (
    <div className="fixed bottom-5 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-1 rounded-full border border-zinc-700 bg-zinc-900/95 px-2 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur">
      <a
        href="/"
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-zinc-300 transition hover:bg-white/10 hover:text-white"
      >
        <Home className="h-3.5 w-3.5" />
        回到衡门
      </a>
      {articleHref && (
        <>
          <span className="h-4 w-px bg-zinc-700" />
          <a
            href={articleHref}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-zinc-300 transition hover:bg-white/10 hover:text-white"
          >
            <Eye className="h-3.5 w-3.5" />
            查看文章
          </a>
        </>
      )}
    </div>
  );
}
