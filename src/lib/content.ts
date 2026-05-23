import fs from "fs";
import path from "path";

import matter from "gray-matter";

/* 通用内容加载器：读取某目录下的 .mdx/.md，解析 frontmatter
   供 reading / life 等板块复用（posts / notes 为历史原因保留各自实现） */

export type Entry = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  cover?: string;
};

export type EntryWithContent = Entry & { content: string };

/* 归一化日期为 YYYY-MM-DD 字符串
   （Keystatic 可能写出无引号日期，js-yaml 会解析成 Date 对象）*/
function toDateStr(v: unknown): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return typeof v === "string" ? v : v == null ? "" : String(v);
}

export function loadEntries(relDir: string): Entry[] {
  const dir = path.join(process.cwd(), relDir);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.(mdx|md)$/, "");
      const { data } = matter(fs.readFileSync(path.join(dir, fileName), "utf8"));
      return {
        slug,
        title: data.title ?? "",
        date: toDateStr(data.date),
        description: data.description ?? "",
        tags: data.tags ?? [],
        cover: data.cover,
      } as Entry;
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function loadEntry(relDir: string, slug: string): EntryWithContent | null {
  const full = path.join(process.cwd(), relDir, `${slug}.mdx`);
  if (!fs.existsSync(full)) return null;

  const { data, content } = matter(fs.readFileSync(full, "utf8"));
  return {
    slug,
    content,
    title: data.title ?? "",
    date: toDateStr(data.date),
    description: data.description ?? "",
    tags: data.tags ?? [],
    cover: data.cover,
  };
}
