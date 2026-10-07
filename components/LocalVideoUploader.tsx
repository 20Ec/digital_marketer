"use client";

import Script from "next/script";
import { useState } from "react";

type CloudinaryWidgetResult = {
  event?: string;
  info?: {
    public_id?: string;
    secure_url?: string;
    original_filename?: string;
    format?: string;
    resource_type?: string;
  };
};

type CloudinaryUploadWidget = {
  open: () => void;
};

type CloudinaryWidgetConfig = {
  apiKey: string;
  cloudName: string;
  folder: string;
  resourceType: "video";
  uploadSignature: string;
  uploadSignatureTimestamp: number;
  clientAllowedFormats: string[];
  multiple: false;
  sources: string[];
};

declare global {
  interface Window {
    cloudinary?: {
      createUploadWidget: (
        config: CloudinaryWidgetConfig,
        callback: (error: unknown, result?: CloudinaryWidgetResult) => void,
      ) => CloudinaryUploadWidget;
    };
  }
}

type UploadSignature = {
  apiKey: string;
  cloudName: string;
  signature: string;
  timestamp: number;
};

export function LocalVideoUploader() {
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  async function openUploader() {
    setIsPreparing(true);
    setStatus("");
    setError("");

    try {
      const signatureResponse = await fetch("/api/local-video-upload/signature", {
        method: "POST",
      });
      const signatureResult: UploadSignature | { error: string } = await signatureResponse.json();

      if (!signatureResponse.ok || "error" in signatureResult) {
        throw new Error("error" in signatureResult ? signatureResult.error : "Could not prepare upload.");
      }

      const cloudinary = window.cloudinary;

      if (!cloudinary) {
        throw new Error("Cloudinary upload is still loading. Please try again.");
      }

      const widget = cloudinary.createUploadWidget(
        {
          apiKey: signatureResult.apiKey,
          cloudName: signatureResult.cloudName,
          folder: "portfolio/videos",
          resourceType: "video",
          uploadSignature: signatureResult.signature,
          uploadSignatureTimestamp: signatureResult.timestamp,
          clientAllowedFormats: ["mp4", "webm"],
          multiple: false,
          sources: ["local"],
        },
        (widgetError, result) => {
          if (widgetError) {
            setError("Cloudinary reported an upload error. Check the account settings and try again.");
            setStatus("");
            return;
          }

          if (result?.event !== "success" || !result.info) {
            return;
          }

          const { public_id: publicId, secure_url: secureUrl, original_filename: originalFilename, format, resource_type: resourceType } =
            result.info;

          if (!publicId || !secureUrl || resourceType !== "video" || !originalFilename) {
            setError("Cloudinary did not return the details needed to add this video to the site.");
            return;
          }

          const title = originalFilename.replace(/[_-]+/g, " ").trim();
          setStatus(`Uploaded ${title}${format ? `.${format}` : ""}. Adding it to the portfolio...`);

          void fetch("/api/local-video-upload/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ publicId, secureUrl, title }),
          })
            .then(async (response) => {
              const body: { error?: string } = await response.json();

              if (!response.ok) {
                throw new Error(body.error || "Could not add the video to the portfolio.");
              }

              setStatus(`${title} is uploaded and added. Refresh the portfolio to see it.`);
            })
            .catch((registrationError: unknown) => {
              setError(
                registrationError instanceof Error
                  ? `The video uploaded, but could not be added to the portfolio list: ${registrationError.message}`
                  : "The video uploaded, but could not be added to the portfolio list.",
              );
              setStatus("");
            });
        },
      );

      widget.open();
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Unable to start the upload.");
    } finally {
      setIsPreparing(false);
    }
  }

  return (
    <div className="mt-8">
      <Script
        src="https://upload-widget.cloudinary.com/latest/global/all.js"
        strategy="afterInteractive"
        onLoad={() => setWidgetLoaded(true)}
        onError={() => setError("Could not load the Cloudinary uploader. Check your internet connection.")}
      />
      <button
        type="button"
        onClick={openUploader}
        disabled={!widgetLoaded || isPreparing}
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#1A2238] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPreparing ? "Preparing upload..." : widgetLoaded ? "Choose a video to upload" : "Loading uploader..."}
      </button>
      <p className="mt-3 text-sm leading-6 text-slate-500">
        Supported formats: MP4 and WebM. Your API secret stays on this local server.
      </p>
      {status && <p role="status" className="mt-4 text-sm font-medium text-green-700">{status}</p>}
      {error && <p role="alert" className="mt-4 text-sm font-medium text-red-700">{error}</p>}
    </div>
  );
}
