import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/sponsors">Sponsors</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/join">Join Robotics!</Link>
            </li>
          </ul>
        </div>
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/sponsors">Sponsors</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar-center">
        <Link href="/">
          <Image
            src="https://images.squarespace-cdn.com/content/v1/57b0d73ce58c62414be1ae5e/1533772074515-Z6KXRL18HUCX6XAL0U6T/pic.svg.png?format=750w"
            alt="Centreville Robotics Logo"
            width={150}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
      </div>

      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1 hidden lg:flex">
          <li>
            <Link href="/aegis">Aegis Robotics 5243</Link>
          </li>
          <li>
            <Link href="/ftc">FTC Teams</Link>
          </li>
          <li>
            <details className="dropdown dropdown-end mb-0 pb-0">
              <summary>Outreach</summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow mt-2">
                <li>
                  <Link href="/outreach/past" className="btn btn-ghost">
                    Past Outreach
                  </Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link href="/gallery">Gallery</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
