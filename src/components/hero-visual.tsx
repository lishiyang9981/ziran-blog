"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════
   暗色主题：紫色星球
═══════════════════════════════════════════════ */
function PlanetScene() {
  return (
    <div className="relative h-[580px] w-[580px]">
      {/* Ambient glow */}
      <div className="absolute inset-0 animate-glow rounded-full bg-purple-600/10 blur-3xl" />

      {/* Back ring arc */}
      <svg className="absolute inset-0 z-0 h-full w-full" viewBox="0 0 580 580" fill="none">
        <path d="M 38,305 A 252,64 -8 0 1 542,305"
          stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
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
          <linearGradient id="ringFrontDark" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="white" stopOpacity="0" />
            <stop offset="28%"  stopColor="white" stopOpacity="0.62" />
            <stop offset="62%"  stopColor="rgb(168,85,247)" stopOpacity="0.42" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M 38,305 A 252,64 -8 0 0 542,305"
          stroke="url(#ringFrontDark)" strokeWidth="2" />
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
  );
}

/* ═══════════════════════════════════════════════
   亮色主题：花束场景
═══════════════════════════════════════════════ */
function FlowerScene() {
  return (
    <div className="relative h-[580px] w-[580px]">

      {/* 粉色 + 天蓝漫射光晕 */}
      <div
        className="absolute inset-0 animate-glow rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at 55% 38%, rgba(255,195,195,0.3) 0%, rgba(130,200,255,0.18) 50%, transparent 72%)",
          filter: "blur(38px)",
        }}
      />

      {/* 花束圆形主体 */}
      <div
        className="absolute inset-[58px] z-10 overflow-hidden rounded-full"
        style={{
          boxShadow:
            "0 0 60px rgba(210,160,160,0.35), 0 0 120px rgba(130,200,255,0.2), inset 0 -30px 60px rgba(242,245,239,0.25)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-flowers.jpg"
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: "center 30%" }}
        />
        {/* 底边渐隐，融入页面背景色 */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background:
              "linear-gradient(to top, rgba(242,245,239,0.7) 0%, transparent 100%)",
          }}
        />
        {/* 顶边极淡遮罩，过渡更自然 */}
        <div
          className="absolute left-0 right-0 top-0 h-16"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* 装饰轨道环：粉→天蓝渐变 */}
      <svg className="absolute inset-0 z-20 h-full w-full" viewBox="0 0 580 580" fill="none">
        <defs>
          <linearGradient id="flowerRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="rgba(210,165,165,0)" />
            <stop offset="28%"  stopColor="rgba(210,165,165,0.5)" />
            <stop offset="65%"  stopColor="rgba(130,200,255,0.35)" />
            <stop offset="100%" stopColor="rgba(210,165,165,0)" />
          </linearGradient>
        </defs>
        <path
          d="M 38,305 A 252,64 -8 0 0 542,305"
          stroke="url(#flowerRingGrad)"
          strokeWidth="2.5"
        />
      </svg>

      {/* 漂浮光粒：粉色 + 天蓝，模拟花粉微尘 */}
      {([
        [28,75],[555,145],[475,448],[88,395],
        [298,28],[148,195],[515,275],[60,260],
        [510,380],[330,540],[420,90],[200,490],
      ] as [number,number][]).map(([x,y],i) => (
        <div
          key={i}
          className="star absolute rounded-full"
          style={{
            left: x, top: y, width: 3, height: 3,
            animationDelay: `${i * 0.4}s`,
            backgroundColor: i % 2 === 0
              ? "rgba(220,155,155,0.65)"
              : "rgba(120,195,255,0.5)",
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   主组件：监听主题，平滑切换两个场景
═══════════════════════════════════════════════ */
export function HeroVisual() {
  const [isLight, setIsLight] = useState(() => {
    // 避免首屏闪烁：同步读取已由内联脚本设置好的 data-theme
    if (typeof window !== "undefined") {
      return document.documentElement.getAttribute("data-theme") === "light";
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsLight(root.getAttribute("data-theme") === "light");
    update();
    const obs = new MutationObserver(update);
    obs.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLight ? (
        <motion.div
          key="flower"
          initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1,    filter: "blur(0px)"  }}
          exit={{    opacity: 0, scale: 0.92, filter: "blur(10px)" }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <FlowerScene />
        </motion.div>
      ) : (
        <motion.div
          key="planet"
          initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1,    filter: "blur(0px)"  }}
          exit={{    opacity: 0, scale: 0.92, filter: "blur(10px)" }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <PlanetScene />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
