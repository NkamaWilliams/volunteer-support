"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

const Navbar = () => {
  const {data: session} = useSession()

  useEffect(() => {console.log("Session changed")}, [session])
  return (
    <nav className="flex justify-between gap-8 p-6 bg-[#F5F3F3]" >
      <h2 className="font-semibold text-lg">Welcome, {!session ? "User" : session.user.name}</h2>

      <div className="flex gap-8 items-center">
        <Link href="/" className="hover:text-[#2093D6] text-black text-base">
        Home
        </Link>
        {
          !session ? (
            <>
              <Link href="/signin" className="hover:text-[#2093D6] text-black text-base">
              Sign in
              </Link>
              <Link href="/signup" className="hover:text-[#2093D6] text-black text-base">
              Sign up
              </Link>
            </>
          ) : (
            <>
              <Link href="/event" className="hover:text-[#2093D6] text-black text-base">
              My Events
              </Link>
              <Link href="/allEvents" className="hover:text-[#2093D6] text-black text-base">
              All Events
              </Link>
              <Link href="/acceptedEvents" className="hover:text-[#2093D6] text-black text-base">
              Accepted Events
              </Link>
              <button className="hover:text-[#2093D6] text-black text-base" onClick={() => signOut()}>Sign Out</button>
            </>
          )
        }
      </div>
    </nav>
  );
}; 

export default Navbar;


