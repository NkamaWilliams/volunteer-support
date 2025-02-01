"use client";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-end gap-8 p-6 bg-[#F5F3F3]" >
      <Link href="/" className="hover:text-[#2093D6] text-black text-base">
      Home
      </Link>
      <Link href="/signin" className="hover:text-[#2093D6] text-black text-base">
      Sign in
      </Link>
      <Link href="/signup" className="hover:text-[#2093D6] text-black text-base">
      Sign up
      </Link>
      <Link href="/createEvent" className="hover:text-[#2093D6] text-black text-base">
      Create an Event
      </Link>
    </nav>
  );
}; 

export default Navbar;


