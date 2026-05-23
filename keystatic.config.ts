import { config, fields, collection } from "@keystatic/core";

/* ────────────────────────────────────────────────
   Keystatic 可视化内容管理（本地模式 / 单人）
   - 直接读写 content/ 下的 .mdx 文件
   - 在本机 http://localhost:3000/keystatic 编辑，写完照常 git push
   - 后台仅本地可用：生产环境由 middleware 屏蔽（见 src/middleware.ts）
──────────────────────────────────────────────── */

export default config({
  storage: { kind: "local" },

  ui: {
    brand: { name: "CWR&L 博客后台" },
    navigation: {
      内容: ["blog", "notes"],
    },
  },

  collections: {
    /* ── 技术文章 → content/blog/*.mdx ── */
    blog: collection({
      label: "文章",
      slugField: "title",
      path: "content/blog/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: { label: "标题", validation: { isRequired: true } },
          slug: {
            label: "URL 路径",
            description:
              "英文短横线，用作文件名与文章链接（如 my-first-post）",
          },
        }),
        date: fields.date({
          label: "发布日期",
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: "摘要",
          multiline: true,
          description: "列表与卡片上展示的一句话简介",
        }),
        tags: fields.array(fields.text({ label: "标签" }), {
          label: "标签",
          itemLabel: (props) => props.value || "标签",
        }),
        cover: fields.text({
          label: "封面图（可选）",
          description: "图片路径，如 /images/xxx.jpg；留空则用渐变占位",
        }),
        content: fields.mdx({ label: "正文" }),
      },
    }),

    /* ── 学习日志 → content/notes/*.mdx ── */
    notes: collection({
      label: "日志",
      slugField: "title",
      path: "content/notes/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: { label: "标题", validation: { isRequired: true } },
          slug: {
            label: "URL 路径",
            description: "英文短横线，用作文件名与链接",
          },
        }),
        date: fields.date({
          label: "日期",
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: "摘要",
          multiline: true,
        }),
        tags: fields.array(fields.text({ label: "标签" }), {
          label: "标签",
          itemLabel: (props) => props.value || "标签",
        }),
        content: fields.mdx({ label: "正文" }),
      },
    }),
  },
});
