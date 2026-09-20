import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.centrevillerobotics.org"),
  title: {
    default: "Centreville Robotics",
    template: "%s | Centreville Robotics",
  },
  description:
    "Centreville Robotics is a non-profit student run organization based out of Centreville High School.",
  openGraph: {
    title: "Centreville Robotics",
    description:
      "Centreville Robotics is a non-profit student run organization based out of Centreville High School.",
    url: "https://www.centrevillerobotics.org",
    siteName: "Centreville Robotics",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Centreville Robotics",
    description:
      "Centreville Robotics is a non-profit student run organization based out of Centreville High School.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh flex flex-col`}
        suppressHydrationWarning={true}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
