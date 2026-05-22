import Link from "next/link";

import { Navbar } from "@/components/navbar";
import { TopCards } from "@/components/top-cards";
import { ContentSection } from "@/components/content-section";
import { LearningLog } from "@/components/learning-log";
import { TimelineSection } from "@/components/timeline-section";
import { getAllPosts } from "@/lib/posts";
import { getAllNotes } from "@/lib/notes";

const STATUS_ITEMS = [
  { label: "探索中", active: true },
  { label: "构建中", active: false },
  { label: "思考中", active: false },
];

export default function Home() {
  const posts = getAllPosts().slice(0, 4);
  const notes = getAllNotes().slice(0, 8);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">

      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <Navbar />

      {/* ── Hero ──────────────────────────────── */}
      <section className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto flex w-full max-w-[1400px] items-center px-8">

          {/* Left */}
          <div className="flex w-[45%] flex-col justify-center">

            {/* Badge */}
            <div className="mb-8 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-zinc-400 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
              自然向晚,只取一朵紫云~
            </div>

            {/* Headline */}
            <h1 className="text-5xl font-semibold leading-[1.08] tracking-[-0.04em] lg:text-6xl 2xl:text-7xl">
              <span className="block bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent">
                持续探索
              </span>
              <span className="block">
                <span className="bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent">
                  技术与认知的
                </span>
                <span className="bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">
                  边界
                </span>
              </span>
            </h1>

            {/* Sub */}
            <p className="mt-6 max-w-md text-[15px] leading-8 text-zinc-500">
              用代码构建系统，用思考理解世界，
              <br />
              在技术与哲学之间寻找更深层的确定性。
            </p>

            {/* CTA */}
            <Link
              href="/blog"
              className="mt-10 flex w-fit items-center gap-3 rounded-full border border-white/20 px-6 py-3 text-sm text-white transition-all duration-300 hover:border-white/30 hover:bg-white/[0.05]"
            >
              探索我的数字花园
              <span className="text-zinc-500">→</span>
            </Link>

          </div>

          {/* Right — Planet */}
          <div className="relative flex w-[55%] items-center justify-center">
            <div className="relative h-[580px] w-[580px]">

              {/* Ambient glow */}
              <div className="absolute inset-0 animate-glow rounded-full bg-purple-600/10 blur-3xl" />

              {/* Back ring arc */}
              <svg
                className="absolute inset-0 z-0 h-full w-full"
                viewBox="0 0 580 580"
                fill="none"
              >
                <path
                  d="M 38,305 A 252,64 -8 0 1 542,305"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Planet sphere */}
              <div
                className="absolute inset-[58px] z-10 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 28% 68%, rgba(168,85,247,0.55) 0%, rgba(59,130,246,0.16) 26%, rgba(5,5,5,0.97) 60%)",
                  boxShadow:
                    "0 0 100px rgba(168,85,247,0.18), inset 0 0 80px rgba(0,0,0,0.5)",
                }}
              />

              {/* Rim glow */}
              <div
                className="absolute inset-[58px] z-10 rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse at 20% 74%, rgba(168,85,247,0.65) 0%, transparent 42%)",
                  filter: "blur(18px)",
                  mixBlendMode: "screen",
                }}
              />

              {/* Front ring arc */}
              <svg
                className="absolute inset-0 z-20 h-full w-full"
                viewBox="0 0 580 580"
                fill="none"
              >
                <defs>
                  <linearGradient id="ringFront" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="white" stopOpacity="0" />
                    <stop offset="28%"  stopColor="white" stopOpacity="0.62" />
                    <stop offset="62%"  stopColor="rgb(168,85,247)" stopOpacity="0.42" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 38,305 A 252,64 -8 0 0 542,305"
                  stroke="url(#ringFront)"
                  strokeWidth="2"
                />
              </svg>

              {/* Stars */}
              {([
                [28,  75 ], [555, 145], [475, 448], [88,  395],
                [298, 28 ], [148, 195], [515, 275], [60,  260],
                [510, 380], [330, 540],
              ] as [number, number][]).map(([x, y], i) => (
                <div
                  key={i}
                  className="absolute h-[3px] w-[3px] rounded-full bg-white/50"
                  style={{ left: x, top: y }}
                />
              ))}

            </div>
          </div>

        </div>

        {/* Right sidebar status */}
        <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-5 xl:flex">
          <p className="text-[9px] tracking-[0.35em] text-zinc-600">NOW</p>
          <div className="flex flex-col gap-4">
            {STATUS_ITEMS.map((s) => (
              <div key={s.label} className="flex items-center gap-2.5">
                <div
                  className={`h-1.5 w-1.5 rounded-full transition-all ${
                    s.active
                      ? "bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.9)]"
                      : "bg-zinc-700"
                  }`}
                />
                <span
                  className={`text-[11px] ${
                    s.active ? "text-zinc-300" : "text-zinc-600"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col items-center gap-2.5">
            <p className="text-[9px] tracking-[0.35em] text-zinc-600">SCROLL</p>
            <div className="flex h-7 w-[18px] items-start justify-center rounded-full border border-zinc-700 pt-1">
              <div className="h-1 w-px animate-bounce rounded-full bg-zinc-500" />
            </div>
          </div>
        </div>

      </section>

      <TopCards />
      <ContentSection posts={posts} />
      <LearningLog notes={notes} />
      <TimelineSection />

    </main>
  );
}
