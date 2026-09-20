import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Past Outreach",
  description:
    "A look back at Centreville Robotics' past community outreach programs and initiatives.",
};

export default function PastOutreach() {
  const outreachPrograms = [
    {
      title: "NAC",
      description:
        "Our team has participated in the National Advocacy Conference since its 4th year. We helped lobby for continued funding of Title IV, Part A of the ESSA to help fund afterschool STEM programs.",
    },
    {
      title: "FIRST Global",
      description:
        "Our team mentored Team Ukraine in FIRST Global's inaugural year and volunteered at the competition in DC. We also developed a robot build guide for all FIRST Global Teams. In its second year, we mentored Team Slovakia and helped HQ prepare for the competition in Mexico City.",
    },
    {
      title: "CREED",
      description:
        "In 2017, we launched Project CREED—a four-year STEM education plan to teach STEM concepts year-round through courses in Engineering, Robotics, Electronics, and Capstone Design.",
    },
    {
      title: "STEM exCEL",
      description:
        "We partnered with STEM exCEL to create a 'Coach the Coach' workshop, training parents to coach FLL and Jr. FLL teams, and provided resources to improve outreach, safety, and business practices.",
    },
    {
      title: "FarmBot",
      description:
        "We implemented FarmBot, an agricultural CNC system, in our school's greenhouse to help Special Education students learn about automated farming while growing crops.",
    },
    {
      title: "NASA Air & Scare",
      description:
        "We ran a Halloween booth at NASA’s Air and Scare Day at the Udvar-Hazy Center, where kids and families practiced driving an FTC robot.",
    },
    {
      title: "T-shirt Shooter",
      description:
        "We showcased a t-shirt shooter robot at a rivalry game. The pressurized pneumatic cannon shot t-shirts into the crowd, demonstrating our skills in robotics.",
    },
    {
      title: "Coding Dojo",
      description:
        "We collaborated with Coding Dojo to show how our robotics team codes for real-world tasks with FIRST FTC and FRC game challenges.",
    },
    {
      title: "STEM Appreciation Day",
      description:
        "We visited over 3,000 homes to invite families to our first annual STEM Maker Fair, inspiring interest in STEM and robotics.",
    },
    {
      title: "STEM Maker Fair",
      description:
        "We partnered with GMU's Center for Science Education to host our STEM Maker Fair, showcasing FIRST teams, interactive STEM booths, and sponsor projects to over 600 visitors.",
    },
    {
      title: "Code Cville",
      description:
        "Code Cville is an interactive coding camp we host to teach kids how to program games using Scratch and App Inventor.",
    },
    {
      title: "FLL Teams",
      description:
        "We mentored 2nd-6th graders at Centreville Elementary through stations on simple machines, LEGO robotics, and free builds. This season, we mentored an FLL team for the Hydrodynamics Challenge.",
    },
    {
      title: "Middle School FTC",
      description:
        "We support and mentor two FTC teams from Liberty Middle School, helping them safely and effectively design, build, and program their robots.",
    },
    {
      title: "Feminine Product Drive",
      description:
        "We host a feminine hygiene product drive, collecting items to donate to our local women’s shelter.",
    },
    {
      title: "Liberty MS STEM Night",
      description:
        "We brought FRC and FTC robots to Liberty MS STEM Night, letting kids drive robots while explaining the importance of robotics and math in design and programming.",
    },
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Past Outreach
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {outreachPrograms.map((program, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                {program.title}
              </h3>
              <p className="text-gray-700 mb-6">{program.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
