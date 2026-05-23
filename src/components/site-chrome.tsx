"use client";

import { usePathname } from "next/navigation";

import { MouseGlow }    from "@/components/mouse-glow";
import { SearchModal }  from "@/components/search-modal";
import { RightSidebar } from "@/components/right-sidebar";
import { BackToTop }    from "@/components/back-to-top";
import type { Post } from "@/lib/posts";
import type { Note } from "@/lib/notes";

/* 站点装饰层：在 /keystatic 后台路径下不渲染，避免遮挡编辑界面 */
export function SiteChrome({ posts, notes }: { posts: Post[]; notes: Note[] }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/keystatic")) return null;

  return (
    <>
      <MouseGlow />
      <SearchModal posts={posts} notes={notes} />
      <RightSidebar />
      <BackToTop />
    </>
  );
}
