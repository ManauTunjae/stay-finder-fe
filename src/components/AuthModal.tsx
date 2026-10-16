"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { login, register } from "@/lib/auth";

export default function AuthModal() {
  const { modalMode, openAuthModal, closeAuthModal, setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!modalMode) return null;

  const isLogin = modalMode === "login";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!isLogin) {
        await register(email, password);
      }
      const user = await login(email, password);
      setUser(user);
      setEmail("");
      setPassword("");
      closeAuthModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Något gick fel");
    } finally {
      setIsSubmitting(false);
    }
  };
}

return (
  <div
    className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
    onClick={closeAuthModal}
  >
    <div
      className="relative bg-white rounded-2xl shadow-lg w-full max-w-sm p-6"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        aria-label="Close"
        className="absolute top-4 right-4 cursor-pointer"
        onClick={closeAuthModal}
      >
        <X className="w-7 h-7" />
      </button>
      <h2 className="text-xl font-bold text-center mb-6">
        {isLogin ? "Login" : "Register"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="block text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
          E-post
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-100/70 border border-gray-200/80 rounded-xl px-4 py-3.5 text-gray-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm"
          placeholder="Email"
        />
        <label className="block text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
          Lösenord
        </label>
        <input
          type="password"
          required
          value={password}
          minLength={6}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-100/70 border border-gray-200/80 rounded-xl px-4 py-3.5 text-gray-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm"
          placeholder="Password"
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button>
            
        </button>
      </form>
    </div>
  </div>
);
