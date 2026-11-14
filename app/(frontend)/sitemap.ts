import type { MetadataRoute } from "next";

const baseUrl = (process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000").replace(/\/$/, "");

const paths = [
  "/",
  "/services/examens",
  "/services/pathologies",
  "/services/interventions",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({ url: `${baseUrl}${path === "/" ? "" : path}` }));
}
