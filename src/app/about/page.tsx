import { Navbar } from "@/components/navbar";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <div className="mx-auto max-w-3xl px-8 pb-24 pt-32">
        <div className="mb-16">
          <p className="mb-3 text-xs tracking-[0.35em] text-zinc-600">ABOUT</p>
          <h1 className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-6xl font-semibold tracking-tight text-transparent">
            关于我
          </h1>
        </div>
        <div className="space-y-6 text-[15px] leading-8 text-zinc-400">
          <p>
            探索者 · 思考者 · INFP。
          </p>
          <p>
            希望余生的我，能修炼五样东西：扬在脸上的自信，长在心底的善良，融进血里的骨气，清风拂面的温柔，刻进命里的坚强。
          </p>
        </div>
      </div>
    </main>
  );
}
