// app/photos/page.tsx (Server)
import { getManifest } from "@/lib/gallery/getManifest";
import Carousels from "@/components/CarouselsSection";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PhotosPage() {
  const { albums } = await getManifest();
  return <Carousels albums={albums} />;
}
