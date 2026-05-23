"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Hash, Plus, Pencil, type LucideIcon } from "lucide-react";

/* 一组导航动作：标签(公开) / 写文章(仅 dev) / 在 Keystatic 编辑(仅 dev，文章页才有)。
   - sidebar 变体：竖排彩色胶囊（电脑端右侧栏）
   - menu 变体：带色图标的行（移动端汉堡菜单）
   三者用不同色调区分，形态保持一致以求协调。 */

const isDev = process.env.NODE_ENV === "development";
const DETAIL = /^\/(blog|notes|reading|life)\/([^/]+)$/;

type ActionKey = "tags" | "write" | "edit";
type Action = { key: ActionKey; href: string; label: string; icon: LucideIcon };

const TONE: Record<ActionKey, { border: string; bg: string; color: string; glow: string }> = {
  // 标签用主题强调色（暗紫 / 亮绿）
  tags:  { border: "rgba(var(--accent-rgb),0.4)", bg: "rgba(var(--accent-rgb),0.12)", color: "var(--accent)", glow: "rgba(var(--accent-rgb),0.15)" },
  // 写文章：天蓝
  write: { border: "rgba(56,189,248,0.45)", bg: "rgba(56,189,248,0.12)", color: "#7dd3fc", glow: "rgba(56,189,248,0.15)" },
  // 编辑：琥珀
  edit:  { border: "rgba(251,191,36,0.45)", bg: "rgba(251,191,36,0.12)", color: "#fcd34d", glow: "rgba(251,191,36,0.15)" },
};

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
        {actions.map(({ key, href, label, icon: Icon }) => {
          const t = TONE[key];
          return (
            <Link
              key={key}
              href={href}
              title={label}
              className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium transition duration-200 hover:brightness-125"
              style={{ borderColor: t.border, backgroundColor: t.bg, color: t.color, boxShadow: `0 0 12px ${t.glow}` }}
            >
              <Icon className="h-3 w-3" />
              {label}
            </Link>
          );
        })}
      </div>
    );
  }

  // menu 变体（移动端汉堡菜单内的行）
  return (
    <div className="mt-1 border-t border-white/[0.06] pt-1.5">
      {actions.map(({ key, href, label, icon: Icon }) => {
        const t = TONE[key];
        return (
          <Link
            key={key}
            href={href}
            onClick={onNavigate}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            <Icon className="h-4 w-4 flex-shrink-0" style={{ color: t.color }} />
            {label}
          </Link>
        );
      })}
    </div>
  );
}
