import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function FTCTeams() {
  const teams = [
    {
      id: 9830,
      name: "Robotlits 9830",
      description: "Finalists at DC III Qualifier December of 2023",
      image:
        "https://images.squarespace-cdn.com/content/v1/57b0d73ce58c62414be1ae5e/24117163-d840-4b5d-849b-177adeec9177/IMG_9406.JPEG?format=1500w", // Replace with actual image path
      link: "https://theorangealliance.org/teams/9830",
    },
    {
      id: 11804,
      name: "Stick-Shifts 11804",
      description: "Winners at DC III Qualifier December of 2023",
      image:
        "https://images.squarespace-cdn.com/content/v1/57b0d73ce58c62414be1ae5e/22b0f1b6-1590-4ef8-a7bc-a264dc558f8d/IMG_9403.JPEG?format=1500w", // Replace with actual image path
      link: "https://theorangealliance.org/teams/11804",
    },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-neutral mb-12">
          Our Past FTC Teams
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teams.map((team) => (
            <div
              key={team.id}
              className="card card-compact bg-base-100 shadow-xl"
            >
              <figure>
                <Image
                  src={team.image}
                  width={800}
                  height={533}
                  alt={team.name}
                  className="w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-primary">{team.name}</h2>
                <p className="text-base-content">{team.description}</p>
                <div className="card-actions justify-end">
                  <Link href={team.link} className="btn btn-secondary">
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
