import { Navbar } from "@/components/navbar";

const LAB_ITEMS = [
  { title: "RAG 实践笔记",   desc: "构建知识库与问答系统",     status: "进行中" },
  { title: "LLM 应用探索",   desc: "探索大语言模型的应用边界", status: "规划中" },
  { title: "AI 工具评测",    desc: "测评与分享优秀的 AI 工具", status: "规划中" },
  { title: "向量数据库实践",  desc: "探索 embedding 与相似检索", status: "规划中" },
];

export default function LabPage() {
  return (
    <main className="page-bg relative min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* Background grid */}
      <div className="page-grid pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Decorative glows — 科技感青色 */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[300px] w-[300px] translate-x-1/3 rounded-full bg-purple-500/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-[300px] w-[300px] translate-y-1/2 rounded-full bg-blue-500/[0.05] blur-3xl" />

      <Navbar />

      <div className="relative z-10 mx-auto max-w-4xl px-8 pb-24 pt-32">
        <div className="mb-16">
          <p className="mb-3 text-xs tracking-[0.35em] text-zinc-600">AI LAB</p>
          <h1 className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-6xl font-semibold tracking-tight text-transparent">
            实验室
          </h1>
          <p className="mt-4 text-zinc-500">探索 AI 与未来技术的可能性。</p>
        </div>

        {/* Decorative sphere */}
        <div className="relative mb-10 flex h-[200px] items-center justify-center overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm">
          <div className="absolute h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />
          <div
            className="relative h-28 w-28 rounded-full"
            style={{
              background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.92), rgba(168,85,247,0.42), rgba(0,0,0,0.97))",
              boxShadow: "0 0 50px rgba(168,85,247,0.3)",
            }}
          />
          <p className="absolute bottom-5 text-[11px] tracking-[0.25em] text-zinc-600">探索 AI 技术的边界</p>
        </div>

        {/* Lab items */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {LAB_ITEMS.map((item) => (
            <div
              key={item.title}
              className="group rounded-[22px] border border-white/[0.07] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/12 hover:bg-white/[0.04]"
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] ${
                  item.status === "进行中"
                    ? "bg-purple-500/20 text-purple-300"
                    : "border border-white/[0.08] text-zinc-600"
                }`}>
                  {item.status}
                </span>
              </div>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
