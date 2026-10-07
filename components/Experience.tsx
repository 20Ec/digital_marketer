import { portfolio } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 bg-[#F7F8FA] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#00C853]">Experience</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Professional background in digital marketing and social media execution.
          </h2>
        </div>

        <div className="motion-grid mx-auto mt-12 max-w-4xl">
          {portfolio.experience.map((item) => (
            <div key={item.company} className="motion-card relative rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="absolute left-6 top-8 h-full w-px bg-slate-200 sm:left-10" aria-hidden="true" />

              <div className="relative pl-10 sm:pl-12">
                <div className="absolute -left-0.5 top-2 h-4 w-4 rounded-full border-4 border-white bg-[#FFCC00] shadow-sm sm:-left-1" aria-hidden="true" />
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xl font-black text-slate-900">{item.company}</p>
                    <p className="mt-1 text-lg font-semibold text-slate-700">{item.role}</p>
                  </div>
                  <p className="text-sm font-medium text-slate-600">{item.period}</p>
                </div>

                <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-600">
                  {item.responsibilities.map((responsibility) => (
                    <li key={responsibility} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#00C853]" aria-hidden="true" />
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
