import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join the Team",
  description:
    "Interested in joining Centreville Robotics? Fill out the new member signup form to get started.",
};

export default function NewMemberSignup() {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left Side: Title and Instructions */}
          <div>
            <h1 className="text-4xl font-bold text-primary mb-6">
              Get Involved
              <br />
              New Member Signup
            </h1>
            <p className="text-lg text-base-content mb-6">
              Come see what Centreville Robotics is all about! Fill out this
              quick form, and someone will be in touch.
            </p>
          </div>

          {/* Right Side: Signup Form */}
          <div className="flex flex-col items-center">
            {/* <h2 className="text-3xl font-bold text-primary mb-6">Contact Us</h2> */}
            <iframe
              title="Contact Centreville Robotics"
              src="https://docs.google.com/forms/d/e/1FAIpQLSf2UVGuKyjuAW7_ljrr6KE6bYQgtX0pWeIzDfETyO_n56ZJEg/viewform?embedded=true"
              className="w-full min-h-[800px] rounded-xl border border-base-300"
              loading="lazy"
              allowFullScreen
            >
              Loading…
            </iframe>
            <p className="mt-4 text-sm text-base-content/70">
              Prefer a new tab?{" "}
              <a
                href="https://forms.gle/QftFqHAxNJ6LRQNf9"
                className="link link-primary"
                target="_blank"
                rel="noreferrer"
              >
                Open the Google Form
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
