import { loadEntries, loadEntry, type Entry, type EntryWithContent } from "./content";

const DIR = "content/notes";

export type Note = Entry;
export type NoteWithContent = EntryWithContent;

export const getAllNotes = (): Note[] => loadEntries(DIR);
export const getNoteBySlug = (slug: string): NoteWithContent | null =>
  loadEntry(DIR, slug);
