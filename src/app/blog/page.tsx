import Link from "next/link";

import { Navbar } from "@/components/navbar";
import { getAllPosts } from "@/lib/posts";

const COVER_GRADIENTS = [
  "from-purple-500/25 to-blue-600/10",
  "from-blue-500/25 to-cyan-500/10",
  "from-emerald-500/20 to-teal-600/10",
  "from-pink-500/20 to-purple-600/10",
  "from-amber-500/20 to-orange-600/10",
];

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <div className="mx-auto max-w-4xl px-8 pb-24 pt-32">

        {/* Header */}
        <div className="mb-16">
          <p className="mb-3 text-xs tracking-[0.35em] text-zinc-600">ARTICLES</p>
          <h1 className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-6xl font-semibold tracking-tight text-transparent">
            技术文章
          </h1>
          <p className="mt-4 text-zinc-500">
            记录技术探索、思考实践与认知成长。
          </p>
        </div>

        {/* Post list */}
        <div className="space-y-4">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex items-center gap-6 rounded-[24px] border border-white/[0.07] bg-white/[0.02] p-6 transition-all duration-400 hover:border-purple-500/20 hover:bg-white/[0.03]"
            >
              {/* Thumbnail */}
              <div
                className={`h-[80px] w-[128px] flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br ${COVER_GRADIENTS[i % COVER_GRADIENTS.length]}`}
              >
                {post.cover && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.cover}
                    alt={post.title}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-semibold text-white">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-zinc-500">{post.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.08] px-3 py-0.5 text-xs text-zinc-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex-shrink-0 text-sm text-zinc-600">
                {post.date}
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="rounded-[24px] border border-white/[0.07] bg-white/[0.02] p-16 text-center">
            <p className="text-zinc-600">还没有文章，快去写一篇吧。</p>
          </div>
        )}

      </div>
    </main>
  );
}
