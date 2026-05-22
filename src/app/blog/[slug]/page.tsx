import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { Navbar } from "@/components/navbar";
import { ScrollProgress } from "@/components/scroll-progress";
import { PreCopy } from "@/components/pre-copy";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

/* ── Custom MDX components for rich content ── */
function Video({ src, poster }: { src: string; poster?: string }) {
  return (
    <video
      src={src}
      poster={poster}
      controls
      className="my-6 w-full rounded-2xl border border-white/10"
    />
  );
}

function YouTube({ id }: { id: string }) {
  return (
    <div className="my-6 aspect-video w-full overflow-hidden rounded-2xl border border-white/10">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        className="h-full w-full"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
}

function Callout({
  type = "info",
  children,
}: {
  type?: "info" | "warn" | "tip";
  children: React.ReactNode;
}) {
  const styles = {
    info: "border-blue-500/30 bg-blue-500/[0.06] text-blue-300",
    warn: "border-amber-500/30 bg-amber-500/[0.06] text-amber-300",
    tip:  "border-green-500/30 bg-green-500/[0.06] text-green-300",
  };
  return (
    <div className={`my-4 rounded-xl border p-4 text-sm leading-7 ${styles[type]}`}>
      {children}
    </div>
  );
}

const MDX_COMPONENTS = { Video, YouTube, Callout, pre: PreCopy };

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="page-bg relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* Background grid */}
      <div className="page-grid pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/3 translate-x-1/4 rounded-full bg-purple-500/[0.06] blur-3xl" />
      <ScrollProgress />
      <Navbar />

      <article className="relative z-10 mx-auto max-w-3xl px-8 pb-24 pt-32">

        {/* Back */}
        <Link
          href="/blog"
          className="mb-10 flex items-center gap-2 text-sm text-zinc-600 transition hover:text-white"
        >
          ← 返回文章列表
        </Link>

        {/* Cover image */}
        {post.cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover}
            alt={post.title}
            className="mb-12 w-full rounded-2xl border border-white/10 object-cover"
            style={{ maxHeight: 420 }}
          />
        )}

        {/* Header */}
        <header className="mb-14">
          <p className="mb-4 text-sm text-zinc-600">{post.date}</p>
          <h1 className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-5xl font-semibold leading-[1.15] tracking-tight text-transparent">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-zinc-500">
            {post.description}
          </p>
          {post.tags?.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="tag-chip rounded-full border border-white/[0.08] px-3 py-1 text-xs text-zinc-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Divider */}
        <div className="mb-12 h-px bg-white/[0.07]" />

        {/* MDX Content */}
        <div
          className="
            prose prose-invert prose-zinc max-w-none

            prose-headings:font-semibold
            prose-headings:tracking-tight
            prose-headings:text-white

            prose-h1:text-4xl
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-xl  prose-h3:mt-8  prose-h3:mb-3

            prose-p:text-zinc-400 prose-p:leading-8

            prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline

            prose-strong:text-white

            prose-blockquote:border-purple-500/40
            prose-blockquote:text-zinc-400

            prose-code:rounded prose-code:bg-white/[0.06] prose-code:px-1.5 prose-code:py-0.5 prose-code:text-purple-300 prose-code:before:content-none prose-code:after:content-none

            prose-pre:rounded-2xl prose-pre:border prose-pre:border-white/10 prose-pre:bg-white/[0.03]

            prose-img:rounded-2xl prose-img:border prose-img:border-white/10

            prose-hr:border-white/[0.07]

            prose-li:text-zinc-400
          "
        >
          <MDXRemote
            source={post.content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            components={MDX_COMPONENTS}
          />
        </div>

        {/* Footer nav */}
        <div className="mt-16 border-t border-white/[0.07] pt-10">
          <Link
            href="/blog"
            className="text-sm text-zinc-600 transition hover:text-white"
          >
            ← 所有文章
          </Link>
        </div>

      </article>
    </main>
  );
}
