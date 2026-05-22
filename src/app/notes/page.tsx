import Link from "next/link";

import { Navbar } from "@/components/navbar";
import { getAllNotes } from "@/lib/notes";

export default function NotesPage() {
  const notes = getAllNotes();

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <div className="mx-auto max-w-4xl px-8 pb-24 pt-32">

        <div className="mb-16">
          <p className="mb-3 text-xs tracking-[0.35em] text-zinc-600">NOTES</p>
          <h1 className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-6xl font-semibold tracking-tight text-transparent">
            学习日志
          </h1>
          <p className="mt-4 text-zinc-500">
            记录每一次学习、阅读与思考的碎片。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {notes.map((note) => (
            <Link
              key={note.slug}
              href={`/notes/${note.slug}`}
              className="group rounded-[22px] border border-white/[0.07] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/12 hover:bg-white/[0.04]"
            >
              <p className="mb-3 text-xs text-zinc-600">{note.date}</p>
              <h2 className="text-lg font-semibold text-white">{note.title}</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-500 line-clamp-2">
                {note.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {note.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.08] px-2.5 py-0.5 text-[11px] text-zinc-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {notes.length === 0 && (
          <div className="rounded-[24px] border border-white/[0.07] p-16 text-center">
            <p className="text-zinc-600">还没有日志，快去记录第一条吧。</p>
          </div>
        )}

      </div>
    </main>
  );
}
