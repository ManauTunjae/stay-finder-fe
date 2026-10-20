import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[360px] md:h-[70vh] overflow-hidden">
      {/* 1. Bilden */}
      <Image
        src="/hero.jpg"
        alt="Stockholms stadshus i skymningen"
        fill
        priority
        sizes="50vw"
        className="object-cover"
      />

      {/* 2. Mörk slöja, så texten syns */}
      <div className="absolute inset-0 bg-black/30" />

      {/* 3. Texten och knappen */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4 gap-4">
        <h1 className="text-3xl md:text-5xl font-bold">
          Hitta ditt nästa boende i Sverige
        </h1>
        <p className="text-base md:text-lg max-w-xl">
          Stugor, villor och lägenheter, från storstad till skärgård.
        </p>
        <Link
          href="/search"
          className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100"
        >
          Sök boenden
        </Link>
      </div>

      {/* 4. Tack till fotografen */}
      <p className="absolute bottom-2 right-3 z-10 text-xs text-white/70">
        Foto: time lapse / Unsplash
      </p>
    </section>
  );
}
