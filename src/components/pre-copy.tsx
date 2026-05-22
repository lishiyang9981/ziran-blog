"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

function extractText(node: unknown): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node && typeof node === "object" && "props" in node) {
    const n = node as { props?: { children?: unknown } };
    return extractText(n.props?.children);
  }
  return "";
}

export function PreCopy({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = extractText(children);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative">
      <pre {...props}>{children}</pre>
      <button
        onClick={handleCopy}
        aria-label="复制代码"
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-zinc-500 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:border-white/20 hover:text-white"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-400" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}
