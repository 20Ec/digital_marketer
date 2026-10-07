import { portfolio } from "@/data/portfolio";

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-[#F7F8FA] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#00C853]">What I Do</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Social media marketing built around strategy, creativity and growth.
          </h2>
        </div>

        <div className="motion-grid mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {portfolio.services.map((service, index) => (
            <div
              key={service.title}
              className="motion-card group rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFCC00]/15 text-lg font-bold text-slate-900">
                0{index + 1}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
