/* 置顶小徽章 */
export function PinBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block rounded-full border border-purple-400/30 bg-purple-400/10 px-2 py-0.5 text-[10px] text-purple-300 ${className}`}
    >
      置顶
    </span>
  );
}
