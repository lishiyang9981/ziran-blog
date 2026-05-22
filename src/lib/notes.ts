import fs from "fs";
import path from "path";

import matter from "gray-matter";

const notesDir = path.join(process.cwd(), "content/notes");

export type Note = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
};

export type NoteWithContent = Note & { content: string };

export function getAllNotes(): Note[] {
  if (!fs.existsSync(notesDir)) return [];

  return fs
    .readdirSync(notesDir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.(mdx|md)$/, "");
      const { data } = matter(
        fs.readFileSync(path.join(notesDir, fileName), "utf8")
      );

      return {
        slug,
        title: data.title ?? "",
        date: data.date ?? "",
        description: data.description ?? "",
        tags: data.tags ?? [],
      } as Note;
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getNoteBySlug(slug: string): NoteWithContent | null {
  const fullPath = path.join(notesDir, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) return null;

  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));

  return {
    slug,
    content,
    title: data.title ?? "",
    date: data.date ?? "",
    description: data.description ?? "",
    tags: data.tags ?? [],
  };
}
