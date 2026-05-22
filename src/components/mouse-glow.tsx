"use client";

import { useEffect, useState } from "react";

export function MouseGlow() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const move = (e: MouseEvent) =>
      setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30"
      style={{
        background: `radial-gradient(520px circle at ${pos.x}px ${pos.y}px, rgba(var(--accent-rgb),0.08), transparent 40%)`,
        transition: "background 0.1s ease",
      }}
    />
  );
}
