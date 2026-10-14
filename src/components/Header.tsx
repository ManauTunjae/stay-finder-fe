import { Menu } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Få hjälp", href: "/properties" },
  { label: "Sök", href: "/properties" },
  { label: "Bli medlem eller logga in", href: "/auth/register" },
];

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-blue-200/50 px-4 py-3">
      <Link href="/" className="font-sans text-gray-900 text-2xl">
        StayFinder
      </Link>

      <button aria-label="Öppna meny">
        <Menu className="w-7 h-7 cursor-pointer" />
      </button>
    </header>
  );
}
