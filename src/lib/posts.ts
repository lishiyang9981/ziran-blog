import fs from "fs";
import path from "path";

import matter from "gray-matter";

import { resolveAsset } from "./content";

const postsDir = path.join(process.cwd(), "content/blog");
const COVER_BASE = "/images/blog/covers";

/* 归一化日期为 YYYY-MM-DD 字符串
   （Keystatic 可能写出无引号日期，js-yaml 会解析成 Date 对象）*/
function toDateStr(v: unknown): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return typeof v === "string" ? v : v == null ? "" : String(v);
}

export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  cover?: string;
};

export type PostWithContent = Post & { content: string };

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDir);

  return fileNames
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.(mdx|md)$/, "");
      const fullPath = path.join(postsDir, fileName);
      const { data } = matter(fs.readFileSync(fullPath, "utf8"));

      return {
        slug,
        title: data.title ?? "",
        date: toDateStr(data.date),
        description: data.description ?? "",
        tags: data.tags ?? [],
        cover: resolveAsset(data.cover, COVER_BASE),
      } as Post;
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): PostWithContent | null {
  const fullPath = path.join(postsDir, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) return null;

  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));

  return {
    slug,
    content,
    title: data.title ?? "",
    date: toDateStr(data.date),
    description: data.description ?? "",
    tags: data.tags ?? [],
    cover: resolveAsset(data.cover, COVER_BASE),
  };
}
