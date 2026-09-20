import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Centreville Robotics — mailing address, location, and contact form.",
};

export default function ContactPage() {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Section: Mailing, Location, and Contact Information */}
        <div>
          <h2 className="text-3xl font-bold text-primary mb-4">
            Booster Club Mailing Address
          </h2>
          <p className="text-lg mb-10">
            Centreville Robotics Booster Club, Inc.
            <br />
            5746 Union Mill Road, Box 559
            <br />
            Clifton, VA 20124
          </p>

          <h2 className="text-3xl font-bold text-primary mb-8">
            School Location
          </h2>
          <p className="text-lg mb-8">
            Centreville High School
            <br />
            6001 Union Mill Road
            <br />
            Clifton, VA 20124
          </p>
          <iframe
            title="Map of Centreville High School"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3108.3232704404386!2d-77.41347942326747!3d38.82505675096804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b64517cf60cdd1%3A0x188c09917d50b67d!2sCentreville%20High%20School!5e0!3m2!1sen!2sus!4v1737413162513!5m2!1sen!2sus"
            className="w-full h-72 rounded-xl"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <h2 className="text-3xl font-bold text-primary mb-8">
            Contact Information
          </h2>
          <ul className="text-lg space-y-4 mb-8">
            <li>
              <strong>General Contact:</strong>{" "}
              <a
                href="mailto:mentors@centrevillerobotics.net"
                className="link link-primary"
              >
                mentors@centrevillerobotics.net
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section: Google Form */}
        <div>
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
    </section>
  );
}
