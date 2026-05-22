"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Sun } from "lucide-react";

const NAV_ITEMS = [
  { label: "首页",   href: "/" },
  { label: "文章",   href: "/blog" },
  { label: "日志",   href: "/notes" },
  { label: "项目",   href: "/projects" },
  { label: "实验室", href: "/lab" },
  { label: "关于我", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const openSearch = () =>
    window.dispatchEvent(new CustomEvent("open-search"));

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.08] bg-[#050505]/92 backdrop-blur-2xl shadow-[0_1px_30px_rgba(0,0,0,0.4)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.7)] transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(168,85,247,1)]" />
          <span className="text-sm font-semibold tracking-[0.15em] text-white">
            CWR&amp;L
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map(({ label, href }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-4 py-2 text-sm transition-colors duration-200 ${
                  active
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-200"
                }`}
              >
                {label}
                {active && (
                  <span className="absolute bottom-0.5 left-1/2 h-0.5 w-1 -translate-x-1/2 rounded-full bg-purple-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={openSearch}
            className="flex h-8 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 text-zinc-500 transition hover:border-white/20 hover:text-white"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden text-[11px] lg:inline">⌘K</span>
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-500 transition hover:border-white/20 hover:text-white">
            <Sun className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </header>
  );
}
