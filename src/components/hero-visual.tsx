"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════
   暗色主题：紫色星球
═══════════════════════════════════════════════ */
function PlanetScene() {
  return (
    <div className="relative h-[580px] w-[580px]">
      <div className="absolute inset-0 animate-glow rounded-full bg-purple-600/10 blur-3xl" />

      <svg className="absolute inset-0 z-0 h-full w-full" viewBox="0 0 580 580" fill="none">
        <path d="M 38,305 A 252,64 -8 0 1 542,305"
          stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
      </svg>

      <div
        className="absolute inset-[58px] z-10 rounded-full"
        style={{
          background: "radial-gradient(circle at 28% 68%, rgba(168,85,247,0.55) 0%, rgba(59,130,246,0.16) 26%, rgba(5,5,5,0.97) 60%)",
          boxShadow: "0 0 100px rgba(168,85,247,0.18), inset 0 0 80px rgba(0,0,0,0.5)",
        }}
      />
      <div
        className="absolute inset-[58px] z-10 rounded-full"
        style={{
          background: "radial-gradient(ellipse at 20% 74%, rgba(168,85,247,0.65) 0%, transparent 42%)",
          filter: "blur(18px)",
          mixBlendMode: "screen",
        }}
      />

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
   花瓣数据：从花束顶部散落
═══════════════════════════════════════════════ */
const PETALS = [
  { x: 148, y: 68,  w: 9,  h: 15, dur: 4.8, delay: 0,   drift: 22,  spin: 185, color: "rgba(255,192,203,0.92)" },
  { x: 205, y: 82,  w: 7,  h: 12, dur: 5.3, delay: 0.8, drift: -18, spin: 225, color: "rgba(255,220,228,0.88)" },
  { x: 272, y: 60,  w: 11, h: 18, dur: 4.5, delay: 1.5, drift: 28,  spin: 160, color: "rgba(255,255,255,0.90)" },
  { x: 338, y: 75,  w: 8,  h: 13, dur: 5.7, delay: 0.3, drift: -24, spin: 210, color: "rgba(253,210,215,0.88)" },
  { x: 395, y: 88,  w: 6,  h: 10, dur: 4.2, delay: 2.0, drift: 18,  spin: 245, color: "rgba(255,192,203,0.82)" },
  { x: 178, y: 108, w: 10, h: 16, dur: 5.9, delay: 1.0, drift: -14, spin: 175, color: "rgba(255,228,232,0.90)" },
  { x: 435, y: 72,  w: 8,  h: 14, dur: 4.9, delay: 2.4, drift: 32,  spin: 200, color: "rgba(255,255,255,0.85)" },
  { x: 245, y: 93,  w: 7,  h: 11, dur: 5.1, delay: 1.2, drift: -20, spin: 215, color: "rgba(255,192,203,0.90)" },
  { x: 358, y: 102, w: 12, h: 19, dur: 6.0, delay: 0.5, drift: 16,  spin: 165, color: "rgba(253,215,215,0.82)" },
  { x: 132, y: 118, w: 6,  h: 10, dur: 4.6, delay: 2.9, drift: -28, spin: 235, color: "rgba(255,220,228,0.86)" },
  { x: 462, y: 85,  w: 9,  h: 15, dur: 5.4, delay: 1.7, drift: 20,  spin: 190, color: "rgba(255,255,255,0.88)" },
  { x: 306, y: 63,  w: 8,  h: 13, dur: 5.5, delay: 0.2, drift: -16, spin: 208, color: "rgba(255,192,203,0.88)" },
  { x: 415, y: 112, w: 7,  h: 11, dur: 4.4, delay: 2.2, drift: 25,  spin: 178, color: "rgba(253,213,213,0.84)" },
  { x: 162, y: 78,  w: 10, h: 16, dur: 5.8, delay: 1.4, drift: -10, spin: 220, color: "rgba(255,228,232,0.90)" },
  { x: 288, y: 118, w: 6,  h: 10, dur: 4.7, delay: 3.1, drift: 30,  spin: 195, color: "rgba(255,255,255,0.80)" },
  { x: 492, y: 96,  w: 8,  h: 13, dur: 5.2, delay: 0.9, drift: -22, spin: 240, color: "rgba(255,192,203,0.85)" },
] as const;

/* ═══════════════════════════════════════════════
   亮色主题：花束 + 散落花瓣
═══════════════════════════════════════════════ */
function FlowerScene() {
  return (
    <div className="relative h-[580px] w-[580px]">

      {/* 粉 + 天蓝漫射光晕 */}
      <div
        className="absolute inset-0 animate-glow rounded-full"
        style={{
          background: "radial-gradient(ellipse at 55% 38%, rgba(255,195,195,0.32) 0%, rgba(130,200,255,0.18) 52%, transparent 74%)",
          filter: "blur(38px)",
        }}
      />

      {/* 柔光 halo —— 衬在花束后，让边缘自然融入背景 */}
      <div
        className="absolute inset-[40px] z-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 50% 48%, rgba(255,205,205,0.34) 38%, rgba(130,200,255,0.16) 60%, transparent 76%)",
          filter: "blur(26px)",
        }}
      />

      {/* 花束圆形主体（径向遮罩 → 边缘渐隐，不再有生硬圆环）*/}
      <div
        className="absolute inset-[58px] z-10 overflow-hidden rounded-full"
        style={{
          maskImage: "radial-gradient(circle at 50% 50%, #000 56%, rgba(0,0,0,0.5) 70%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, #000 56%, rgba(0,0,0,0.5) 70%, transparent 80%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-flowers.jpg"
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: "center 30%" }}
        />
      </div>

      {/* 散落花瓣（framer-motion 无限循环下落）*/}
      {PETALS.map((p, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.w,
            height: p.h,
            backgroundColor: p.color,
            borderRadius: "50%",
            zIndex: 30,
            pointerEvents: "none",
          }}
          animate={{
            y:       [0, 510],
            x:       [0, p.drift],
            rotate:  [0, p.spin],
            opacity: [0, 0.9, 0.85, 0.6, 0],
          }}
          transition={{
            duration: p.dur,
            delay:    p.delay,
            repeat:   Infinity,
            ease:     "linear",
          }}
        />
      ))}

      {/* 漂浮微粒（花粉感光点）*/}
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
  /* 始终以固定初始值渲染，避免 SSR(暗色) 与客户端(可能已是亮色) 的水合不匹配；
     真实主题在挂载后由 effect 读取并切换 */
  const [mounted, setMounted] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsLight(root.getAttribute("data-theme") === "light");
    update();
    setMounted(true);
    const obs = new MutationObserver(update);
    obs.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  /* 挂载前渲染等尺寸占位：服务端与首屏客户端一致，挂载后再淡入正确场景 */
  if (!mounted) {
    return <div className="h-[580px] w-[580px]" aria-hidden />;
  }

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
