"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SponsorshipCta() {
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    // Try to see if the PDF exists; this avoids showing a broken link in prod
    fetch("/2025-2026 Sponsorship Proposal Packet.pdf", { method: "HEAD" })
      .then((res) => {
        if (!mounted) return;
        setAvailable(res.ok);
      })
      .catch(() => mounted && setAvailable(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="mt-20">
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h3 className="card-title text-2xl md:text-3xl">Become a Sponsor</h3>
          <p>
            We’re grateful for community partners who fuel our STEM mission.
            Download the sponsorship packet, complete it, and email it to
            <span> </span>
            <a
              href="mailto:mentors@centrevillerobotics.net"
              className="link link-primary"
            >
              mentors@centrevillerobotics.net
            </a>
            .
          </p>

          <div className="card-actions mt-4 items-center gap-3 flex-col sm:flex-row">
            {available ? (
              <a
                href="/2025-2026 Sponsorship Proposal Packet.pdf"
                download
                className="btn btn-primary"
              >
                Download Sponsorship Packet (PDF)
              </a>
            ) : (
              <button className="btn btn-primary" disabled>
                Sponsorship Packet (PDF) coming soon
              </button>
            )}

            <Link
              href="mailto:mentors@centrevillerobotics.net?subject=Centreville%20Robotics%20Sponsorship&body=Hi%20Aegis%20Robotics%20Mentors%2C%0A%0AI%E2%80%99m%20interested%20in%20sponsoring%20the%20team.%20Please%20share%20details%20about%20levels%20and%20benefits.%0A%0AThanks!"
              className="btn btn-ghost"
            >
              Email Our Mentors
            </Link>
          </div>

          {available === false && (
            <p className="text-sm opacity-70 mt-2">
              Note: Place your PDF at{" "}
              <code>/public/sponsorship-packet.pdf</code>
              to enable the download button.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
