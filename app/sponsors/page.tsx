import Image from "next/image";
import Link from "next/link";
import React from "react";
import SponsorshipCta from "@/components/sponsorship-cta";

type Sponsor = {
  name: string;
  logo: string;
  thanks: string;
  link: string;
  isDonation?: boolean;
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
  {
    name: "Support Our Mission",
    logo: "/logo.webp",
    thanks: "Every contribution powers innovation",
    link: "https://www.paypal.com/ncp/payment/SCU42N7GPMVRL",
    isDonation: true,
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
              className={`group ${
                sponsor.isDonation
                  ? "bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 border border-blue-200/40 ring-1 ring-blue-100/60"
                  : "bg-white border border-gray-100/50"
              } rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden`}
            >
              <div className={sponsor.isDonation ? "p-8 relative" : "p-8"}>
                {sponsor.isDonation && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      Donate
                    </div>
                  </div>
                )}

                {/* Logo Container */}
                <div className="flex justify-center mb-6">
                  {sponsor.isDonation ? (
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center shadow-inner">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <div className="w-56 h-32 relative flex items-center justify-center bg-gray-50/50 rounded-lg p-4">
                      <Image
                        src={sponsor.logo}
                        fill
                        alt={`${sponsor.name} logo`}
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                </div>

                {/* Company Name */}
                <h3
                  className={`text-2xl font-bold text-center mb-4 ${
                    sponsor.isDonation
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                      : "text-gray-800"
                  }`}
                >
                  {sponsor.name}
                </h3>

                {/* Thanks Message */}
                <div
                  className={`rounded-xl p-4 mb-6 ${
                    sponsor.isDonation
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100"
                      : "bg-gradient-to-r from-primary/5 to-primary/10"
                  }`}
                >
                  <p
                    className={`font-medium text-center ${
                      sponsor.isDonation ? "text-slate-600" : "text-primary"
                    }`}
                  >
                    {sponsor.thanks}
                  </p>
                </div>

                {/* Visit Website/Donate Button */}
                <div className="flex justify-center">
                  <Link
                    href={sponsor.link}
                    className={`inline-flex items-center px-6 py-3 font-medium rounded-lg transition-colors duration-200 hover:shadow-lg ${
                      sponsor.isDonation
                        ? "bg-primary hover:bg-primary-focus text-white"
                        : "bg-primary hover:bg-primary-focus text-white"
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {sponsor.isDonation ? "Donate Now" : "Visit Website"}
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
