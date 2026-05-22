import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { Navbar } from "@/components/navbar";
import { getAllNotes, getNoteBySlug } from "@/lib/notes";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllNotes().map((n) => ({ slug: n.slug }));
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);

  if (!note) notFound();

  return (
    <main className="page-bg relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="page-grid pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] -translate-y-1/4 translate-x-1/4 rounded-full bg-emerald-500/[0.06] blur-3xl" />
      <Navbar />

      <article className="relative z-10 mx-auto max-w-3xl px-8 pb-24 pt-32">

        <Link
          href="/notes"
          className="mb-10 flex items-center gap-2 text-sm text-zinc-600 transition hover:text-white"
        >
          ← 返回日志列表
        </Link>

        <header className="mb-14">
          <p className="mb-4 text-sm text-zinc-600">{note.date}</p>
          <h1 className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-5xl font-semibold leading-[1.15] tracking-tight text-transparent">
            {note.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-zinc-500">
            {note.description}
          </p>
          {note.tags?.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/[0.08] px-3 py-1 text-xs text-zinc-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="mb-12 h-px bg-white/[0.07]" />

        <div
          className="
            prose prose-invert prose-zinc max-w-none
            prose-headings:font-semibold prose-headings:text-white
            prose-p:text-zinc-400 prose-p:leading-8
            prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white
            prose-code:rounded prose-code:bg-white/[0.06] prose-code:px-1.5 prose-code:py-0.5 prose-code:text-purple-300 prose-code:before:content-none prose-code:after:content-none
            prose-pre:rounded-2xl prose-pre:border prose-pre:border-white/10 prose-pre:bg-white/[0.03]
            prose-img:rounded-2xl prose-img:border prose-img:border-white/10
            prose-li:text-zinc-400
          "
        >
          <MDXRemote
            source={note.content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>

        <div className="mt-16 border-t border-white/[0.07] pt-10">
          <Link
            href="/notes"
            className="text-sm text-zinc-600 transition hover:text-white"
          >
            ← 所有日志
          </Link>
        </div>

      </article>
    </main>
  );
}
