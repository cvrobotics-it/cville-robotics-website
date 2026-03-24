"use client";

import { usePathname } from "next/navigation";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

type SiteChromeProps = {
  children: React.ReactNode;
};

export default function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const isStudioRoute = pathname.startsWith("/studio");

  if (isStudioRoute) {
    return <main className="min-h-dvh bg-base-100">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
