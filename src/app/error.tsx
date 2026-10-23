"use client";

import { TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import BlurredBackground from "@/components/BlurredBackground";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <BlurredBackground>
      <div className="flex flex-col items-center justify-center text-center gap-4 px-4 py-20">
        <TriangleAlert className="w-20 h-20 text-red-500" />
        <h1 className="text-3xl font-bold">Något gick fel</h1>
        <p className="text-gray-600">Kunde inte hämta informationen just nu</p>
        <button
          onClick={() => reset()}
          className="bg-blue-900 text-white px-6 py-2 rounded-lg font-semibold cursor-pointer"
        >
          Försök igen
        </button>
      </div>
    </BlurredBackground>
  );
}
