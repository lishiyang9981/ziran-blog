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
            ITBP · 探索者 · 建设者。用代码构建系统，用思考理解世界，在技术与哲学之间寻找更深层的确定性。
          </p>
          <p>
            专注于数据工程、AI 应用与认知成长。这里是我的数字花园，记录探索的轨迹与思考的沉淀。
          </p>
        </div>
      </div>
    </main>
  );
}
