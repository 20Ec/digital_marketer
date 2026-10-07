import Link from "next/link";
import { portfolio } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="bg-[#0f172a] py-10 text-slate-200">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 text-center sm:px-6 lg:px-8">
        <div>
          <p className="text-xl font-bold text-white">{portfolio.personal.name}</p>
          <p className="mt-2 text-sm text-slate-300">{portfolio.personal.designation}</p>
        </div>

        <div className="flex justify-center gap-4 text-sm">
          <Link href={portfolio.personal.linkedinUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#FFCC00]">
            LinkedIn
          </Link>
          <Link href={portfolio.personal.youtubeUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#FFCC00]">
            YouTube
          </Link>
          <Link href={portfolio.personal.whatsappHref} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#FFCC00]">
            WhatsApp
          </Link>
        </div>

        <p className="text-sm text-slate-400">© 2026 Rajadurai Annadurai. All rights reserved.</p>
      </div>
    </footer>
  );
}
