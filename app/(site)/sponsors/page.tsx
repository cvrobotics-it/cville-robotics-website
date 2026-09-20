import React from "react";
import type { Metadata } from "next";

import SponsorCard from "@/components/SponsorCard";
import SponsorshipCta from "@/components/sponsorship-cta";
import { getSponsors } from "@/lib/sponsors/content";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "Meet the sponsors who make Centreville Robotics' program possible.",
};

type Sponsor = {
  name: string;
  logo: string;
  thanks: string;
  link: string;
};

const sponsors: Sponsor[] = [
  {
    name: "Leidos",
    logo: "/sponsors/Leidos-logo-horz-full-rgb.svg",
    thanks: "Special thanks to Mrs. Nelson!",
    link: "https://www.leidos.com/",
  },
  {
    name: "Centreville Dance Academy",
    logo: "/sponsors/Centreville_Dance_Logo.png",
    thanks: "Special thanks to Mr. Taylor!",
    link: "https://centrevilledance.com/",
  },
  {
    name: "Mermaid Water & Plumbing",
    logo: "/sponsors/Mermaid-Water-Logo-High-Resolution.png",
    thanks: "Thank you!",
    link: "https://www.watersoftenersystems.com/",
  },
  {
    name: "General Dynamics Information Technology",
    logo: "/sponsors/gdit-logo.png",
    thanks: "Special thanks to Mr. Connelly and Mr. Raheja!",
    link: "https://gdit.com/",
  },
  {
    name: "Tria",
    logo: "/sponsors/Copy of Tria Logo_Blue.png",
    thanks: "Thank you!",
    link: "https://triafed.com/",
  },
  {
    name: "Ascent Educational Services",
    logo: "/sponsors/Ascentlogo.png",
    thanks: "Thank you!",
    link: "https://www.ascent-educational-consulting.com/",
  },
];

export default async function Sponsors() {
  const cmsSponsors = (await getSponsors()) || [];
  const sponsorsToRender = cmsSponsors.length > 0 ? cmsSponsors : sponsors;

  return (
    <section className="py-20 bg-gradient-to-br from-base-100 to-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-4">Our Sponsors</h1>
          <p className="text-xl text-base-content max-w-3xl mx-auto leading-relaxed">
            We are grateful to our amazing sponsors who make our robotics
            program possible. Their support enables us to compete, learn, and
            inspire the next generation of engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {sponsorsToRender.map((sponsor, index) => (
            <SponsorCard
              key={"_id" in sponsor ? sponsor._id : `${sponsor.name}-${index}`}
              legacyLogo={"_id" in sponsor ? undefined : sponsor.logo}
              sponsor={
                "_id" in sponsor
                  ? sponsor
                  : {
                      _id: `${sponsor.name}-${index}`,
                      name: sponsor.name,
                      website: sponsor.link,
                      thanks: sponsor.thanks,
                      description: undefined,
                    }
              }
            />
          ))}
        </div>

        {/* Become a Sponsor CTA */}
        <SponsorshipCta />
      </div>
    </section>
  );
}
