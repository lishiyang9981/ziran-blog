import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";

import { MouseGlow } from "@/components/mouse-glow";
import { SearchModal } from "@/components/search-modal";
import { getAllPosts } from "@/lib/posts";
import { getAllNotes } from "@/lib/notes";

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
    <html lang="zh-CN">
      <body className={inter.className}>
        <MouseGlow />
        <SearchModal posts={posts} notes={notes} />
        {children}
      </body>
    </html>
  );
}
