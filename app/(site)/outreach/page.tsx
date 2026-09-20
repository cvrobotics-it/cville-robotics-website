import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Outreach Data",
  description:
    "Explore Centreville Robotics' community outreach data and program impact.",
};

export default function Outreach() {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-primary mb-12">
          Outreach Data
        </h1>
        <div className="flex justify-center">
          <iframe
            scrolling="yes"
            src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTz51mFYdQ8Hx0Zs_fn0nuLW31JmJW7cxVxRibG32_N8gYfAAHtZCtyRu9XwrHlRlgJN88WWqV5g30Y/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false&amp;wmode=opaque"
            width="800"
            height="7000"
            className="w-full max-w-4xl rounded-lg border border-gray-300 shadow-lg"
            title="Team Data"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
