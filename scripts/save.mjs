#!/usr/bin/env node
/* ────────────────────────────────────────────────────────────
   一键保存：git add -A → commit → push（含代码 + 内容 + 图片）
   适合"改完代码想一次性同步上线"的场景。

   用法：
     pnpm save                 # 自动生成提交信息（含改动文件名+时间）
     pnpm save 改了导航栏配色   # 用自定义提交信息
   可选环境变量：
     SAVE_BRANCH=xxx           # 推送分支（默认=当前分支）
──────────────────────────────────────────────────────────── */

import { execFileSync } from "node:child_process";
import path from "node:path";

const ROOT = process.cwd();

function git(args, opts = {}) {
  return execFileSync("git", args, { cwd: ROOT, ...opts });
}

try {
  const status = git(["status", "--porcelain"]).toString().trim();
  if (!status) {
    console.log("没有需要提交的改动。");
    process.exit(0);
  }

  // 提交信息：优先用命令行参数，否则按改动文件自动生成
  const custom = process.argv.slice(2).join(" ").trim();
  const files = status.split("\n").map((l) => l.slice(3).replace(/^.* -> /, ""));
  const names = files.map((f) => path.basename(f));
  const summary =
    names.slice(0, 5).join("、") + (names.length > 5 ? ` 等 ${names.length} 项` : "");
  const ts = new Date().toLocaleString("zh-CN", { hour12: false });
  const msg = custom || `更新 ${summary}（${ts}）`;

  const branch =
    process.env.SAVE_BRANCH || git(["rev-parse", "--abbrev-ref", "HEAD"]).toString().trim();

  git(["add", "-A"]);
  git(["commit", "-m", msg], { stdio: "inherit" });
  git(["push", "origin", branch], { stdio: "inherit" });
  console.log(`\n✓ 已提交并推送到 origin/${branch}：${msg}`);
} catch (e) {
  console.error("\n保存失败：", (e.stderr || e.message || e).toString().trim());
  console.error("（可手动检查 git 状态后重试）");
  process.exit(1);
}
