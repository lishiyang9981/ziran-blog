import { Navbar } from "@/components/navbar";
import { HeroContent } from "@/components/hero-content";
import { HeroVisual } from "@/components/hero-visual";
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
    <main className="page-bg relative min-h-screen overflow-x-hidden bg-[#050505] text-white">

      {/* Background grid */}
      <div className="page-grid pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <Navbar />

      {/* ── Hero ──────────────────────────────── */}
      <section className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto flex w-full max-w-[1400px] items-center px-8">

          {/* Left — animated headline */}
          <HeroContent />

          {/* Right — Hero Visual（暗色=星球，亮色=蓝天白云） */}
          <div className="relative flex w-[55%] items-center justify-center">
            <HeroVisual />
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
