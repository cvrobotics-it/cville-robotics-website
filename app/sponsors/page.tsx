import Image from "next/image";
import Link from "next/link";
import React from "react";
import SponsorshipCta from "@/components/sponsorship-cta";

const sponsors = [
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
    name: "Rosemary's Thyme Bistro",
    logo: "/sponsors/rosemarys_thyme_logo.svg",
    thanks: "Thank you!",
    link: "https://www.rosemarysthymebistro.com/",
  },
];

export default function Sponsors() {
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
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100/50 overflow-hidden"
            >
              <div className="p-8">
                {/* Logo Container */}
                <div className="flex justify-center mb-6">
                  <div className="w-56 h-32 relative flex items-center justify-center bg-gray-50/50 rounded-lg p-4">
                    <Image
                      src={sponsor.logo}
                      fill
                      alt={`${sponsor.name} logo`}
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
                  {sponsor.name}
                </h3>

                {/* Thanks Message */}
                <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-4 mb-6">
                  <p className="text-primary font-medium text-center">
                    {sponsor.thanks}
                  </p>
                </div>

                {/* Visit Website Button */}
                <div className="flex justify-center">
                  <Link
                    href={sponsor.link}
                    className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-focus text-white font-medium rounded-lg transition-colors duration-200 hover:shadow-lg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Visit Website
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Become a Sponsor CTA */}
        <SponsorshipCta />
      </div>
    </section>
  );
}
