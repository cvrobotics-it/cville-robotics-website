import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import type { SanitySponsor } from "@/sanity/lib/types";

type SponsorCardProps = {
  sponsor: SanitySponsor;
  legacyLogo?: string;
};

export default function SponsorCard({ sponsor, legacyLogo }: SponsorCardProps) {
  const logoUrl = sponsor.logo?.asset
    ? urlFor(sponsor.logo).width(600).height(300).fit("max").url()
    : legacyLogo || null;
  const logoAlt = sponsor.name.trim().length > 0 ? `${sponsor.name} logo` : 'Sponsor logo';

  return (
    <article className="group rounded-2xl border border-gray-100/50 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl overflow-hidden">
      <div className="p-8">
        <div className="flex justify-center mb-6">
          <div className="w-56 h-32 relative flex items-center justify-center bg-gray-50/50 rounded-lg p-4">
            {logoUrl ? (
              <Image
                src={logoUrl}
                fill
                alt={logoAlt}
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            ) : null}
          </div>
        </div>

        <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">{sponsor.name}</h3>

        {sponsor.thanks ? (
          <div className="rounded-xl p-4 mb-6 bg-gradient-to-r from-primary/5 to-primary/10">
            <p className="font-medium text-center text-primary">{sponsor.thanks}</p>
          </div>
        ) : null}

        {sponsor.description ? (
          <p className="mb-6 text-center text-sm leading-6 text-base-content/70">{sponsor.description}</p>
        ) : null}

        <div className="flex justify-center">
          <Link
            href={sponsor.website}
            className="inline-flex items-center px-6 py-3 font-medium rounded-lg transition-colors duration-200 hover:shadow-lg bg-primary hover:bg-primary-focus text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Website
          </Link>
        </div>
      </div>
    </article>
  );
}
