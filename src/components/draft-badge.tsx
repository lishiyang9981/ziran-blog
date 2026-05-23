/* 草稿标记（仅本地可见的内容）。线上不会出现草稿，所以这些标记只在本地浏览时显示。 */

export function DraftBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block rounded-full border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium text-amber-300 ${className}`}
    >
      草稿
    </span>
  );
}

export function DraftNotice() {
  return (
    <div className="mb-8 rounded-xl border border-amber-400/30 bg-amber-400/[0.08] px-4 py-2.5 text-sm text-amber-300">
      草稿 · 此内容仅本地可见，线上尚未公开
    </div>
  );
}
