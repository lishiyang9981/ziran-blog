import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

import { Navbar } from "@/components/navbar";
import { PreCopy } from "@/components/pre-copy";
import { TagLink } from "@/components/tag-link";
import { TableOfContents } from "@/components/table-of-contents";
import { PostNav } from "@/components/post-nav";
import { DraftNotice } from "@/components/draft-badge";
import { getAllReading, getReadingBySlug } from "@/lib/reading";
import { getAdjacent } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllReading().map((r) => ({ slug: r.slug }));
}

export default async function ReadingDetail({ params }: Props) {
  const { slug } = await params;
  const item = getReadingBySlug(slug);

  if (!item) notFound();

  const { older, newer } = getAdjacent("reading", slug);

  return (
    <main className="page-bg relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="page-grid pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[450px] w-[450px] -translate-y-1/3 translate-x-1/4 rounded-full bg-amber-500/[0.06] blur-3xl" />
      <Navbar />
      <TableOfContents />

      <article className="relative z-10 mx-auto max-w-3xl px-8 pb-24 pt-32">

        <Link
          href="/reading"
          className="mb-10 flex items-center gap-2 text-sm text-zinc-600 transition hover:text-white"
        >
          ← 返回观澜
        </Link>

        {item.draft && <DraftNotice />}

        {item.cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.cover}
            alt={item.title}
            className="mb-12 w-full rounded-2xl border border-white/10 object-cover"
            style={{ maxHeight: 420 }}
          />
        )}

        <header className="mb-14">
          <p className="mb-4 text-sm text-zinc-600">{item.date}</p>
          <h1 className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-5xl font-semibold leading-[1.15] tracking-tight text-transparent">
            {item.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-zinc-500">
            {item.description}
          </p>
          {item.tags?.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <TagLink key={tag} tag={tag} className="px-3 py-1 text-xs" />
              ))}
            </div>
          )}
        </header>

        <div className="mb-12 h-px bg-white/[0.07]" />

        <div
          className="
            prose prose-invert prose-zinc max-w-none
            prose-headings:font-semibold prose-headings:text-white
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-zinc-400 prose-p:leading-8
            prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white
            prose-blockquote:border-purple-500/40 prose-blockquote:text-zinc-400
            prose-code:rounded prose-code:bg-white/[0.06] prose-code:px-1.5 prose-code:py-0.5 prose-code:text-purple-300 prose-code:before:content-none prose-code:after:content-none
            prose-pre:rounded-2xl prose-pre:border prose-pre:border-white/10 prose-pre:bg-white/[0.03]
            prose-img:rounded-2xl prose-img:border prose-img:border-white/10
            prose-li:text-zinc-400
          "
        >
          <MDXRemote
            source={item.content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
            components={{ pre: PreCopy }}
          />
        </div>

        <PostNav older={older} newer={newer} />

        <div className="mt-12 border-t border-white/[0.07] pt-10">
          <Link
            href="/reading"
            className="text-sm text-zinc-600 transition hover:text-white"
          >
            ← 所有观澜
          </Link>
        </div>

      </article>
    </main>
  );
}
