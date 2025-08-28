import React from "react";

export default function ContactPage() {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Section: School and Contact Information */}
        <div>
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3108.3232704404386!2d-77.41347942326747!3d38.82505675096804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b64517cf60cdd1%3A0x188c09917d50b67d!2sCentreville%20High%20School!5e0!3m2!1sen!2sus!4v1737413162513!5m2!1sen!2sus"
            width="400"
            height="300"
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

          <h2 className="text-3xl font-bold text-primary mb-8">
            Booster Club Mailing Address
          </h2>
          <p className="text-lg">
            Centreville Robotics Booster Club, Inc.
            <br />
            5746 Union Mill Road, Box 559
            <br />
            Clifton, VA 20124
          </p>
        </div>

        {/* Right Section: Contact Form */}
        <div>
          <h2 className="text-3xl font-bold text-primary mb-8">Contact Us</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name (required)</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email Address (required)</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Email Address"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Subject / Sub-team of Interest
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Subject"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Message (required)</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Your message here..."
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
