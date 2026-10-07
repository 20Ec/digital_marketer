import { existsSync } from "node:fs";
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { v2 as cloudinary } from "cloudinary";

const projectRoot = process.cwd();
const videosDirectory = path.join(projectRoot, "videos");
const manifestPath = path.join(projectRoot, "data", "videos.json");
const supportedExtensions = new Set([".mp4", ".webm"]);

function requireEnvironmentVariable(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name} in .env.local.`);
  }

  return value;
}

function toTitle(filename) {
  return path
    .parse(filename)
    .name.replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toPublicId(filename) {
  const parsed = path.parse(filename);
  const baseName = parsed.name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

  if (!baseName) {
    throw new Error(`Cannot make a Cloudinary ID from "${filename}". Rename the file and try again.`);
  }

  return `${baseName}-${parsed.ext.slice(1).toLowerCase()}`;
}

function uploadLargeVideo(filePath, options) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_large(filePath, options, (error, result) => {
      if (error) {
        reject(error);
      } else if (!result) {
        reject(new Error("Cloudinary returned no upload result."));
      } else {
        resolve(result);
      }
    });
  });
}

function getSafeErrorMessage(error) {
  let message;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "error" in error) {
    const cloudinaryError = error.error;
    message =
      cloudinaryError && typeof cloudinaryError === "object" && "message" in cloudinaryError
        ? cloudinaryError.message
        : undefined;
  } else if (error && typeof error === "object" && "message" in error) {
    message = error.message;
  }

  if (typeof message !== "string" || !message) {
    return "Unexpected Cloudinary error. Check the account settings and try again.";
  }

  return [process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET]
    .filter((credential) => credential)
    .reduce((safeMessage, credential) => safeMessage.split(credential).join("[redacted]"), message);
}

async function main() {
  const envPath = path.join(projectRoot, ".env.local");

  if (!existsSync(envPath)) {
    throw new Error(
      "Create .env.local in the project root with your Cloudinary cloud name, API key, and API secret. See README.md.",
    );
  }

  process.loadEnvFile(envPath);

  cloudinary.config({
    cloud_name: requireEnvironmentVariable("CLOUDINARY_CLOUD_NAME"),
    api_key: requireEnvironmentVariable("CLOUDINARY_API_KEY"),
    api_secret: requireEnvironmentVariable("CLOUDINARY_API_SECRET"),
    secure: true,
  });

  const entries = await readdir(videosDirectory, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort((first, second) => first.localeCompare(second));

  if (files.length === 0) {
    throw new Error("No videos found. Add an .mp4 or .webm file to the videos folder, then try again.");
  }

  const publicIds = files.map(toPublicId);

  if (new Set(publicIds).size !== publicIds.length) {
    throw new Error("Two video filenames produce the same Cloudinary ID. Rename one file and try again.");
  }

  const existingManifest = await readFile(manifestPath, "utf8");
  const existingVideos = JSON.parse(existingManifest);

  if (
    !Array.isArray(existingVideos) ||
    existingVideos.some(
      (video) =>
        !video ||
        typeof video.publicId !== "string" ||
        typeof video.title !== "string" ||
        typeof video.url !== "string",
    )
  ) {
    throw new Error("Could not read the generated video manifest. Restore data/videos.json and try again.");
  }

  const videosById = new Map(existingVideos.map((video) => [video.publicId, video]));

  for (const [index, filename] of files.entries()) {
    const publicId = publicIds[index];
    console.log(`Uploading ${filename}...`);

    const result = await uploadLargeVideo(path.join(videosDirectory, filename), {
      resource_type: "video",
      folder: "portfolio/videos",
      public_id: publicId,
      overwrite: true,
    });

    if (!result.public_id || !result.secure_url) {
      throw new Error(`Cloudinary did not return a public ID and secure URL for "${filename}".`);
    }

    videosById.set(result.public_id, {
      publicId: result.public_id,
      title: toTitle(filename),
      url: result.secure_url,
    });
  }

  const videos = [...videosById.values()].sort((first, second) => first.title.localeCompare(second.title));
  await writeFile(manifestPath, `${JSON.stringify(videos, null, 2)}\n`, "utf8");
  console.log(`Uploaded ${files.length} video(s). The website video list is updated in data/videos.json.`);
}

main().catch((error) => {
  console.error(`Video upload failed: ${getSafeErrorMessage(error)}`);
  process.exitCode = 1;
});
