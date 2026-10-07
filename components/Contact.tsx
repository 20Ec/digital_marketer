import { portfolio } from "@/data/portfolio";

const socialLinks = [
  {
    name: "Instagram",
    description: "Follow my updates",
    href: portfolio.personal.instagramUrl,
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    name: "YouTube",
    description: "Watch my videos",
    href: portfolio.personal.youtubeUrl,
    icon: <path d="M21.6 7.2a2.9 2.9 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.9 2.9 0 0 0-2 2A30 30 0 0 0 2 12a30 30 0 0 0 .4 4.8 2.9 2.9 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.9 2.9 0 0 0 2-2A30 30 0 0 0 22 12a30 30 0 0 0-.4-4.8ZM10 15.2V8.8l5.5 3.2-5.5 3.2Z" fill="currentColor" stroke="none" />,
  },
  {
    name: "LinkedIn",
    description: "Connect with me",
    href: portfolio.personal.linkedinUrl,
    icon: (
      <>
        <path d="M5 9v10M5 5v.01M9 19v-6a4 4 0 0 1 8 0v6M9 9v10" />
      </>
    ),
  },
  {
    name: "WhatsApp",
    description: "Let’s have a chat",
    href: portfolio.personal.whatsappHref,
    icon: (
      <>
        <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" />
        <path d="M9 9.5c.4 2 2 3.6 4 4l1-1 2 1c-.5 1.5-1.5 2-3 1.5-2.5-.8-4.2-2.5-5-5-.5-1.5 0-2.5 1.5-3l1 2-1.5.5Z" />
      </>
    ),
  },
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 bg-[#1A2238] py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#FFCC00]">Let&apos;s Connect</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Let&apos;s connect on social media.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300">
            Follow my work, watch my videos, or send me a message.
          </p>
        </div>

        <div className="motion-grid mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="motion-card group rounded-[24px] border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FFCC00]/60 hover:bg-white/10 hover:shadow-[0_18px_40px_-24px_rgba(255,204,0,0.55)]"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#FFCC00] transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#FFCC00] group-hover:text-[#1A2238]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-7 w-7"
                  aria-hidden="true"
                >
                  {social.icon}
                </svg>
              </span>
              <p className="mt-5 text-lg font-semibold text-white">{social.name}</p>
              <p className="mt-1 text-sm text-slate-300">{social.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#FFCC00]">
                Visit profile <span aria-hidden="true">↗</span>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={portfolio.personal.phoneHref}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10"
          >
            Call {portfolio.personal.phone}
          </a>
          <a
            href={portfolio.personal.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#00C853] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0dbb5a]"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
