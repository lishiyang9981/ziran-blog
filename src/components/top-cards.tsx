"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FileText, BookOpen, FolderOpen, FlaskConical } from "lucide-react";

const CARDS = [
  {
    title: "文章",
    desc: "技术文章与思考笔记",
    icon: FileText,
    glow: "from-blue-500/20 to-cyan-500/10",
    href: "/blog",
  },
  {
    title: "学习日志",
    desc: "记录每一次学习与成长",
    icon: BookOpen,
    glow: "from-green-500/20 to-emerald-500/10",
    href: "/notes",
  },
  {
    title: "项目",
    desc: "一些有趣的尝试与实践",
    icon: FolderOpen,
    glow: "from-purple-500/20 to-fuchsia-500/10",
    href: "/projects",
  },
  {
    title: "AI Lab",
    desc: "探索 AI 与未来的可能性",
    icon: FlaskConical,
    glow: "from-pink-500/20 to-purple-500/10",
    href: "/lab",
  },
];

function TiltCard({
  title,
  desc,
  icon: Icon,
  glow,
  href,
  index,
}: (typeof CARDS)[0] & { index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-80, 80], [5, -5]);
  const rotateY = useTransform(x, [-80, 80], [-5, 5]);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        href={href}
        className="group relative block overflow-hidden rounded-[22px] border border-white/[0.07] bg-white/[0.02] p-6 backdrop-blur transition-all duration-300 hover:border-white/12"
      >
        <div
          className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br ${glow}`}
        />
        <div className="relative z-10 mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/30">
          <Icon
            className="h-[18px] w-[18px] text-zinc-500 transition duration-300 group-hover:text-zinc-200"
            strokeWidth={1.5}
          />
        </div>
        <h3 className="relative z-10 text-[17px] font-semibold text-white">
          {title}
        </h3>
        <p className="relative z-10 mt-1.5 text-sm leading-6 text-zinc-500">
          {desc}
        </p>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-700 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-zinc-400">
          →
        </div>
      </Link>
    </motion.div>
  );
}

export function TopCards() {
  return (
    <section className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 gap-4 px-8 pb-6 md:grid-cols-4">
      {CARDS.map((card, i) => (
        <TiltCard key={card.title} {...card} index={i} />
      ))}
    </section>
  );
}
