import Link from "next/link";

export default function StemAppreciation() {
  return (
    <div className="bg-gradient-to-br from-primary to-secondary text-white py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-6">STEM Appreciation</h2>
          <p className="text-lg uppercase tracking-wider font-medium opacity-90">
            Inspiring the next generation through STEM programs
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* FRC Section */}
          <div className="card bg-white bg-opacity-10 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-lg">
            <div className="card-body p-6">
              <h3 className="card-title text-2xl font-semibold mb-4">FRC</h3>
              <p className="mb-6 text-sm">
                FIRST Robotics Competition is a game-based competition for
                grades 9-12, where students design and build robots to achieve
                each year&apos;s unique challenge.
              </p>
              <div className="card-actions">
                <Link
                  href="https://www.firstinspires.org/robotics/frc"
                  className="btn btn-outline text-white border-white hover:bg-white hover:text-[#4A90E2] transition-all"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* CREED Section */}
          <div className="card bg-white bg-opacity-10 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-lg">
            <div className="card-body p-6">
              <h3 className="card-title text-2xl font-semibold mb-4">CREED</h3>
              <p className="mb-6 text-sm">
                CREED, standing for Capstone, Robotics, Engineering, Electronics
                & Design, is a four-year STEM plan to teach students STEM
                year-round.
              </p>
              <div className="card-actions">
                <Link
                  href="/outreach/past"
                  className="btn btn-outline text-white border-white hover:bg-white hover:text-[#4A90E2] transition-all"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* FTC Section */}
          <div className="card bg-white bg-opacity-10 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-lg">
            <div className="card-body p-6">
              <h3 className="card-title text-2xl font-semibold mb-4">FTC</h3>
              <p className="mb-6 text-sm">
                FIRST Tech Challenge lets teams of 10-15 students build a small
                (18x18x18) robot to compete in each year&apos;s exciting game
                challenge.
              </p>
              <div className="card-actions">
                <Link
                  href="https://www.firstinspires.org/robotics/ftc"
                  className="btn btn-outline text-white border-white hover:bg-white hover:text-[#4A90E2] transition-all"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* CROP Section */}
          <div className="card bg-white bg-opacity-10 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-lg">
            <div className="card-body p-6">
              <h3 className="card-title text-2xl font-semibold mb-4">CROP</h3>
              <p className="mb-6 text-sm">
                The Centreville Robotics Outreach Program, founded in 2015,
                spreads STEM and robotics awareness year-round in the community.
              </p>
              <div className="card-actions">
                <Link
                  href="/outreach/past"
                  className="btn btn-outline text-white border-white hover:bg-white hover:text-[#4A90E2] transition-all"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
