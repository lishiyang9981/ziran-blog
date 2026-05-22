"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Note } from "@/lib/notes";

const VISIBLE = 4;

export function LearningLog({ notes }: { notes: Note[] }) {
  const [offset, setOffset] = useState(0);
  const maxOffset = Math.max(0, notes.length - VISIBLE);

  const visibleNotes = notes.slice(offset, offset + VISIBLE);

  return (
    <section className="relative z-10 mx-auto max-w-[1400px] px-8 pb-6">
      <div className="card-item rounded-[28px] border border-white/[0.07] bg-white/[0.02] p-8 backdrop-blur">

        {/* Header */}
        <div className="mb-7 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-[22px] font-semibold text-white">学习日志</h2>
            <span className="text-xs text-zinc-600">· 最近更新</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/notes"
              className="text-sm text-zinc-500 transition hover:text-white"
            >
              查看全部 →
            </Link>
            <button
              onClick={() => setOffset(Math.max(0, offset - 1))}
              disabled={offset === 0}
              className="tag-chip flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-zinc-600 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setOffset(Math.min(maxOffset, offset + 1))}
              disabled={offset >= maxOffset}
              className="tag-chip flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-zinc-600 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Timeline dots */}
        <div className="relative mb-6">
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/[0.06]" />
          <div className="relative flex justify-around">
            {notes.map((_, i) => {
              const active = i >= offset && i < offset + VISIBLE;
              return (
                <button
                  key={i}
                  onClick={() => setOffset(Math.min(maxOffset, Math.max(0, i - 1)))}
                  className={`h-2 w-2 rounded-full border transition-all duration-300 ${
                    active
                      ? "border-purple-500/60 bg-purple-500/40 shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                      : "timeline-dot border-white/10 bg-[#050505] hover:border-white/20"
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleNotes.map((note) => (
            <Link
              key={note.slug}
              href={`/notes/${note.slug}`}
              className="card-item group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]"
            >
              <h3 className="text-[15px] font-medium leading-snug text-white line-clamp-2">
                {note.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 line-clamp-2">
                {note.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {note.tags?.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="tag-chip rounded-full border border-white/[0.08] px-2.5 py-0.5 text-[11px] text-zinc-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
