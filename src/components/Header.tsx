"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, User, Search } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Få hjälp", href: "/help" },
  { label: "Sök", href: "/search" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading, openAuthModal, logoutUser } = useAuth();

  return (
    <header className="relative flex justify-between items-center bg-blue-200/50 px-4 md:px-10 py-3">
      <Link href="/" className="font-sans text-gray-900 text-2xl font-bold">
        StayFinder
      </Link>

      {/* Höger: "Skapa boende" (bara desktop) + hamburgermeny (alltid) */}
      <div className="flex items-center gap-2">
        {user ? (
          <Link
            href="/auth/register"
            className="bg-gray-300 hidden md:block px-4 py-2 rounded-full hover:bg-white text-sm font-medium"
          >
            Skapa boende
          </Link>
        ) : (
          <button
            onClick={() => openAuthModal("login")}
            className="bg-gray-300 hidden md:block px-4 py-2 rounded-full hover:bg-white text-sm font-medium cursor-pointer"
          >
            Skapa boenden
          </button>
        )}

        {user ? (
          <Link
            href="/bookings"
            aria-label="Mina bokningar"
            className="bg-gray-300 hidden md:block px-4 py-2 rounded-full hover:bg-white text-sm font-medium cursor-pointer"
          >
            <User />
          </Link>
        ) : (
          <button
            onClick={() => openAuthModal("login")}
            aria-label="Min profil"
            className="bg-gray-300 hidden md:block px-4 py-2 rounded-full hover:bg-white text-sm font-medium cursor-pointer"
          >
            <User />
          </button>
        )}

        <Link
          href="/search"
          className="bg-gray-300 hidden md:block px-4 py-2 rounded-full hover:bg-white text-sm font-medium cursor-pointer"
        >
          <Search />
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

          <hr className="my-2 border-gray-200" />

          {isLoading ? null : user ? (
            // Inloggad
            <>
              <p className="px-4 py-2 text-xs text-gray-500">{user.email}</p>
              <Link
                href="/bookings"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 hover:bg-gray-100 rounded-lg text-sm"
              >
                Mina Bokningar
              </Link>
              <button
                onClick={() => {
                  logoutUser();
                  setIsOpen(false);
                }}
                className="px-4 py-3 hover:bg-gray-100 rounded-lg text-sm text-left cursor-pointer"
              >
                Logga ut
              </button>
            </>
          ) : (
            // Utloggad
            <>
              <button
                onClick={() => {
                  openAuthModal("login");
                  setIsOpen(false);
                }}
                className="px-4 py-3 hover:bg-gray-100 rounded-lg text-sm text-left cursor-pointer"
              >
                Logga in
              </button>
              <button
                onClick={() => {
                  openAuthModal("register");
                  setIsOpen(false);
                }}
                className="px-4 py-3 hover:bg-gray-100 rounded-lg text-sm text-left cursor-pointer"
              >
                Bli medlem
              </button>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
