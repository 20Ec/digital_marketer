import { v2 as cloudinary } from "cloudinary";
import {
  isAllowedLocalUploadRequest,
  requireCloudinaryEnvironmentVariable,
} from "@/lib/local-video-upload";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isAllowedLocalUploadRequest(request)) {
    return Response.json({ error: "This local upload tool is not available here." }, { status: 404 });
  }

  try {
    const cloudName = requireCloudinaryEnvironmentVariable("CLOUDINARY_CLOUD_NAME");
    const apiKey = requireCloudinaryEnvironmentVariable("CLOUDINARY_API_KEY");
    const apiSecret = requireCloudinaryEnvironmentVariable("CLOUDINARY_API_SECRET");
    const timestamp = Math.floor(Date.now() / 1000);
    const paramsToSign = {
      folder: "portfolio/videos",
      timestamp,
    };

    cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret, secure: true });

    return Response.json({
      apiKey,
      cloudName,
      signature: cloudinary.utils.api_sign_request(paramsToSign, apiSecret),
      timestamp,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to prepare the Cloudinary upload.";

    return Response.json({ error: message }, { status: 500 });
  }
}
