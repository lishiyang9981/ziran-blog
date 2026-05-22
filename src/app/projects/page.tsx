import { Navbar } from "@/components/navbar";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <div className="mx-auto max-w-4xl px-8 pb-24 pt-32">
        <div className="mb-16">
          <p className="mb-3 text-xs tracking-[0.35em] text-zinc-600">PROJECTS</p>
          <h1 className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-6xl font-semibold tracking-tight text-transparent">
            项目
          </h1>
          <p className="mt-4 text-zinc-500">一些有趣的尝试与实践。</p>
        </div>
        <div className="rounded-[28px] border border-white/[0.07] bg-white/[0.02] p-16 text-center">
          <p className="text-zinc-500">项目整理中，敬请期待。</p>
        </div>
      </div>
    </main>
  );
}
