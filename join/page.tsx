import React from "react";

export default function NewMemberSignup() {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left Side: Title and Instructions */}
          <div>
            <h1 className="text-4xl font-bold text-primary mb-6">
              Get Involved
              <br />
              New Member Signup
            </h1>
            <p className="text-lg text-base-content mb-6">
              Come see what Centreville Robotics is all about! Fill out this
              quick form, and someone will be in touch. Also, make sure to join
              the Discord because that is where we do the majority of our
              communication. This is the link to join the server:{" "}
              <a
                href="https://discord.gg/StFh9Juje6"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-primary"
              >
                https://discord.gg/StFh9Juje6
              </a>
            </p>
            <p className="text-lg text-base-content">
              Already a part of CVHS Robotics? No problem! Check Discord for
              updates.
            </p>
          </div>

          {/* Right Side: Signup Form */}
          <div>
            <form className="space-y-6">
              {/* Name Input */}
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

              {/* Email Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Email (Non FCPS) (required)
                  </span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Email Address"
                  required
                />
              </div>

              {/* Phone Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone # (required)</span>
                </label>
                <input
                  type="tel"
                  className="input input-bordered w-full"
                  placeholder="Phone Number"
                  required
                />
              </div>

              {/* Grade Level Dropdown */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Grade Level (required)</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="9th Grade">9th Grade</option>
                  <option value="10th Grade">10th Grade</option>
                  <option value="11th Grade">11th Grade</option>
                  <option value="12th Grade">12th Grade</option>
                </select>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-full">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
