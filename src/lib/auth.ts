import { User } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getMe(): Promise<User | null> {
  const res = await fetch(`${API_URL}/auth/me`, {
    credentials: "include",
  });
  if (!res.ok) return null;

  const json = await res.json();
  return json.credentials;
}


