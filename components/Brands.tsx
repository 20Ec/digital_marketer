import Image from "next/image";
import { portfolio } from "@/data/portfolio";

export function Brands() {
  return (
    <section id="brands" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#00C853]">
            Brand Experience
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Brands I&apos;ve worked with
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            A few of the brands I&apos;ve supported with digital marketing and social media.
          </p>
        </div>

        <ul className="motion-grid mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {portfolio.brands.map((brand) => (
            <li
              key={brand.name}
              className="motion-card flex min-h-72 flex-col items-center justify-center rounded-[24px] border border-slate-200 bg-[#F7F8FA] p-6 text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-32 w-full items-center justify-center rounded-2xl bg-white p-4">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={1200}
                  height={800}
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 20vw"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="mt-4">
                <p className="text-sm font-semibold text-slate-800">{brand.name}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{brand.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
