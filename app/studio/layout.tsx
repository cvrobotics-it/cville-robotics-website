import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Content Studio | Centreville Robotics",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-base-100">
      <div className="sticky top-0 z-50 border-b border-base-300 bg-neutral text-neutral-content shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] opacity-70">
              Content Studio
            </span>
            <div className="h-4 w-px bg-neutral-content/30" />
            <span className="text-sm opacity-80">Centreville Robotics</span>
          </div>
          <Link href="/" className="btn btn-ghost btn-sm text-neutral-content">
            Back to site
          </Link>
        </div>
      </div>
      <div className="h-[calc(100dvh-57px)]">{children}</div>
    </div>
  );
}
