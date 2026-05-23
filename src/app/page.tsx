import { Navbar } from "@/components/navbar";
import { HeroContent } from "@/components/hero-content";
import { HeroVisual } from "@/components/hero-visual";
import { TopCards } from "@/components/top-cards";
import { ContentSection } from "@/components/content-section";
import { LearningLog } from "@/components/learning-log";
import { TimelineSection } from "@/components/timeline-section";
import { getAllPosts } from "@/lib/posts";
import { getAllNotes } from "@/lib/notes";
import { getAllReading } from "@/lib/reading";


export default function Home() {
  const posts = getAllPosts().slice(0, 4);
  const notes = getAllNotes().slice(0, 8);
  const reading = getAllReading().slice(0, 5);

  return (
    <main className="page-bg relative min-h-screen overflow-x-hidden bg-[#050505] text-white">

      {/* Background grid */}
      <div className="page-grid pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <Navbar />

      {/* ── Hero ──────────────────────────────── */}
      <section className="relative z-10 overflow-hidden lg:min-h-screen">
        {/*
          移动端：grid 叠层 —— 视觉在后、文字卡片在前（同一个 grid 单元格），高度随内容自适应
          桌面端：flex 左右并排（lg:flex 覆盖 grid，order-* 保证左文右图）
        */}
        <div className="mx-auto grid w-full grid-cols-1 lg:flex lg:min-h-screen lg:max-w-[1400px] lg:items-center lg:px-8">

          {/* 视觉层 — 移动端垫底，桌面端右侧 */}
          <div className="col-start-1 row-start-1 flex items-start justify-center pt-14
                          lg:order-2 lg:w-[55%] lg:items-center lg:pt-0">
            <HeroVisual />
          </div>

          {/* 文字层 — 移动端浮于图片之上，桌面端左侧 */}
          <div className="col-start-1 row-start-1 z-10 px-5 pb-10 pt-20
                          lg:order-1 lg:w-[45%] lg:px-0 lg:pb-0 lg:pt-0">
            <HeroContent />
          </div>

        </div>
      </section>

      <TopCards />
      <ContentSection posts={posts} reading={reading} />
      <LearningLog notes={notes} />
      <TimelineSection />

    </main>
  );
}
