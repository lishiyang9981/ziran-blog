"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

const NAV_ITEMS = [
  { label: "首页",   href: "/" },
  { label: "文章",   href: "/blog" },
  { label: "日志",   href: "/notes" },
  { label: "项目",   href: "/projects" },
  { label: "实验室", href: "/lab" },
  { label: "关于我们", href: "/about" },
];

const THEMES = [
  { id: "dark",  dot: "#c084fc", title: "暗色" },
  { id: "light", dot: "#52a66c", title: "自然" },
];

export function Navbar() {
  const pathname  = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [themeId,  setThemeId]  = useState("dark");

  /* 读取已保存主题 */
  useEffect(() => {
    const saved = localStorage.getItem("blog-theme") ?? "dark";
    setThemeId(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  /* 滚动检测 */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const openSearch = () =>
    window.dispatchEvent(new CustomEvent("open-search"));

  const toggleTheme = () => {
    const next = themeId === "dark" ? "light" : "dark";
    setThemeId(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("blog-theme", next);
  };

  const currentTheme = THEMES.find(t => t.id === themeId) ?? THEMES[0];

  return (
    /* 整行固定，内容居中，pointer-events-none 让外层不拦截点击 */
    <header className="pointer-events-none fixed left-0 right-0 top-3 z-50 flex justify-center px-4">
      <div
        className={`pointer-events-auto flex items-center gap-4 transition-all duration-500 ${
          scrolled
            ? `h-11 rounded-full border px-4 shadow-[0_4px_32px_rgba(0,0,0,0.18)] backdrop-blur-2xl ${
                themeId === "light"
                  ? "border-black/[0.08] bg-white/90"
                  : "border-white/[0.12] bg-[#050505]/80"
              }`
            : "h-14 w-full max-w-7xl rounded-none border-b border-transparent bg-transparent px-6"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="group flex flex-shrink-0 items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.7)] transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(168,85,247,1)]" />
          <span className="text-sm font-semibold tracking-[0.15em] text-white">
            CWR&amp;L
          </span>
        </Link>

        {/* 导航链接 */}
        <nav className="hidden flex-1 items-center justify-center gap-0.5 md:flex">
          {NAV_ITEMS.map(({ label, href }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors duration-200 ${
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

        {/* 操作按钮 */}
        <div className="flex flex-shrink-0 items-center gap-2">
          <button
            onClick={openSearch}
            className="flex h-8 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 text-zinc-500 transition hover:border-white/20 hover:text-white"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden text-[11px] lg:inline">⌘K</span>
          </button>

          {/* 两态主题切换按钮 */}
          <button
            onClick={toggleTheme}
            title={`切换到${currentTheme.id === "dark" ? "云朵" : "紫色"}主题`}
            className="group relative flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition hover:border-white/20"
          >
            <span
              className="h-3 w-3 rounded-full transition-all duration-300 group-hover:scale-110"
              style={{
                backgroundColor: currentTheme.dot,
                boxShadow: `0 0 8px ${currentTheme.dot}bb`,
              }}
            />
            {/* tooltip */}
            <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-900 px-2 py-0.5 text-[10px] text-zinc-400 opacity-0 transition-opacity group-hover:opacity-100">
              {currentTheme.title}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
