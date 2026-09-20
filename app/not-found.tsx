import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center px-4">
      <h1 className="text-6xl font-bold text-error">404</h1>
      <p className="mt-4 text-2xl text-base-content">
        Oops! It seems you&apos;ve taken a wrong turn on our robotics field.
      </p>
      <p className="mt-2 text-base-content">
        But don’t worry, you can always{" "}
        <Link href="/" className="link link-primary">
          return to the homepage
        </Link>{" "}
        and get back on track.
      </p>
      <Image
        width={160}
        height={160}
        src="/logo.webp"
        alt="Centreville Robotics logo"
        className="w-40 h-40 mt-8 object-contain"
      />
      <Link href="/" className="btn btn-primary mt-6">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
