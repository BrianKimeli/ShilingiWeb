import Image from "next/image";

type ShilingiLogoProps = {
  size?: number;
  className?: string;
  priority?: boolean;
  /** Soft frame on light UI; drops to bare icon in night mode so it stays readable */
  framed?: boolean;
};

export default function ShilingiLogo({
  size = 48,
  className = "",
  priority = false,
  framed = true,
}: ShilingiLogoProps) {
  const frameClass = framed
    ? [
        "shilingi-logo",
        "rounded-[22%]",
        "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06]",
        "dark:bg-transparent dark:shadow-[0_4px_24px_rgba(0,0,0,0.55)] dark:ring-white/20",
      ].join(" ")
    : "shilingi-logo rounded-[22%]";

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden ${frameClass} ${className}`}
      style={{ width: size, height: size, colorScheme: "only light" }}
    >
      <Image
        src="/shilingi-icon.png"
        alt="Shilingi"
        width={size}
        height={size}
        className="shilingi-logo__img h-full w-full object-cover"
        priority={priority}
        sizes={`${size}px`}
      />
    </span>
  );
}
