import { portfolio } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#00C853]">About Me</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Digital marketing focused on content, growth and platform performance.
          </h2>
        </div>

        <div className="motion-grid mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="motion-card rounded-[28px] border border-slate-200 bg-[#F7F8FA] p-6">
            <div className="rounded-[24px] bg-[#1A2238] p-7 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FFCC00]">Profile</p>
              <div className="mt-6 space-y-3 text-sm text-slate-200">
                <p><span className="font-semibold text-white">Name:</span> {portfolio.personal.name}</p>
                <p><span className="font-semibold text-white">Role:</span> {portfolio.personal.designation}</p>
                <p><span className="font-semibold text-white">Company:</span> {portfolio.personal.currentCompany}</p>
                <p><span className="font-semibold text-white">Location:</span> {portfolio.personal.location}</p>
              </div>
            </div>
          </div>

          <div className="motion-card space-y-5 text-base leading-8 text-slate-600">
            {portfolio.about.text.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
