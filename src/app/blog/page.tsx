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
    <main className="page-bg relative min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* Background grid */}
      <div className="page-grid pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Decorative glows */}
      <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/4 rounded-full bg-purple-500/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] translate-y-1/3 -translate-x-1/4 rounded-full bg-blue-500/[0.05] blur-3xl" />

      <Navbar />

      <div className="relative z-10 mx-auto max-w-4xl px-8 pb-24 pt-32">

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
              className="group flex items-center gap-6 rounded-[24px] border border-white/[0.07] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/20 hover:bg-white/[0.03]"
            >
              {/* Thumbnail */}
              <div className={`relative h-[80px] w-[128px] flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br ${COVER_GRADIENTS[i % COVER_GRADIENTS.length]}`}>
                {post.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.cover} alt={post.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full flex-col items-start justify-end p-2.5">
                    <div className="mb-1.5 w-full space-y-1">
                      <div className="h-[2px] w-10 rounded-full bg-white/20" />
                      <div className="h-[2px] w-7 rounded-full bg-white/12" />
                    </div>
                    <p className="line-clamp-2 text-[9px] font-medium leading-tight text-white/40">{post.title}</p>
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-semibold text-white transition-colors group-hover:text-zinc-100">{post.title}</h2>
                <p className="mt-2 text-sm text-zinc-500">{post.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags?.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/[0.08] px-3 py-0.5 text-xs text-zinc-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex-shrink-0 text-sm text-zinc-600">{post.date}</div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="rounded-[24px] border border-white/[0.07] bg-white/[0.02] p-16 text-center backdrop-blur-sm">
            <p className="text-zinc-600">还没有文章，快去写一篇吧。</p>
          </div>
        )}
      </div>
    </main>
  );
}
