import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { LocalVideoUploader } from "@/components/LocalVideoUploader";
import { isLocalDevelopmentHost } from "@/lib/local-video-upload";

export default async function LocalVideoUploadPage() {
  const requestHeaders = await headers();

  if (!isLocalDevelopmentHost(requestHeaders.get("host"))) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F7F8FA] px-4 py-16 text-[#1A2238] sm:px-6">
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#00C853]">
          Local development tool
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          Upload a portfolio video
        </h1>
        <p className="mt-4 leading-7 text-slate-600">
          Choose an MP4 or WebM video to upload it to your Cloudinary account and add it to the
          portfolio. This page only works on your local development server.
        </p>
        <LocalVideoUploader />
      </div>
    </main>
  );
}
