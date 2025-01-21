import React from "react";
import Link from "next/link";
import Image from "next/image";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center">
      <h1 className="text-6xl font-bold text-error">404</h1>
      <p className="mt-4 text-2xl text-base-content">
        Oops! It seems you've taken a wrong turn on our robotics field.
      </p>
      <p className="mt-2 text-base-content">
        But don’t worry, you can always{" "}
        <Link href="/" className="link link-primary">
          return to the homepage
        </Link>{" "}
        and get back on track.
      </p>
      <Image
        width={200}
        height={300}
        src="https://picsum.photos/200/300"
        alt="Lost Robot"
        className="w-64 h-64 mt-6"
      />
      <Link href="/" className="btn btn-primary mt-6">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
