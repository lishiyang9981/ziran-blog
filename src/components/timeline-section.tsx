import { Rss, Mail } from "lucide-react";

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIAL = [
  { icon: GithubIcon, href: "https://github.com",    label: "GitHub" },
  { icon: XIcon,      href: "https://twitter.com",   label: "X / Twitter" },
  { icon: Rss,        href: "/feed.xml",             label: "RSS" },
  { icon: Mail,       href: "mailto:hi@ziran.dev",   label: "Email" },
];

export function TimelineSection() {
  return (
    <section className="relative z-10 mx-auto max-w-[1400px] px-8 pb-8">

      {/* Quote */}
      <div className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.02] px-8 py-20 text-center backdrop-blur">
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/[0.07] blur-3xl" />
        <div className="relative z-10">
          <p className="text-xl text-zinc-600">「</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-[28px] font-medium leading-[1.75] text-zinc-200">
            一切有为法，如梦幻泡影，
            <br />
            如露亦如电，应作如是观。
          </h2>
          <p className="mt-6 text-sm text-zinc-600">— 《金刚经》</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="pb-10 pt-12">
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/[0.07] pt-8 sm:flex-row">

          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-zinc-300">
              Ricoui
            </p>
            <p className="mt-1 text-xs text-zinc-600">
              持续探索技术与认知的边界
            </p>
          </div>

          <div className="flex items-center gap-5">
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="text-zinc-600 transition hover:text-white"
              >
                <Icon />
              </a>
            ))}
          </div>

          <p className="text-xs text-zinc-600">
            © 2026 Ricoui. All rights reserved.
          </p>

        </div>
      </footer>

    </section>
  );
}
