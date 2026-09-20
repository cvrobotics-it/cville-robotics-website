import type { MetadataRoute } from "next";

import { getGalleryContent } from "@/lib/gallery/content";
import { getNewsletterIssues } from "@/lib/newsletter/content";

const BASE_URL = "https://www.centrevillerobotics.org";

const staticRoutes = [
  "",
  "/about",
  "/aegis",
  "/contact",
  "/events",
  "/ftc",
  "/gallery",
  "/join",
  "/newsletter",
  "/outreach",
  "/outreach/calendar",
  "/outreach/past",
  "/sponsors",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));

  const [galleryContent, newsletterIssues] = await Promise.all([
    getGalleryContent().catch(() => null),
    getNewsletterIssues().catch(() => null),
  ]);

  const albumEntries: MetadataRoute.Sitemap = galleryContent
    ? [...galleryContent.currentAlbums, ...galleryContent.archivedAlbums].map(
        (album) => ({
          url: `${BASE_URL}/gallery/${album.slug}`,
          lastModified: new Date(album.eventDate),
        })
      )
    : [];

  const newsletterEntries: MetadataRoute.Sitemap = (newsletterIssues || []).map(
    (issue) => ({
      url: `${BASE_URL}/newsletter/${issue.slug}`,
      lastModified: new Date(issue.publishDate),
    })
  );

  return [...staticEntries, ...albumEntries, ...newsletterEntries];
}
