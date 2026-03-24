"use client";

import { useEffect, useState } from "react";

export default function NewsletterSignup() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-12 w-full max-w-md rounded-lg bg-neutral-focus/20" />;
  }

  return (
    <form className="w-full max-w-md">
      <div className="form-control">
        <div className="join">
          <input
            type="email"
            placeholder="Your Email Address"
            className="input input-bordered join-item w-full"
            aria-label="Email Address"
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            required
          />
          <button
            type="submit"
            className="btn btn-primary join-item"
            aria-label="Sign Up"
          >
            Subscribe
          </button>
        </div>
      </div>
    </form>
  );
}
