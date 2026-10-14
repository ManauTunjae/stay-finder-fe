"use client";

import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Få hjälp", href: "/help" },
  { label: "Sök", href: "/search" },
  { label: "Bli medlem eller logga in", href: "/auth/register" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative flex justify-between items-center bg-blue-200/50 px-4 md:px-10 py-3">
      <Link href="/" className="font-sans text-gray-900 text-2xl font-bold">
        StayFinder
      </Link>

      {/* Höger: "Skapa boende" (bara desktop) + hamburgermeny (alltid) */}
      <div className="flex items-center gap-2">
        <Link
          href="/auth/register"
          className="bg-gray-300 hidden md:block px-4 py-2 rounded-full hover:bg-white text-sm font-medium"
        >
          Skapa boende
        </Link>

        <Link
          href="/auth/register"
          className="bg-gray-300 hidden md:block p-1 rounded-2xl hover:bg-white w-8 h-8 text-gray-700"
        >
          <User />
        </Link>

        <button
          aria-label="Öppna meny"
          className="cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {isOpen && (
        <nav className="absolute right-4 md:right-10 top-full mt-2 w-64 z-10 bg-white flex flex-col gap-3 p-4 rounded-2xl shadow-lg">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 hover:bg-gray-100 text-sm"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
