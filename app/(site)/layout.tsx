import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { SanityLive } from "@/sanity/lib/live";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <SanityLive />
    </>
  );
}
