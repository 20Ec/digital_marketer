import { videos } from "@/data/videos";

export function VideoGallery() {
  return (
    <section id="work" className="scroll-mt-24 bg-[#F7F8FA] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#00C853]">
            My work
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-[#1A2238] sm:text-4xl">
            Selected Work
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            A selection of my video and social media work.
          </p>
        </div>

        {videos.length > 0 ? (
          <div className="motion-grid mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => {
              const aspectClass =
                video.aspectRatio === "4:5" ? "aspect-[4/5]" : "aspect-[9/16]";

              return (
                <article
                  key={video.publicId}
                  className="motion-card overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                >
                  <video
                    className={`${aspectClass} w-full bg-[#1A2238] object-cover`}
                    controls
                    preload="none"
                    playsInline
                    aria-label={video.title}
                  >
                    <source src={video.url} type="video/mp4" />
                    Your browser does not support embedded videos.
                  </video>
                  <h3 className="px-5 py-4 text-lg font-semibold text-[#1A2238]">
                    {video.title}
                  </h3>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="mx-auto mt-10 max-w-2xl rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-8 text-center text-sm leading-6 text-slate-600">
            Videos will appear here after they are uploaded to Cloudinary.
          </p>
        )}
      </div>
    </section>
  );
}
