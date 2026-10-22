import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[40vh] min-h-[280px] md:h-[50vh] overflow-hidden">
      <Image
        src="/stockholm.jpg"
        alt="Stockholms stadshus i skymningen"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4 gap-4">
        <h1 className="text-3xl md:text-5xl font-bold">
          <span className="text-blue-700"> Stay</span>
          <span className="text-orange-600">Finder</span>
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold">
          Hitta ditt nästa boende
        </h2>
        <p className="text-base md:text-lg max-w-xl font-semibold">
          Stugor, villor och lägenheter, från storstad till skärgård.
        </p>
        <Link
          href="/search"
          className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100"
        >
          Sök boenden
        </Link>
      </div>
      <p className="absolute bottom-2 right-3 z-10 text-xs text-white/70">
        Foto: StayFinder
      </p>
    </section>
  );
}
