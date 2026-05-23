"use client";

import { Pencil } from "lucide-react";

/* 文章详情页左下角的「编辑」浮标：跳到 Keystatic 对应条目的编辑页。
   仅本地开发显示（生产环境 /keystatic 已 404，按钮也不渲染）。 */
export function EditInKeystatic({ section, slug }: { section: string; slug: string }) {
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <a
      href={`/keystatic/collection/${section}/item/${encodeURIComponent(slug)}`}
      className="fixed bottom-6 left-5 z-50 flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/25 px-4 py-2.5 text-xs font-medium text-purple-50 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-xl transition hover:bg-purple-500/40"
    >
      <Pencil className="h-3.5 w-3.5" />
      在 Keystatic 编辑
    </a>
  );
}
