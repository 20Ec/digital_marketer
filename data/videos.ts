import videoManifest from "./videos.json";

export type PortfolioVideo = {
  publicId: string;
  title: string;
  url: string;
  aspectRatio?: string;
};

export const videos: PortfolioVideo[] = videoManifest;
