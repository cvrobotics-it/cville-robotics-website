import { Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Social Media Links */}
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <Link
                href="https://www.instagram.com/cvillerobotics"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-circle"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </Link>
              {/* Add more social media icons as needed */}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="mb-4 text-sm">
              Stay updated with our latest news and updates.
            </p>
            <form className="w-full max-w-md">
              <div className="form-control">
                <div className="join">
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    className="input input-bordered join-item w-full"
                    aria-label="Email Address"
                    required
                  />
                  <button
                    type="submit"
                    className="btn btn-primary join-item"
                    aria-label="Sign Up"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="link link-hover">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="link link-hover">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="link link-hover">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/outreach" className="link link-hover">
                  Outreach
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center border-t border-neutral-focus pt-8">
          <p className="text-sm">
            © {new Date().getFullYear()} Centreville Robotics Team. All rights
            reserved.
          </p>
          {/* Website developed by Rishan Reddy - https://www.linkedin.com/in/rishan-reddy */}
        </div>
      </div>
    </footer>
  );
}
