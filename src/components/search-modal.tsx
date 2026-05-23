"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

import type { ContentItem } from "@/lib/content";

export function SearchModal({ items }: { items: ContentItem[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  /* ── Keyboard shortcuts ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpenSearch = () => setOpen(true);

    window.addEventListener("keydown", onKey);
    window.addEventListener("open-search", onOpenSearch);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-search", onOpenSearch);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  /* ── Filter results（标题/摘要/标签）── */
  const results = useMemo<ContentItem[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return items
      .filter(
        (it) =>
          it.title.toLowerCase().includes(q) ||
          it.description.toLowerCase().includes(q) ||
          (it.tags ?? []).some((t) => t.toLowerCase().includes(q))
      )
      .slice(0, 8);
  }, [query, items]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-24"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] shadow-[0_24px_80px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input row */}
            <div className="flex items-center gap-3 border-b border-white/[0.07] px-5 py-4">
              <Search className="h-4 w-4 flex-shrink-0 text-zinc-500" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索全站：文章、随笔、读书、生活、标签..."
                className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-600 outline-none"
              />
              <button
                onClick={() => setOpen(false)}
                className="text-zinc-600 transition hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results */}
            {results.length > 0 ? (
              <ul className="max-h-80 overflow-y-auto py-2">
                {results.map((item) => (
                  <li key={`${item.section}-${item.slug}`}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-start gap-4 px-5 py-3 transition hover:bg-white/[0.04]"
                    >
                      <span className="mt-0.5 flex-shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-zinc-500">
                        {item.sectionLabel}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-zinc-200">
                          {item.title}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-zinc-600">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : query.trim() ? (
              <div className="px-5 py-10 text-center text-sm text-zinc-600">
                没有找到「{query}」相关内容
              </div>
            ) : (
              <div className="px-5 py-8 text-center text-xs text-zinc-700">
                输入关键词，搜索全站内容
              </div>
            )}

            {/* Footer hints */}
            <div className="flex items-center gap-5 border-t border-white/[0.07] px-5 py-2.5 text-[11px] text-zinc-700">
              <span>
                <kbd className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px]">
                  ↵
                </kbd>{" "}
                打开
              </span>
              <span>
                <kbd className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px]">
                  Esc
                </kbd>{" "}
                关闭
              </span>
              <span className="ml-auto">
                <kbd className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px]">
                  ⌘K
                </kbd>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
