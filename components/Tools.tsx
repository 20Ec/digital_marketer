import { portfolio } from "@/data/portfolio";

export function Tools() {
  return (
    <section id="tools" className="scroll-mt-24 bg-[#F7F8FA] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#00C853]">Tools</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Tools used for content creation, publishing and performance review.
          </h2>
        </div>

        <div className="motion-grid mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {portfolio.tools.map((tool) => (
            <div
              key={tool}
              className="motion-card rounded-[20px] border border-slate-200 bg-white px-4 py-5 text-center text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#FFCC00] hover:bg-[#FFF8D7]"
            >
              {tool}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
