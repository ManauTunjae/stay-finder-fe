import Link from "next/link";
import { SearchX } from "lucide-react";

export default function PropertyNotFound() {
  return (
    <div className="flex flex-col items-center text-center gap-4 px-4 py-20">
      <SearchX className="w-12 h-12 text-gray-400" />
      <h1 className="text-2xl font-bold">Boendet hittades inte</h1>
      <p className="text-gray-600">
        Boendet du letar efter finns inte eller har tagits bort.
      </p>
      <Link
        href="/"
        className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-semibold"
      >
        Tillbaka till startsidan
      </Link>
    </div>
  );
}
