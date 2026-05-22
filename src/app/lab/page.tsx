import { Navbar } from "@/components/navbar";

export default function LabPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <div className="mx-auto max-w-4xl px-8 pb-24 pt-32">
        <div className="mb-16">
          <p className="mb-3 text-xs tracking-[0.35em] text-zinc-600">AI LAB</p>
          <h1 className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-6xl font-semibold tracking-tight text-transparent">
            实验室
          </h1>
          <p className="mt-4 text-zinc-500">探索 AI 与未来技术的可能性。</p>
        </div>
        <div className="rounded-[28px] border border-white/[0.07] bg-white/[0.02] p-16 text-center">
          <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-purple-500/20 blur-xl" />
          <p className="text-zinc-500">实验记录整理中，敬请期待。</p>
        </div>
      </div>
    </main>
  );
}
