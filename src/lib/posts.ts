import { loadEntries, loadEntry, type Entry, type EntryWithContent } from "./content";

const DIR = "content/blog";
const COVER_BASE = "/images/blog/covers";

export type Post = Entry;
export type PostWithContent = EntryWithContent;

export const getAllPosts = (): Post[] => loadEntries(DIR, { coverBase: COVER_BASE });
export const getPostBySlug = (slug: string): PostWithContent | null =>
  loadEntry(DIR, slug, { coverBase: COVER_BASE });
