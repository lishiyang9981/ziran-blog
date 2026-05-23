import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";

import { SiteChrome }   from "@/components/site-chrome";
import { getAllContent } from "@/lib/content";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CWR&L",
  description: "在技术、思考与生活之间",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const items = getAllContent();

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      {/* 防闪烁：JS 加载前先读取主题 */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('blog-theme');if(t)document.documentElement.setAttribute('data-theme',t);})()`,
          }}
        />
        {/* 艺术字：站酷小薇体（首页大标题用）。display=swap 先显示回落字体再换上 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* 不加任何 filter 类，避免破坏 fixed 定位 */}
      <body className={inter.className}>
        <SiteChrome items={items} />
        {children}
      </body>
    </html>
  );
}
