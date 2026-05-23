import { loadEntries, loadEntry, type Entry, type EntryWithContent } from "./content";

const DIR = "content/reading";
const COVER_BASE = "/images/reading/covers";

export type Reading = Entry;
export type ReadingWithContent = EntryWithContent;

export const getAllReading = (): Reading[] => loadEntries(DIR, COVER_BASE);
export const getReadingBySlug = (slug: string): ReadingWithContent | null =>
  loadEntry(DIR, slug, COVER_BASE);
