import Link from "next/link";

/* 可点击的标签胶囊：跳转到 /tags/<tag> 聚合页 */
export function TagLink({ tag, className = "" }: { tag: string; className?: string }) {
  return (
    <Link
      href={`/tags/${encodeURIComponent(tag)}`}
      className={`tag-chip inline-block rounded-full border border-white/[0.08] text-zinc-500 transition hover:border-white/25 hover:text-zinc-200 ${className}`}
    >
      {tag}
    </Link>
  );
}
