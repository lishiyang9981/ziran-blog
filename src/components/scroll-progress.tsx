"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-[200] h-[2px]"
      style={{
        width: `${progress}%`,
        transition: "width 60ms linear",
        background: `linear-gradient(to right, rgba(var(--accent-rgb),1), rgba(var(--accent-rgb),0.6))`,
      }}
    />
  );
}
