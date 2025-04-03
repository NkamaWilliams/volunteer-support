"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    console.log("Session changed");
  }, [session]);
  return (
    <nav className="flex justify-between gap-8 bg-[#F5F3F3] p-6">
      <h2 className="text-lg font-semibold">
        Welcome, {!session ? "User" : session.user.name}
      </h2>

      {/* Desktop layout */}
      <div className="hidden items-center gap-8 md:flex">
        <Link href="/" className="text-base text-black hover:text-[#2093D6]">
          Home
        </Link>
        {!session ? (
          <>
            <Link
              href="/signin"
              className="text-base text-black hover:text-[#2093D6]"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-base text-black hover:text-[#2093D6]"
            >
              Sign up
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/allEvents"
              className="text-base text-black hover:text-[#2093D6]"
            >
              All Events
            </Link>
            {session.user.role == "ADMIN" && (
              <>
                <Link
                  href="/event"
                  className="text-base text-black hover:text-[#2093D6]"
                >
                  My Events
                </Link>
              </>
            )}
            <Link
              href="/acceptedEvents"
              className="text-base text-black hover:text-[#2093D6]"
            >
              Accepted Events
            </Link>
            <button
              className="text-base text-black hover:text-[#2093D6]"
              onClick={() => signOut({ redirectTo: "/" })}
            >
              Sign Out
            </button>
          </>
        )}
      </div>

      <div className="md:hidden">
        <RxHamburgerMenu
          className="cursor-pointer text-3xl font-extrabold text-[#000000]"
          onClick={() => setIsNavOpen(true)}
        />
      </div>

      <div
        className={`fixed right-0 top-0 z-30 h-screen w-[85%] transform bg-[#FFFFFF] text-[#000000] shadow-lg transition-transform duration-300 ${
          isNavOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between p-4">
          <div className="flex gap-1">
            <p className="pt-2 text-start font-semibold">Volunteer Support</p>
          </div>

          <IoClose
            className="mt-4 cursor-pointer text-3xl"
            onClick={() => setIsNavOpen(false)}
          />
        </div>

        <div className="ml-4 flex flex-col gap-4">
          <Link
            href="/"
            onClick={() => setIsNavOpen(false)}
            className="text-base text-black hover:text-[#2093D6]"
          >
            Home
          </Link>
          {!session ? (
            <>
              <Link
                href="/signin"
                onClick={() => setIsNavOpen(false)}
                className="text-base text-black hover:text-[#2093D6]"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsNavOpen(false)}
                className="text-base text-black hover:text-[#2093D6]"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/allEvents"
                onClick={() => setIsNavOpen(false)}
                className="text-base text-black hover:text-[#2093D6]"
              >
                All Events
              </Link>
              {session.user.role == "ADMIN" && (
                <>
                  <Link
                    href="/event"
                    onClick={() => setIsNavOpen(false)}
                    className="text-base text-black hover:text-[#2093D6]"
                  >
                    My Events
                  </Link>
                </>
              )}
              <Link
                href="/acceptedEvents"
                onClick={() => setIsNavOpen(false)}
                className="text-base text-black hover:text-[#2093D6]"
              >
                Accepted Events
              </Link>
              <button
                className="text-base text-black hover:text-[#2093D6]"
                onClick={() => signOut({ redirectTo: "/" })}
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
