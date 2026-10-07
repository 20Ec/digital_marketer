import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { PortfolioVideo } from "@/data/videos";
import {
  isAllowedLocalUploadRequest,
  requireCloudinaryEnvironmentVariable,
} from "@/lib/local-video-upload";

export const runtime = "nodejs";

const manifestPath = path.join(process.cwd(), "data", "videos.json");
const publicIdPrefix = "portfolio/videos/";

export async function POST(request: Request) {
  if (!isAllowedLocalUploadRequest(request)) {
    return Response.json({ error: "This local upload tool is not available here." }, { status: 404 });
  }

  try {
    const cloudName = requireCloudinaryEnvironmentVariable("CLOUDINARY_CLOUD_NAME");
    const body: unknown = await request.json();

    if (!body || typeof body !== "object") {
      return Response.json({ error: "Invalid video details." }, { status: 400 });
    }

    const { publicId, secureUrl, title } = body as Record<string, unknown>;

    if (
      typeof publicId !== "string" ||
      !publicId.startsWith(publicIdPrefix) ||
      typeof secureUrl !== "string" ||
      typeof title !== "string" ||
      !title.trim() ||
      title.length > 120
    ) {
      return Response.json({ error: "Invalid video details." }, { status: 400 });
    }

    const videoUrl = new URL(secureUrl);

    if (
      videoUrl.protocol !== "https:" ||
      videoUrl.hostname !== "res.cloudinary.com" ||
      !videoUrl.pathname.startsWith(`/${cloudName}/video/upload/`)
    ) {
      return Response.json({ error: "The video URL does not match this Cloudinary account." }, { status: 400 });
    }

    const existingVideos: PortfolioVideo[] = JSON.parse(await readFile(manifestPath, "utf8"));
    const video: PortfolioVideo = { publicId, title: title.trim(), url: videoUrl.toString() };
    const updatedVideos = [
      ...existingVideos.filter((existingVideo) => existingVideo.publicId !== video.publicId),
      video,
    ].sort((first, second) => first.title.localeCompare(second.title));

    await writeFile(manifestPath, `${JSON.stringify(updatedVideos, null, 2)}\n`, "utf8");

    return Response.json({ video });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to add the video to the portfolio.";

    return Response.json({ error: message }, { status: 500 });
  }
}
