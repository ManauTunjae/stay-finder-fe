import Image from "next/image";

type Props = {
  children: React.ReactNode;
};

export default function BlurredBackground({ children }: Props) {
  return (
    <div className="relative isolate min-h-[calc(100vh-4rem)]">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <Image
          src="/hero.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover blur-lg scale-110"
        />
        <div className="absolute inset-0 bg-white/60" />
      </div>

      {children}
    </div>
  );
}
