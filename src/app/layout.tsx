import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";

import { SiteChrome }   from "@/components/site-chrome";
import { getAllPosts }   from "@/lib/posts";
import { getAllNotes }   from "@/lib/notes";

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
      {/* 防闪烁：JS 加载前先读取主题 */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('blog-theme');if(t)document.documentElement.setAttribute('data-theme',t);})()`,
          }}
        />
      </head>
      {/* 不加任何 filter 类，避免破坏 fixed 定位 */}
      <body className={inter.className}>
        <SiteChrome posts={posts} notes={notes} />
        {children}
      </body>
    </html>
  );
}
