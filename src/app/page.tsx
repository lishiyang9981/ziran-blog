import { Navbar } from "@/components/navbar";
import { HeroContent } from "@/components/hero-content";
import { TopCards } from "@/components/top-cards";
import { ContentSection } from "@/components/content-section";
import { LearningLog } from "@/components/learning-log";
import { TimelineSection } from "@/components/timeline-section";
import { getAllPosts } from "@/lib/posts";
import { getAllNotes } from "@/lib/notes";


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

          {/* Left — animated headline */}
          <HeroContent />

          {/* Right — Planet */}
          <div className="relative flex w-[55%] items-center justify-center">
            <div className="relative h-[580px] w-[580px]">

              {/* Ambient glow */}
              <div className="absolute inset-0 animate-glow rounded-full bg-purple-600/10 blur-3xl" />

              {/* Back ring arc */}
              <svg className="absolute inset-0 z-0 h-full w-full" viewBox="0 0 580 580" fill="none">
                <path d="M 38,305 A 252,64 -8 0 1 542,305" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
              </svg>

              {/* Planet sphere */}
              <div
                className="absolute inset-[58px] z-10 rounded-full"
                style={{
                  background: "radial-gradient(circle at 28% 68%, rgba(168,85,247,0.55) 0%, rgba(59,130,246,0.16) 26%, rgba(5,5,5,0.97) 60%)",
                  boxShadow: "0 0 100px rgba(168,85,247,0.18), inset 0 0 80px rgba(0,0,0,0.5)",
                }}
              />

              {/* Rim glow */}
              <div
                className="absolute inset-[58px] z-10 rounded-full"
                style={{
                  background: "radial-gradient(ellipse at 20% 74%, rgba(168,85,247,0.65) 0%, transparent 42%)",
                  filter: "blur(18px)",
                  mixBlendMode: "screen",
                }}
              />

              {/* Front ring arc */}
              <svg className="absolute inset-0 z-20 h-full w-full" viewBox="0 0 580 580" fill="none">
                <defs>
                  <linearGradient id="ringFront" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="white" stopOpacity="0" />
                    <stop offset="28%"  stopColor="white" stopOpacity="0.62" />
                    <stop offset="62%"  stopColor="rgb(168,85,247)" stopOpacity="0.42" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M 38,305 A 252,64 -8 0 0 542,305" stroke="url(#ringFront)" strokeWidth="2" />
              </svg>

              {/* Twinkling stars */}
              {([
                [28,75],[555,145],[475,448],[88,395],
                [298,28],[148,195],[515,275],[60,260],
                [510,380],[330,540],[420,90],[200,490],
              ] as [number,number][]).map(([x,y],i) => (
                <div
                  key={i}
                  className="star absolute h-[3px] w-[3px] rounded-full bg-white/60"
                  style={{ left: x, top: y, animationDelay: `${i * 0.4}s` }}
                />
              ))}

            </div>
          </div>

        </div>

        {/* 右侧边栏已移至 layout 的 <RightSidebar />（fixed 定位，全局可见）*/}

      </section>

      <TopCards />
      <ContentSection posts={posts} />
      <LearningLog notes={notes} />
      <TimelineSection />

    </main>
  );
}
