import { portfolio } from "@/data/portfolio";

export function Process() {
  return (
    <section id="process" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#00C853]">My Marketing Process</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            From research to optimization, every piece of content has a purpose.
          </h2>
        </div>

        <div className="motion-grid mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {portfolio.process.map((step) => (
            <div key={step.step} className="motion-card rounded-[24px] border border-slate-200 bg-[#F7F8FA] p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between text-sm font-semibold text-slate-500">
                <span>Step</span>
                <span className="text-[#00C853]">{step.step}</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
