"use client";

import { usePathname } from "next/navigation";

import { MouseGlow }    from "@/components/mouse-glow";
import { SearchModal }  from "@/components/search-modal";
import { RightSidebar } from "@/components/right-sidebar";
import { BackToTop }    from "@/components/back-to-top";
import { KeystaticBar } from "@/components/keystatic-bar";
import type { ContentItem } from "@/lib/content";

/* 站点装饰层：在 /keystatic 后台路径下只显示一个返回浮条，
   其余装饰不渲染，避免遮挡编辑界面 */
export function SiteChrome({ items }: { items: ContentItem[] }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/keystatic")) return <KeystaticBar />;

  return (
    <>
      <MouseGlow />
      <SearchModal items={items} />
      <RightSidebar />
      <BackToTop />
    </>
  );
}
