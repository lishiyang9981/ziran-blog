#!/usr/bin/env node
/* ────────────────────────────────────────────────────────────
   博客内容自动同步
   监听 content/ 与 public/images/ 目录，文件变动（新增/修改/删除）后
   防抖一段时间，自动 git add → commit → push，免去手动提交。
   （Keystatic 上传的正文图/封面会落到 public/images/，所以一并纳入）

   用法：
     pnpm autosync                      # 正常运行（会真的提交并推送）
     AUTOSYNC_DRY_RUN=1 pnpm autosync   # 演练，只打印不提交
   可选环境变量：
     AUTOSYNC_DEBOUNCE=6000     # 防抖毫秒数（默认 6000）
     AUTOSYNC_BRANCH=main       # 推送分支（默认 main）

   说明：基于 fs.watch 的 recursive 模式（macOS / Windows 支持）。
──────────────────────────────────────────────────────────── */

import { watch, existsSync } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

const run = promisify(execFile);

const ROOT = process.cwd();
const WATCH_DIRS = ["content", "public/images"];
const DEBOUNCE_MS = Number(process.env.AUTOSYNC_DEBOUNCE ?? 6000);
const BRANCH = process.env.AUTOSYNC_BRANCH ?? "main";
const DRY_RUN = process.env.AUTOSYNC_DRY_RUN === "1";

const log = (...a) => console.log("\x1b[36m[autosync]\x1b[0m", ...a);
const err = (...a) => console.error("\x1b[31m[autosync]\x1b[0m", ...a);

let timer = null;
let running = false;
let queued = false;

async function git(args) {
  const { stdout } = await run("git", args, { cwd: ROOT });
  return stdout;
}

async function sync() {
  if (running) { queued = true; return; }
  running = true;
  try {
    const status = (await git(["status", "--porcelain", "--", ...WATCH_DIRS])).trim();
    if (!status) { log("无改动，跳过"); return; }

    const files = status
      .split("\n")
      .map((l) => l.slice(3).replace(/^.* -> /, "")); // 去掉 XY 状态位、处理重命名
    const names = files.map((f) => path.basename(f));
    const summary =
      names.slice(0, 4).join("、") + (names.length > 4 ? ` 等 ${names.length} 项` : "");
    const ts = new Date().toLocaleString("zh-CN", { hour12: false });
    const msg = `content: 自动同步 ${summary}（${ts}）`;

    if (DRY_RUN) {
      log("[演练] 将提交：", msg);
      log("[演练] 变更：\n" + status);
      return;
    }

    await git(["add", "--", ...WATCH_DIRS]);
    await git(["commit", "-m", msg]);
    log("已提交：", msg);
    await git(["push", "origin", BRANCH]);
    log(`已推送到 origin/${BRANCH} ✓`);
  } catch (e) {
    err("同步失败：", (e.stderr || e.message || e).toString().trim());
    err("（本地提交可能已生成，下次变动会一并推送；也可手动 git push）");
  } finally {
    running = false;
    if (queued) { queued = false; schedule(); }
  }
}

function schedule() {
  if (timer) clearTimeout(timer);
  timer = setTimeout(sync, DEBOUNCE_MS);
}

log(
  `开始监听 ${WATCH_DIRS.join("、")}/（防抖 ${DEBOUNCE_MS}ms，分支 ${BRANCH}` +
    (DRY_RUN ? "，演练模式" : "") +
    "）"
);
log("按 Ctrl+C 停止");

for (const rel of WATCH_DIRS) {
  const dir = path.join(ROOT, rel);
  if (!existsSync(dir)) continue;
  watch(dir, { recursive: true }, (_event, filename) => {
    if (!filename) return;
    const base = path.basename(filename);
    if (base === ".DS_Store" || base.endsWith("~") || base.startsWith(".")) return;
    log(`检测到变更：${rel}/${filename}`);
    schedule();
  });
}
