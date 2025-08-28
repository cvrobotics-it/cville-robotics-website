import Link from "next/link";
import Image from "next/image";
import { CalendarIcon } from "lucide-react";

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
            <li>
              <Link href="/ftc">FTC Teams</Link>
            </li>
            <li>
              <Link href="/outreach/past">Past Outreach</Link>
            </li>
            <li>
              <Link href="/outreach/calendar">📅 Our Calendar</Link>
            </li>
            <li>
              <Link href="/gallery">Fun Stuff</Link>
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
            <li>
              <Link href="/join">Join Robotics!</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar-center">
        <Link href="/">
          <Image
            src="https://cdn.discordapp.com/attachments/1146452997451300905/1326714444528615476/CR_Logo_Vector_2023-One_Color_Dark.png?ex=68b0f91c&is=68afa79c&hm=d58d17b5ba53cf5ed3a059f6a7fe9e393ef1e27accf75a7c3cf9a7c313e2b467&"
            alt="Centreville Robotics Logo"
            width={250}
            height={48}
            className="h-16 w-auto"
          />
        </Link>
      </div>

      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1 hidden lg:flex">
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
            <Link href="/outreach/calendar" className="btn btn-ghost">
              <CalendarIcon className="w-5 h-5" />
            </Link>
          </li>
          <li>
            <Link href="/gallery">Fun Stuff</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
