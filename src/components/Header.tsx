"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Få hjälp", href: "/help" },
  { label: "Sök", href: "/search" },
  { label: "Bli medlem eller logga in", href: "/auth/register" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative flex justify-between items-center bg-blue-200/50 px-4 py-3">
      <Link href="/" className="font-sans text-gray-900 text-2xl">
        StayFinder
      </Link>

      {/*Desktop view*/}
      <nav className="hidden relative md:flex justify-between items-center gap-10">
        {navLinks.map((l) => (
          <Link key={l.label} href={l.href}>
            {l.label}
          </Link>
        ))}
      </nav>

      {/*Mobile view*/}
      <button
        aria-label="Öppna meny"
        className="md:hidden cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
      </button>

      {isOpen && (
        <nav className="absolute right-4 top-full md:hidden z-10 bg-white flex flex-col gap-3 p-4 rounded-lg shadow-md">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setIsOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
