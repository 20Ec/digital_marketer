import Link from "next/link";
import Image from "next/image";
import { portfolio } from "@/data/portfolio";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#F7F8FA]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,204,0,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(0,200,83,0.13),_transparent_30%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-24">
        <div className="hero-copy flex flex-col justify-center">
          <span className="mb-4 inline-flex w-fit rounded-full border border-[#FFCC00]/50 bg-[#FFCC00]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
            {portfolio.hero.label}
          </span>

          <h1 className="max-w-xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-7xl">
            {portfolio.hero.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            {portfolio.hero.description}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#experience"
              className="inline-flex items-center justify-center rounded-full bg-[#1A2238] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
            >
              View My Work
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400"
            >
              Let&apos;s Connect
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-slate-500">Follow:</span>
            <a
              href={portfolio.personal.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-bold text-slate-800 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-100"
              aria-label="LinkedIn"
            >
              in
            </a>
            <a
              href={portfolio.personal.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-[#FF0000] transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-100"
              aria-label="YouTube"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
              </svg>
            </a>
            <a
              href={portfolio.personal.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-[#25D366] transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-100"
              aria-label="WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.9L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.3h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.1-1.2-6.1-3.5-8.3ZM12.2 21.6a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.3-.4a9.8 9.8 0 1 1 8.5 4.7Zm5.4-7.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.6-1.8-1.8-2.1-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.2.2 2.2 3.4 5.4 4.7.8.3 1.4.5 1.8.6.8.3 1.5.2 2 .1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4Z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="hero-profile w-full max-w-md overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)]">
            <div className="relative aspect-square bg-[#FFCC00]">
              <Image
                src="/images/profile/rajadurai.png"
                alt="Rajadurai Annadurai, digital marketing executive"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-2 p-4 sm:p-5">
              <p className="text-xs font-semibold uppercase leading-5 tracking-[0.12em] text-[#00C853]">
                Social Media Marketer
              </p>
              <p className="break-words text-lg font-bold leading-tight text-slate-900 sm:text-xl">
                {portfolio.personal.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
