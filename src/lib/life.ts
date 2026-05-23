import { loadEntries, loadEntry, type Entry, type EntryWithContent } from "./content";

const DIR = "content/life";

export type Life = Entry;
export type LifeWithContent = EntryWithContent;

export const getAllLife = (): Life[] => loadEntries(DIR);
export const getLifeBySlug = (slug: string): LifeWithContent | null =>
  loadEntry(DIR, slug);
