import Image from "next/image";
import Link from "next/link";

export default function InfoCards() {
  return (
    <>
      <div className="bg-base-200 py-16">
        <div className="container mx-auto px-4">
          <div className="card lg:card-side bg-base-100 shadow-xl">
            <figure className="lg:w-1/2">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/57b0d73ce58c62414be1ae5e/1679320920363-6PX9IS8A6E4VKFEBMBMN/IMG-3868.jpg"
                alt="Team photo with robotics display"
                width={600}
                height={400}
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
                <Link href={"/about"} className="btn btn-primary">
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
                <Link href={"aegis"} className="btn btn-primary">
                  Learn More
                </Link>
              </div>
            </div>
            <figure className="lg:w-1/2">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/57b0d73ce58c62414be1ae5e/1542597493770-QA9L9W0ECQJ6YN7VYRW2/WhatsApp+Image+2018-08-09+at+9.16.24+PM.jpeg"
                alt="Students working on robotics projects"
                width={600}
                height={400}
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
            <div className="card-body lg:w-1/2">
              <h2 className="card-title text-4xl font-bold text-primary">
                Parent&apos;s Corner
              </h2>
              <p className="text-lg">
                Check out our website for Centreville Robotics Parent&apos;s!
              </p>
              <div className="card-actions justify-end">
                <Link
                  href={
                    "https://sites.google.com/view/cvilleroboticsparentpage/home"
                  }
                  className="btn btn-primary"
                  target="_blank"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
