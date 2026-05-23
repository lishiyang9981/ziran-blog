import { loadEntries, loadEntry, type Entry, type EntryWithContent } from "./content";

const DIR = "content/reading";

export type Reading = Entry;
export type ReadingWithContent = EntryWithContent;

export const getAllReading = (): Reading[] => loadEntries(DIR);
export const getReadingBySlug = (slug: string): ReadingWithContent | null =>
  loadEntry(DIR, slug);
