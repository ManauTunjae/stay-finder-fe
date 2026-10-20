type Props = {
  email: string;
  size?: "sm" | "lg";
};

const sizeClasses = {
  sm: "w-10 h-10 text-xl",
  lg: "w-30 h-30 text-6xl",
};

export default function Avatar({ email, size = "lg" }: Props) {
  const initial = email.charAt(0).toUpperCase();

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold`}
    >
      {initial}
    </div>
  );
}
