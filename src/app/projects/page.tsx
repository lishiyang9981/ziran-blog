import { Navbar } from "@/components/navbar";

const PROJECTS = [
  {
    title: "CWR&L Blog",
    desc: "基于 Next.js + MDX 构建的个人博客系统，支持暗/亮双主题、全文搜索、富媒体内容。",
    tags: ["Next.js", "MDX", "Tailwind"],
    status: "上线",
    href: "https://ziran-blog.vercel.app",
    gradient: "from-purple-500/20 to-blue-600/10",
  },
];

export default function ProjectsPage() {
  return (
    <main className="page-bg relative min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* Background grid */}
      <div className="page-grid pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Decorative glows — 琥珀/橙色调 */}
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/4 translate-x-1/4 rounded-full bg-amber-500/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] translate-y-1/3 -translate-x-1/4 rounded-full bg-orange-500/[0.04] blur-3xl" />

      <Navbar />

      <div className="relative z-10 mx-auto max-w-4xl px-8 pb-24 pt-32">
        <div className="mb-16">
          <p className="mb-3 text-xs tracking-[0.35em] text-zinc-600">PROJECTS</p>
          <h1 className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-6xl font-semibold tracking-tight text-transparent">
            项目
          </h1>
          <p className="mt-4 text-zinc-500">一些有趣的尝试与实践。</p>
        </div>

        <div className="space-y-5">
          {PROJECTS.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-white/12 hover:bg-white/[0.04]"
            >
              {/* Gradient banner */}
              <div className={`h-[120px] w-full bg-gradient-to-br ${project.gradient} relative flex items-center justify-center`}>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />
                <span className="relative text-2xl font-bold tracking-wider text-white/60">{project.title}</span>
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">{project.title}</h2>
                  <span className="rounded-full bg-purple-500/20 px-3 py-0.5 text-xs text-purple-300">{project.status}</span>
                </div>
                <p className="text-sm leading-7 text-zinc-500">{project.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/[0.08] px-3 py-0.5 text-xs text-zinc-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}

          {/* 更多项目占位 */}
          <div className="rounded-[28px] border border-dashed border-white/[0.07] p-12 text-center">
            <p className="text-zinc-600">更多项目整理中…</p>
          </div>
        </div>
      </div>
    </main>
  );
}
