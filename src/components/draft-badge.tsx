/* 草稿标记（仅本地可见的内容）。线上不会出现草稿，所以这些标记只在本地浏览时显示。
   颜色走 .draft-amber 语义类，暗色/亮色各自配色（见 globals.css）。 */

export function DraftBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`draft-amber inline-block rounded-full border px-2 py-0.5 text-[10px] font-medium ${className}`}
    >
      草稿
    </span>
  );
}

export function DraftNotice() {
  return (
    <div className="draft-amber mb-8 rounded-xl border px-4 py-2.5 text-sm">
      草稿 · 此内容仅本地可见，线上尚未公开
    </div>
  );
}
