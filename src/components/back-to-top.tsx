"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          transition={{ duration: 0.25 }}
          onClick={scrollTop}
          aria-label="回到顶部"
          className="fixed bottom-6 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.06] text-zinc-400 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-200 hover:border-white/20 hover:text-white xl:hidden"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
