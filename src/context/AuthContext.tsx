"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@/types/user";
import { getMe, logout } from "@/lib/auth";

type AuthMode = "lgin" | "register";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logoutUser: () => Promise<void>;
  modalMode: AuthMode | null;
  openAuthModal: (mode: AuthMode) => void;
  closeAuthModal: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);