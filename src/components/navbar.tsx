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

// 四种主题色：紫 / 蓝 / 玫瑰 / 青
const THEMES = [
  { name: "紫", hue: "0deg",   dot: "#c084fc" },
  { name: "蓝", hue: "-50deg", dot: "#60a5fa" },
  { name: "玫", hue: "70deg",  dot: "#fb7185" },
  { name: "青", hue: "-90deg", dot: "#22d3ee" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [themeIdx, setThemeIdx] = useState(0);

  // 读取本地存储的主题
  useEffect(() => {
    const saved = localStorage.getItem("accent-theme");
    if (saved !== null) {
      const idx = Number(saved);
      setThemeIdx(idx);
      document.documentElement.style.setProperty(
        "--hue-rotate", THEMES[idx].hue
      );
    } else {
      document.documentElement.style.setProperty("--hue-rotate", "0deg");
    }
  }, []);

  // 滚动效果
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const openSearch = () =>
    window.dispatchEvent(new CustomEvent("open-search"));

  const cycleTheme = () => {
    const next = (themeIdx + 1) % THEMES.length;
    setThemeIdx(next);
    document.documentElement.style.setProperty("--hue-rotate", THEMES[next].hue);
    localStorage.setItem("accent-theme", String(next));
  };

  const currentTheme = THEMES[themeIdx];

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
                  active ? "text-white" : "text-zinc-500 hover:text-zinc-200"
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

          {/* 主题色切换按钮 */}
          <button
            onClick={cycleTheme}
            title={`当前主题：${currentTheme.name}色，点击切换`}
            className="group relative flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition hover:border-white/20"
          >
            {/* 色点预览 */}
            <span
              className="h-3 w-3 rounded-full transition-all duration-300 group-hover:scale-110"
              style={{
                backgroundColor: currentTheme.dot,
                boxShadow: `0 0 8px ${currentTheme.dot}99`,
              }}
            />
            {/* tooltip */}
            <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-900 px-2 py-0.5 text-[10px] text-zinc-400 opacity-0 transition-opacity group-hover:opacity-100">
              {currentTheme.name}色
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}
