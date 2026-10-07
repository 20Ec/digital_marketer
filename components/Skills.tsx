import { portfolio } from "@/data/portfolio";

const skillGroups = [
  { title: "Social Media", items: portfolio.skills.social },
  { title: "Content", items: portfolio.skills.content },
  { title: "Analytics", items: portfolio.skills.analytics },
  { title: "Marketing", items: portfolio.skills.marketing },
];

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#00C853]">Skills</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Core strengths for digital content and growth.
          </h2>
        </div>

        <div className="motion-grid mt-12 grid gap-6 lg:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.title} className="motion-card rounded-[28px] border border-slate-200 bg-[#F7F8FA] p-6">
              <h3 className="text-xl font-bold text-slate-900">{group.title}</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
