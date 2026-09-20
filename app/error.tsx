"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center px-4">
      <h1 className="text-6xl font-bold text-error">Oops</h1>
      <p className="mt-4 text-2xl text-base-content">
        Something went wrong on our end.
      </p>
      <p className="mt-2 text-base-content">
        Try again, or{" "}
        <Link href="/" className="link link-primary">
          return to the homepage
        </Link>
        .
      </p>
      <button className="btn btn-primary mt-6" onClick={() => reset()}>
        Try Again
      </button>
    </div>
  );
}
