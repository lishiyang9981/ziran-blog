"use client";

import { Plus } from "lucide-react";

/* 全局「写文章」浮标：任意页面直达 Keystatic 后台新建/编辑内容。
   仅本地开发显示（生产 /keystatic 已 404）。固定左下角。 */
export function NewPostButton() {
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <a
      href="/keystatic"
      className="fixed bottom-6 left-5 z-50 flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/25 px-4 py-2.5 text-xs font-medium text-emerald-50 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-xl transition hover:bg-emerald-500/40"
    >
      <Plus className="h-3.5 w-3.5" />
      写文章
    </a>
  );
}
