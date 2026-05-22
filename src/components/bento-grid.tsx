export function BentoGrid() {
  return (
    <section className="relative z-10 mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 px-6 pb-32 md:grid-cols-3">

      {/* AI Lab */}
      <div
        className="
          group
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-white/[0.03]
          p-8
          backdrop-blur-xl
          transition-all
          duration-500
          hover:-translate-y-2
          hover:border-purple-500/30
          hover:bg-white/[0.05]
          md:col-span-2
        "
      >

        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">

          <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />

        </div>

        <div className="relative z-10">

          <div className="mb-6 h-12 w-12 rounded-2xl border border-white/10 bg-white/5" />

          <h3 className="text-2xl font-semibold text-white">
            AI Lab
          </h3>

          <p className="mt-4 leading-7 text-zinc-400">
            探索 AI Agent、AIGC 与未来工作流。
          </p>

        </div>

      </div>

      {/* Articles */}
      <div
        className="
          group
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-white/[0.03]
          p-8
          backdrop-blur-xl
          transition-all
          duration-500
          hover:-translate-y-2
          hover:border-purple-500/30
          hover:bg-white/[0.05]
        "
      >

        <div className="relative z-10">

          <div className="mb-6 h-12 w-12 rounded-2xl border border-white/10 bg-white/5" />

          <h3 className="text-2xl font-semibold text-white">
            Articles
          </h3>

          <p className="mt-4 leading-7 text-zinc-400">
            记录 Spark、SQL、BI 与数据实践。
          </p>

        </div>

      </div>

      {/* Notes */}
      <div
        className="
          group
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-white/[0.03]
          p-8
          backdrop-blur-xl
          transition-all
          duration-500
          hover:-translate-y-2
          hover:border-purple-500/30
          hover:bg-white/[0.05]
        "
      >

        <div className="relative z-10">

          <div className="mb-6 h-12 w-12 rounded-2xl border border-white/10 bg-white/5" />

          <h3 className="text-2xl font-semibold text-white">
            Notes
          </h3>

          <p className="mt-4 leading-7 text-zinc-400">
            学习日志、思考与长期成长轨迹。
          </p>

        </div>

      </div>

      {/* Thinking */}
      <div
        className="
          group
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-white/[0.03]
          p-8
          backdrop-blur-xl
          transition-all
          duration-500
          hover:-translate-y-2
          hover:border-purple-500/30
          hover:bg-white/[0.05]
          md:col-span-2
        "
      >

        <div className="relative z-10">

          <div className="mb-6 h-12 w-12 rounded-2xl border border-white/10 bg-white/5" />

          <h3 className="text-2xl font-semibold text-white">
            Thinking
          </h3>

          <p className="mt-4 leading-7 text-zinc-400">
            关于科技、认知与未来的持续探索。
          </p>

        </div>

      </div>

    </section>
  );
}