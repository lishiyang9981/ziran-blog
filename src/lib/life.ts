import { loadEntries, loadEntry, type Entry, type EntryWithContent } from "./content";

const DIR = "content/life";
const COVER_BASE = "/images/life/covers";

export type Life = Entry;
export type LifeWithContent = EntryWithContent;

export const getAllLife = (): Life[] => loadEntries(DIR, { coverBase: COVER_BASE });
export const getLifeBySlug = (slug: string): LifeWithContent | null =>
  loadEntry(DIR, slug, { coverBase: COVER_BASE });
