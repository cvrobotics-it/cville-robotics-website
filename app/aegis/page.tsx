import Image from "next/image";
import Link from "next/link";
import React from "react";

const competitionHistory = [
  {
    year: "2014",
    achievements: ["Greater DC Regional - Highest Rookie Seed Award"],
  },
  {
    year: "2015",
    achievements: [
      "Greater DC Regional - Regional Finalist",
      "Industrial Safety Award sponsored by Underwriters Laboratory",
      "South Florida Regional",
    ],
  },
  {
    year: "2016",
    achievements: [
      "CHS District - Northern Virginia Event - Industrial Safety Award",
      "CHS District - Northern Maryland Event - Entrepreneurship Award",
      "FIRST Championship in St. Louis",
      "South Florida Regional",
    ],
  },
  {
    year: "2017",
    achievements: [
      "CHS District - Greater DC Event - Team Spirit Award sponsored by FCA Foundation",
      "Star of the Day Award",
      "CHS District - Central Maryland Event - District Engineering Inspiration Award",
      "Star of the Day Award",
      "South Florida Regional - Industrial Safety Award",
      "Hardhat Award",
      "Star of the Day Award (twice consecutively)",
    ],
  },
  {
    year: "2018",
    achievements: [
      "CHS District - Greater DC Event - Star of the Day Award",
      "Hardhat Award",
      "District Engineering Inspiration Award",
      "CHS District - Southern Maryland Event - Chairmans Award Winner",
      "1st seed alliance",
      "Star of the Day",
      "CHS District - Central Maryland Event - Entrepreneurship Award",
      "8th seed alliance",
      "CHS District Championship - Regional Engineering Inspiration Award",
      "World Championship - Detroit, MI - Daly Division",
    ],
  },
  {
    year: "2019",
    achievements: [
      "CHS District - Bethesda MD Event",
      "CHS District - Owings Mill MD Event - District Engineering Inspiration Award",
      "CHS District - Oxon Hill MD Event",
      "CHS District Championship - Regional Engineering Inspiration Award",
      "World Championship - Detroit, MI - Carson Division",
    ],
  },
  {
    year: "2020",
    achievements: [
      "CHS District - Haymarket VA Event - Imagery Award in honor of Jack Kamen",
      "CHS District - Bethesda MD Event - Judges' Award",
      "*Season ended early due to global pandemic",
    ],
  },
  {
    year: "2021",
    achievements: [
      "Competed Virtually due to global pandemic - Game Design Challenge - Nitrogen Group",
      "CHS District Championship - Regional Chairman's Award",
    ],
  },
  {
    year: "2022",
    achievements: [
      "CHS District - Greater DC Event #2 Day 1 - Gracious Professionalism Award",
      "CHS District - Greater DC Event #3 Day 1 - District Chairman's Award",
    ],
  },
  {
    year: "2023",
    achievements: [
      "CHS District Glen Allen VA Event - Gracious Professionalism Award",
    ],
  },
];

export default function TeamHistory() {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-primary mb-6">
          Team History
        </h1>
        <h3 className="font-bold text-center text-secondary mb-12">
          <Link
            href="https://www.thebluealliance.com/team/5243"
            target="_blank"
            className="link link-primary"
          >
            Visit our Blue Alliance page
          </Link>
        </h3>

        {/* Team Image */}
        <div className="mb-12">
          <Image
            src="https://images.squarespace-cdn.com/content/v1/57b0d73ce58c62414be1ae5e/1533874934878-K8D7XK0TJB2DCDD9AWOQ/Actual+Group+Picture+twitter.jpeg?format=2500w"
            alt="Team Photo"
            className="w-full rounded-lg"
            width={2500}
            height={1667}
          />
        </div>

        {/* Overview Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Overview</h2>
          <p className="text-lg text-base-content">
            Aegis Robotics was first formed in the fall of 2013 (then called
            Wildcat Robotics) by 12 passionate students and one incredible
            mentor. Since it's inception, our FRC team has gone through many
            names, but decided on our current one, Aegis Robotics in the summer
            of 2017. From team 5243 we grew our organization into 10 FTC teams,
            2 FLL teams and our original FRC Team 5243. However, the 2020
            COVID-19 pandemic hit our program hard and currently we have two FTC
            teams, an FLL club, and an FRC team. We strive to cultivate a newer
            and brighter future for upcoming generations by enabling them to
            approach real-world problems creatively and intuitively through
            their experience in STEM and robotics. If you'd like to learn more
            about our efforts in STEM Education click the link below. Learn more
          </p>
        </div>

        {/* Competition History */}
        <div>
          <h2 className="text-3xl font-bold text-primary mb-4">
            Competition History
          </h2>
          <div className="space-y-8">
            {/* Yearly Achievements */}
            {competitionHistory.map((item, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold text-primary mb-2">
                  {item.year}
                </h3>
                <ul className="list-disc list-inside text-lg text-base-content space-y-1">
                  {item.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
