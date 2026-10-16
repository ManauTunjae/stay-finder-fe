import type { User } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getMe(): Promise<User | null> {
  const res = await fetch(`${API_URL}/auth/me`, {
    credentials: "include",
  });
  if (!res.ok) return null;

  const json = await res.json();
  return json.user;
}

export async function login(email: string, password: string): Promise<User> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message ?? "Login failed");
  }
  return json.user;
}
