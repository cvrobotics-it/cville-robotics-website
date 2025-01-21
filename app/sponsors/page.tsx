import Image from "next/image";
import Link from "next/link";
import React from "react";

const sponsors = [
  {
    name: "Leidos",
    logo: "https://images.squarespace-cdn.com/content/v1/57b0d73ce58c62414be1ae5e/1c820748-9e1c-4983-bf99-b0a27c3c9000/leidos.png?format=1000w",
    description: "Thank you Mrs. Nelson!",
    link: "https://www.leidos.com/",
  },
  {
    name: "Centreville Dance Academy",
    logo: "https://images.squarespace-cdn.com/content/v1/57b0d73ce58c62414be1ae5e/7d8362ec-538b-4151-bcd8-bad6eeccbbb4/cda_logo.png?format=1000w",
    description: "Thank you Mr. Taylor!",
    link: "https://centrevilledance.com/",
  },
  {
    name: "Mermaid Water & Plumbing",
    logo: "https://images.squarespace-cdn.com/content/v1/57b0d73ce58c62414be1ae5e/53c8a935-2b08-45d4-8a0f-e9a5cf86c67a/plumbingsponsor.png?format=1000w",
    description: "Thank you!",
    link: "https://www.watersoftenersystems.com/",
  },
  {
    name: "General Dynamics Information Technology",
    logo: "https://images.squarespace-cdn.com/content/v1/57b0d73ce58c62414be1ae5e/0b18be65-f946-4fd9-b593-f38ee3ad64c5/gdit.jpg?format=1000w",
    description: "Thank you Mr. Connelly and Mr. Raheja!",
    link: "#",
  },
];

export default function Sponsors() {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Sponsors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <Image
                src={sponsor.logo}
                width={240}
                height={160}
                alt={sponsor.name}
                className="w-48 h-auto mb-4"
              />
              <h3 className="text-xl font-bold text-primary mb-2 uppercase">
                {sponsor.name}
              </h3>
              <p className="text-base-content mb-4">{sponsor.description}</p>
              <Link href={sponsor.link} className="btn btn-secondary">
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
