import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";

import { MouseGlow }   from "@/components/mouse-glow";
import { SearchModal } from "@/components/search-modal";
import { BackToTop }   from "@/components/back-to-top";
import { getAllPosts }  from "@/lib/posts";
import { getAllNotes }  from "@/lib/notes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CWR&L",
  description: "持续探索技术与认知的边界",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const posts = getAllPosts();
  const notes = getAllNotes();

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      {/* 防止主题切换时页面闪烁：在 JS 加载前就应用 data-theme */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('blog-theme');if(t)document.documentElement.setAttribute('data-theme',t);})()`,
          }}
        />
      </head>
      <body className={`${inter.className} accent-hue`}>
        <MouseGlow />
        <SearchModal posts={posts} notes={notes} />
        <BackToTop />
        {children}
      </body>
    </html>
  );
}
