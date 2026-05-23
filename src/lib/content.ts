import fs from "fs";
import path from "path";

import matter from "gray-matter";

/* ────────────────────────────────────────────────
   统一内容层：所有板块（文章/随笔/读书/生活）共用
   - 支持 draft（草稿，仅本地可见）、pinned（置顶）
   - 提供跨板块聚合（标签页、搜索）与相邻文章查询
──────────────────────────────────────────────── */

export type Section = "blog" | "notes" | "reading" | "life";

export const SECTIONS: {
  key: Section;
  dir: string;
  base: string;
  label: string;
  coverBase?: string;
}[] = [
  { key: "blog",    dir: "content/blog",    base: "/blog",    label: "见山", coverBase: "/images/blog/covers" },
  { key: "notes",   dir: "content/notes",   base: "/notes",   label: "从心" },
  { key: "reading", dir: "content/reading", base: "/reading", label: "观澜", coverBase: "/images/reading/covers" },
  { key: "life",    dir: "content/life",    base: "/life",    label: "止水", coverBase: "/images/life/covers" },
];

export type Entry = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  cover?: string;
  draft: boolean;
  pinned: boolean;
};

export type EntryWithContent = Entry & { content: string };

export type ContentItem = Entry & {
  section: Section;
  sectionLabel: string;
  href: string;
};

const isDev = process.env.NODE_ENV === "development";

/* 归一化日期为 YYYY-MM-DD（Keystatic 可能写出无引号日期 → Date 对象）*/
function toDateStr(v: unknown): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return typeof v === "string" ? v : v == null ? "" : String(v);
}

/* 归一化图片路径：绝对路径/外链原样返回；裸文件名拼上板块 publicPath */
export function resolveAsset(value: unknown, publicBase?: string): string | undefined {
  if (typeof value !== "string" || value.length === 0) return undefined;
  if (/^https?:\/\//.test(value) || value.startsWith("/")) return value;
  if (!publicBase) return value;
  return `${publicBase.replace(/\/+$/, "")}/${value.replace(/^\/+/, "")}`;
}

/* 置顶优先、再按日期倒序 */
function pinnedDateSort(a: Entry, b: Entry): number {
  if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
  return a.date > b.date ? -1 : 1;
}

function readEntry(relDir: string, fileName: string, coverBase?: string): EntryWithContent {
  const slug = fileName.replace(/\.(mdx|md)$/, "");
  const { data, content } = matter(
    fs.readFileSync(path.join(process.cwd(), relDir, fileName), "utf8")
  );
  return {
    slug,
    content,
    title: data.title ?? "",
    date: toDateStr(data.date),
    description: data.description ?? "",
    tags: data.tags ?? [],
    cover: resolveAsset(data.cover, coverBase),
    draft: data.draft === true,
    pinned: data.pinned === true,
  };
}

type LoadOpts = { coverBase?: string; includeDrafts?: boolean };

export function loadEntries(relDir: string, opts: LoadOpts = {}): Entry[] {
  const dir = path.join(process.cwd(), relDir);
  if (!fs.existsSync(dir)) return [];
  const includeDrafts = opts.includeDrafts ?? isDev;

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => {
      const { content: _omit, ...entry } = readEntry(relDir, f, opts.coverBase);
      void _omit;
      return entry as Entry;
    })
    .filter((e) => includeDrafts || !e.draft)
    .sort(pinnedDateSort);
}

export function loadEntry(
  relDir: string,
  slug: string,
  opts: LoadOpts = {}
): EntryWithContent | null {
  const full = path.join(process.cwd(), relDir, `${slug}.mdx`);
  if (!fs.existsSync(full)) return null;
  const includeDrafts = opts.includeDrafts ?? isDev;
  const entry = readEntry(relDir, `${slug}.mdx`, opts.coverBase);
  if (entry.draft && !includeDrafts) return null; // 草稿在线上视作不存在 → 404
  return entry;
}

/* 跨板块聚合（按日期倒序），供标签页与搜索使用 */
export function getAllContent(): ContentItem[] {
  return SECTIONS.flatMap((s) =>
    loadEntries(s.dir, { coverBase: s.coverBase }).map((e) => ({
      ...e,
      section: s.key,
      sectionLabel: s.label,
      href: `${s.base}/${e.slug}`,
    }))
  ).sort((a, b) => (a.date > b.date ? -1 : 1));
}

/* 同板块内、按日期排序的相邻文章（用于上一篇/下一篇）*/
export function getAdjacent(
  sectionKey: Section,
  slug: string
): { newer?: ContentItem; older?: ContentItem } {
  const s = SECTIONS.find((x) => x.key === sectionKey);
  if (!s) return {};
  const list = loadEntries(s.dir, { coverBase: s.coverBase })
    .slice()
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .map((e) => ({ ...e, section: s.key, sectionLabel: s.label, href: `${s.base}/${e.slug}` }));
  const i = list.findIndex((e) => e.slug === slug);
  if (i === -1) return {};
  return { newer: list[i - 1], older: list[i + 1] };
}

/* 所有标签及其数量（按数量倒序）*/
export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const item of getAllContent()) {
    for (const t of item.tags ?? []) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/* 某标签下的全部内容（跨板块）*/
export function getContentByTag(tag: string): ContentItem[] {
  return getAllContent().filter((item) => (item.tags ?? []).includes(tag));
}
