"use client";

import { useEffect, useRef } from "react";

/* 鼠标特效：
   - 平滑跟随的强调色辉光（rAF 缓动拖尾，苹果式柔和）
   - 点击时在落点泛起一圈涟漪
   主题色自适应（暗紫 / 亮绿）。*/
export function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = { x: -1000, y: -1000 };
    const cur = { x: -1000, y: -1000 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const tick = () => {
      cur.x += (target.x - cur.x) * 0.12;
      cur.y += (target.y - cur.y) * 0.12;
      const el = glowRef.current;
      if (el) {
        el.style.background = `radial-gradient(560px circle at ${cur.x.toFixed(1)}px ${cur.y.toFixed(1)}px, rgba(var(--accent-rgb), 0.07), transparent 42%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onClick = (e: MouseEvent) => {
      const ripple = document.createElement("span");
      ripple.className = "mouse-ripple";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return <div ref={glowRef} className="pointer-events-none fixed inset-0 z-30" />;
}
