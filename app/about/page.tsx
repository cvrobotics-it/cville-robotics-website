import Image from "next/image";
import React from "react";

export default function AboutUs() {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        {/* Hero Image */}
        <div className="mb-12">
          <Image
            src="/assets/team-photo.png"
            alt="Centreville Robotics Team at the 2017 Saint Louis World Championship"
            className="w-full rounded-lg"
            width={2500}
            height={1667}
          />
        </div>

        {/* Mission Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Our Mission</h2>
          <p className="text-lg text-base-content">
            Centreville Robotics aspires to cultivate a newer and brighter
            future for upcoming generations by enabling them to approach
            real-world problems creatively and intuitively through their
            experience in STEM and robotics. The organization takes pride in
            introducing students to STEM and encouraging them to pursue
            STEM-related fields after graduation. The organization also works
            heavily within the Centreville community, establishing FIRST teams
            in feeder middle and elementary schools, working with local
            companies such as STEM exCEL and Coding Dojo, as well as running
            annual STEM events. It continues to partially fund and support the
            STEM program at its root school, Centreville High School.
          </p>
        </div>

        {/* History Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Our History</h2>
          <p className="text-lg text-base-content">
            The Centreville Robotics Organization began in the fall of 2013 with
            the formation of FRC Team 5243 Aegis Robotics. The main goal of our
            organization has always been to spread STEM throughout the
            community, and because of that, its outreach efforts have grown with
            the support of numerous local FIRST robotics teams, company
            partnerships, annual STEM events, and STEM Education lobbying
            efforts at Capitol Hill. The organization prides itself on being
            student-run, with a notable emphasis on developing leadership and
            educating the future generation of STEM workers.
          </p>
        </div>

        {/* Non-discrimination Policy Section */}
        <div>
          <h2 className="text-3xl font-bold text-primary mb-4">
            Non-discrimination Policy Statement
          </h2>
          <p className="text-lg text-base-content">
            Centreville Robotics and Centreville Robotics Booster Club, Inc. are
            committed to a learning and working environment free from all forms
            of discrimination. No person shall, on the basis of race, sex,
            color, age, religion, sexual orientation, gender identity, national
            origin, genetic information, pregnancy status, childbirth or related
            medical conditions, marital status, veteran status, and disability,
            be denied the benefits of, or be subjected to discrimination under,
            any education program or activity, as required by law. Retaliation
            against any person who reports or participates as a witness in the
            investigation of a discrimination and/or harassment complaint is
            strictly prohibited.
          </p>
        </div>
      </div>
    </section>
  );
}
