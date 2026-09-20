import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ExternalLink } from "lucide-react";

const parentResources = [
  "Forms",
  "Contact",
  "Sponsorship",
  "Join Team",
  "Volunteer",
];

export default function InfoCards() {
  return (
    <>
      <div className="bg-base-200 py-16">
        <div className="container mx-auto px-4">
          <div className="card lg:card-side bg-base-100 shadow-xl">
            <figure className="lg:w-1/2">
              <Image
                src="/assets/team-photo.jpg"
                alt="Team photo with robotics display"
                width={600}
                height={300}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body lg:w-1/2">
              <h2 className="card-title text-4xl font-bold text-primary">
                About Us
              </h2>
              <p className="text-lg">
                Centreville Robotics is a non-profit student run organization
                based out of Centreville Highschool.
              </p>
              <div className="card-actions justify-end">
                <Link
                  href={"/about"}
                  prefetch={false}
                  className="btn btn-primary"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-base-100 py-16">
        <div className="container mx-auto px-4">
          <div className="card lg:card-side bg-base-200 shadow-xl">
            <div className="card-body lg:w-1/2">
              <h2 className="card-title text-4xl font-bold text-primary">
                Our Mission
              </h2>
              <p className="text-lg">
                To cultivate a newer and brighter future for upcoming
                generations by enabling them to approach real-world problems
                creatively and intuitively through their experience in STEM and
                robotics.
              </p>
              <div className="card-actions justify-end">
                <Link
                  href={"aegis"}
                  prefetch={false}
                  className="btn btn-primary"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <figure className="lg:w-1/2">
              <Image
                src="/assets/locked-in.png"
                alt="Students working on robotics projects"
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </figure>
          </div>
        </div>
      </div>
      <div className="bg-base-200 py-16">
        <div className="container mx-auto px-4">
          <div className="card lg:card-side bg-base-100 shadow-xl">
            <figure className="lg:w-1/2">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/57b0d73ce58c62414be1ae5e/f48aa86b-f07c-48e7-bbe1-69f810f926d4/IMG_8021.JPG"
                alt="Team members"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body gap-5 lg:w-1/2 lg:p-12 xl:p-14">
              <h2 className="card-title text-4xl font-bold text-primary">
                Parents&apos; Corner
              </h2>
              <p className="max-w-xl text-lg leading-relaxed">
                Find the information your family needs throughout the robotics
                season, all organized in one place.
              </p>

              <ul
                className="grid gap-x-6 gap-y-3 sm:grid-cols-2"
                aria-label="Resources available in the parent hub"
              >
                {parentResources.map((resource) => (
                  <li key={resource} className="flex items-start gap-2.5">
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-primary"
                      strokeWidth={2.25}
                    />
                    <span className="font-medium leading-6">{resource}</span>
                  </li>
                ))}
              </ul>

              <p className="max-w-xl text-sm leading-relaxed text-base-content/70">
                Maintained and regularly updated as resources change.
              </p>

              <div className="card-actions mt-1 justify-start">
                <Link
                  href={
                    "https://sites.google.com/centrevillerobotics.net/parents/"
                  }
                  className="btn btn-primary w-full sm:w-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit the Parent Resource Hub
                  <ExternalLink aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
