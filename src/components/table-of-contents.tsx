"use client";

import { useEffect, useState } from "react";

type Heading = { id: string; text: string; level: number };

/* 文章目录：挂载后读取 article 内带 id 的 h2/h3，生成可跳转大纲 + 滚动高亮。
   仅 xl 及以上、且标题数 ≥ 2 时显示，固定在左侧留白区。 */
export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("article h2, article h3")
    ).filter((el) => el.id);

    setHeadings(
      nodes.map((el) => ({
        id: el.id,
        text: el.textContent ?? "",
        level: Number(el.tagName[1]),
      }))
    );

    if (nodes.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveId((e.target as HTMLElement).id);
        }
      },
      { rootMargin: "0px 0px -75% 0px", threshold: 1 }
    );
    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  if (headings.length < 2) return null;

  return (
    <nav className="fixed left-6 top-32 hidden w-52 2xl:w-60 xl:block">
      <p className="mb-3 text-[11px] tracking-[0.2em] text-zinc-600">目录</p>
      <ul className="border-l border-white/[0.08] text-[13px] leading-tight">
        {headings.map((h) => {
          const active = activeId === h.id;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`-ml-px block border-l-2 py-1.5 transition-colors ${
                  active
                    ? "border-purple-400 text-purple-400"
                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
                style={{ paddingLeft: 12 + (h.level - 2) * 12 }}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
