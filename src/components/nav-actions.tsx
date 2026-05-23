"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Hash, Plus, Pencil, type LucideIcon } from "lucide-react";

/* 一组导航动作：标签(公开) / 写文章(仅 dev) / 在 Keystatic 编辑(仅 dev，文章页才有)。
   - sidebar 变体：竖排彩色胶囊（电脑端右侧栏）
   - menu 变体：带色图标的行（移动端汉堡菜单）
   配色按 data-tone 走 CSS（见 globals.css），暗色/亮色各自加深以保证可读。 */

const isDev = process.env.NODE_ENV === "development";
const DETAIL = /^\/(blog|notes|reading|life)\/([^/]+)$/;

type ActionKey = "tags" | "write" | "edit";
type Action = { key: ActionKey; href: string; label: string; icon: LucideIcon };

function useActions(): Action[] {
  const pathname = usePathname() ?? "";
  const m = pathname.match(DETAIL);

  const actions: Action[] = [{ key: "tags", href: "/tags", label: "标签", icon: Hash }];
  if (isDev) actions.push({ key: "write", href: "/keystatic", label: "写文章", icon: Plus });
  if (isDev && m)
    actions.push({
      key: "edit",
      href: `/keystatic/collection/${m[1]}/item/${encodeURIComponent(m[2])}`,
      label: "编辑此篇",
      icon: Pencil,
    });
  return actions;
}

export function NavActions({
  variant,
  onNavigate,
}: {
  variant: "sidebar" | "menu";
  onNavigate?: () => void;
}) {
  const actions = useActions();

  if (variant === "sidebar") {
    return (
      <div className="flex flex-col items-center gap-2">
        {actions.map(({ key, href, label, icon: Icon }) => (
          <Link
            key={key}
            href={href}
            title={label}
            data-tone={key}
            className="nav-pill flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium transition duration-200 hover:brightness-110"
          >
            <Icon className="h-3 w-3" />
            {label}
          </Link>
        ))}
      </div>
    );
  }

  // menu 变体（移动端汉堡菜单内的行）
  return (
    <div className="mt-1 border-t border-white/[0.06] pt-1.5">
      {actions.map(({ key, href, label, icon: Icon }) => (
        <Link
          key={key}
          href={href}
          onClick={onNavigate}
          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          <Icon className="nav-row-icon h-4 w-4 flex-shrink-0" data-tone={key} />
          {label}
        </Link>
      ))}
    </div>
  );
}
