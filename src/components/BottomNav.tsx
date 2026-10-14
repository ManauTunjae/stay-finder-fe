"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Home, Heart, Mail, CircleUser } from "lucide-react";

const navItems = [
  { label: "search", href: "/search", icon: Search },
  { label: "home", href: "/", icon: Home },
  { label: "favorite", href: "/favorite", icon: Heart },
  { label: "message", href: "/message", icon: Mail },
  { label: "profile", href: "/auth-me", icon: CircleUser },
];

export default function BottomNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/propperties/")) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t flex justify-around py-3 border-t border-gray-200">
      {navItems.map((i) => {
        const Icon = i.icon;
        const isActive = pathname === i.label;
        return (
          <Link key={i.href} href={i.href} aria-label={i.label}>
            <Icon
              className={isActive ? "w-6 h-6 text-sm" : "w-6 h-6 text-gray-500"}
            />
          </Link>
        );
      })}
    </nav>
  );
}
