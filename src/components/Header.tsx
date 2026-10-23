"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, User, Search, BuildingComplexPlus, Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Avatar from "./Avatar";
import { getMyBookings } from "@/lib/bookings";

const navLinks = [
  { label: "Få hjälp", href: "/help" },
  { label: "Sök", href: "/search" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading, openAuthModal, logoutUser } = useAuth();
  const [pendingCount, setPendingCount] = useState(0);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleScroll() {
      setIsOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  function iconClass(href: string) {
    const isActive = pathname === href;

    return `hidden md:flex items-center justify-center w-10 h-10 rounded-full cursor-pointer ${
      isActive
        ? "bg-blue-900 text-white"
        : "bg-orange-300 text-gray-700 hover:bg-white"
    }`;
  }

  useEffect(() => {
    if (!user) return;
    
    getMyBookings()
      .then((bookings) => {
        const count = bookings.filter(
          (b) => b.status === "pending" && b.guest_id !== user.id,
        ).length;
        setPendingCount(count);
      })
      .catch(() => setPendingCount(0));
  }, [user, pathname]);

  return (
    <header
      ref={headerRef}
      className="relative z-40 flex justify-between items-center bg-gray-200/80 px-4 md:px-10 py-3"
    >
      <Link href="/" className="font-sans text-3xl font-bold">
        <span className="text-blue-600">Stay</span>
        <span className="text-orange-600">Finder</span>
      </Link>

      {/* Höger: "Skapa boende" (bara desktop) + hamburgermeny (alltid) */}
      <div className="flex items-center gap-5">
        {user ? (
          <Link
            href="/properties/new"
            aria-label="Skapa boende"
            className={iconClass("/properties/new")}
          >
            <BuildingComplexPlus className="w-6 h-6" />
          </Link>
        ) : (
          <button
            onClick={() => openAuthModal("login")}
            aria-label="Logga in"
            className={iconClass("")}
          >
            <BuildingComplexPlus className="w-6 h-6" />
          </button>
        )}

        {user ? (
          <Link
            href="/profile"
            aria-label="Min profil"
            className={`hidden md:flex rounded-full ${
              pathname === "/profile"
                ? "ring-2 ring-blue-900 ring-offset-2"
                : ""
            }`}
          >
            <Avatar email={user.email} size="sm" />
          </Link>
        ) : (
          <button
            onClick={() => openAuthModal("login")}
            aria-label="Logga in"
            className={iconClass("")}
          >
            <User className="w-6 h-6" />
          </button>
        )}

        {user ? (
          <Link
            href="/bookings"
            aria-label={
              pendingCount > 0
                ? `Mina bokningar, ${pendingCount} väntar på bekräftelse`
                : "Mina bokningar"
            }
            className={`relative ${iconClass("/bookings")}`}
          >
            <Mail className="w-6 h-6" />

            {pendingCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center">
                {pendingCount > 9 ? "9+" : pendingCount}
              </span>
            )}
          </Link>
        ) : (
          <button
            onClick={() => openAuthModal("login")}
            aria-label="Logga in"
            className={iconClass("")}
          >
            <Mail className="w-6 h-6" />
          </button>
        )}

        <Link
          href="/search"
          aria-label="Sök boenden"
          className={iconClass("/search")}
        >
          <Search className="w-6 h-6" />
        </Link>

        <button
          aria-label="Öppna meny"
          className="cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      <nav
        inert={!isOpen}
        className={`absolute right-4 md:right-10 top-full mt-2 w-64 z-10 bg-white/90 flex flex-col gap-3 p-4 rounded-2xl shadow-lg origin-top-right transition-all duration-500 ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {navLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setIsOpen(false)}
            className="px-4 py-3 hover:bg-white rounded-lg text-base"
          >
            {l.label}
          </Link>
        ))}

        <hr className="my-2 border-gray-200 rounded-lg" />

        {isLoading ? null : user ? (
          // Inloggad
          <>
            <p className="px-4 py-2 text-xs text-gray-500">{user.email}</p>
            <Link
              href="/bookings"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 hover:bg-white rounded-lg text-base"
            >
              Mina bokningar
            </Link>
            <button
              onClick={() => {
                logoutUser();
                setIsOpen(false);
              }}
              className="px-4 py-3 hover:bg-white rounded-lg text-base text-left cursor-pointer"
            >
              Logga ut
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                openAuthModal("login");
                setIsOpen(false);
              }}
              className="px-4 py-3 hover:bg-white rounded-lg text-base text-left cursor-pointer"
            >
              Logga in
            </button>
            <button
              onClick={() => {
                openAuthModal("register");
                setIsOpen(false);
              }}
              className="px-4 py-3 hover:bg-white rounded-lg text-base text-left cursor-pointer"
            >
              Bli medlem
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
