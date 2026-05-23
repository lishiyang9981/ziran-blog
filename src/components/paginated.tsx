"use client";

import { Children, useRef, useState, type ReactNode } from "react";

/* 把传入的卡片按每页 perPage 个分页显示。
   - 卡片样式不变（由各列表页传入）
   - 超过一页才显示底部翻页条
   - 翻页时平滑滚回列表顶部
   - 当前页高亮用主题强调色（暗紫 / 亮绿，自适应） */

function pageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out: (number | "…")[] = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);
  if (left > 2) out.push("…");
  for (let p = left; p <= right; p++) out.push(p);
  if (right < total - 1) out.push("…");
  out.push(total);
  return out;
}

const btnBase =
  "flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm transition";
const btnIdle =
  "border-white/10 text-zinc-500 hover:border-white/25 hover:text-white";

export function Paginated({
  children,
  perPage = 8,
  className = "",
}: {
  children: ReactNode;
  perPage?: number;
  className?: string;
}) {
  const items = Children.toArray(children);
  const [page, setPage] = useState(1);
  const ref = useRef<HTMLDivElement>(null);

  const total = Math.ceil(items.length / perPage);
  const start = (page - 1) * perPage;
  const visible = items.slice(start, start + perPage);

  const go = (p: number) => {
    setPage(Math.min(total, Math.max(1, p)));
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={ref} className="scroll-mt-28">
      <div className={className}>{visible}</div>

      {total > 1 && (
        <div className="mt-10 flex items-center justify-center gap-1.5">
          <button
            onClick={() => go(page - 1)}
            disabled={page === 1}
            aria-label="上一页"
            className={`${btnBase} ${btnIdle} disabled:cursor-not-allowed disabled:opacity-30`}
          >
            ←
          </button>

          {pageList(page, total).map((p, i) =>
            p === "…" ? (
              <span key={`e${i}`} className="px-1 text-sm text-zinc-600">
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => go(p)}
                aria-current={p === page ? "page" : undefined}
                className={`${btnBase} ${p === page ? "" : btnIdle}`}
                style={
                  p === page
                    ? {
                        borderColor: "rgba(var(--accent-rgb),0.5)",
                        color: "var(--accent)",
                        backgroundColor: "rgba(var(--accent-rgb),0.12)",
                      }
                    : undefined
                }
              >
                {p}
              </button>
            )
          )}

          <button
            onClick={() => go(page + 1)}
            disabled={page === total}
            aria-label="下一页"
            className={`${btnBase} ${btnIdle} disabled:cursor-not-allowed disabled:opacity-30`}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
