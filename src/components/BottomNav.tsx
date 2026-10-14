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
