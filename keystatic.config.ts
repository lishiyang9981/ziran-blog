import { config, fields, collection } from "@keystatic/core";

/* ────────────────────────────────────────────────
   Keystatic 可视化内容管理（本地模式 / 单人）
   - 直接读写 content/ 下的 .mdx 文件
   - 在本机 http://localhost:3000/keystatic 编辑，写完照常 git push
   - 后台仅本地可用：生产环境由 middleware 屏蔽（见 src/middleware.ts）

   图片：正文与封面里上传的图片都存到 public/images/<板块>/，
   并以 /images/<板块>/... 的绝对路径写入，确保页面能正常显示。
──────────────────────────────────────────────── */

export default config({
  storage: { kind: "local" },

  ui: {
    brand: { name: "CWR&L 博客后台" },
    navigation: {
      内容: ["blog", "notes", "reading", "life"],
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
        cover: fields.image({
          label: "封面图（可选）",
          description: "点击上传；留空则用渐变占位",
          directory: "public/images/blog/covers",
          publicPath: "/images/blog/covers",
        }),
        content: fields.mdx({
          label: "正文",
          options: {
            image: {
              directory: "public/images/blog",
              publicPath: "/images/blog",
            },
          },
        }),
      },
    }),

    /* ── 随笔（随想碎思）→ content/notes/*.mdx ── */
    notes: collection({
      label: "随笔",
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
        content: fields.mdx({
          label: "正文",
          options: {
            image: {
              directory: "public/images/notes",
              publicPath: "/images/notes",
            },
          },
        }),
      },
    }),

    /* ── 读书 → content/reading/*.mdx ── */
    reading: collection({
      label: "读书",
      slugField: "title",
      path: "content/reading/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: { label: "书名 / 标题", validation: { isRequired: true } },
          slug: {
            label: "URL 路径",
            description: "英文短横线，用作文件名与链接",
          },
        }),
        date: fields.date({ label: "日期", validation: { isRequired: true } }),
        description: fields.text({ label: "摘要", multiline: true }),
        tags: fields.array(fields.text({ label: "标签" }), {
          label: "标签",
          itemLabel: (props) => props.value || "标签",
        }),
        cover: fields.image({
          label: "封面图（可选）",
          description: "点击上传书封或配图",
          directory: "public/images/reading/covers",
          publicPath: "/images/reading/covers",
        }),
        content: fields.mdx({
          label: "正文",
          options: {
            image: {
              directory: "public/images/reading",
              publicPath: "/images/reading",
            },
          },
        }),
      },
    }),

    /* ── 生活 → content/life/*.mdx ── */
    life: collection({
      label: "生活",
      slugField: "title",
      path: "content/life/*",
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
        date: fields.date({ label: "日期", validation: { isRequired: true } }),
        description: fields.text({ label: "摘要", multiline: true }),
        tags: fields.array(fields.text({ label: "标签" }), {
          label: "标签",
          itemLabel: (props) => props.value || "标签",
        }),
        cover: fields.image({
          label: "配图（可选）",
          description: "点击上传",
          directory: "public/images/life/covers",
          publicPath: "/images/life/covers",
        }),
        content: fields.mdx({
          label: "正文",
          options: {
            image: {
              directory: "public/images/life",
              publicPath: "/images/life",
            },
          },
        }),
      },
    }),
  },
});
