import { ExternalLink } from "lucide-react";

const PLAY_STORE_URL = "https://play.google.com/store";

type GooglePlayButtonProps = {
  variant?: "light" | "dark" | "outline";
  className?: string;
  label?: string;
};

export default function GooglePlayButton({
  variant = "light",
  className = "",
  label = "Google Play",
}: GooglePlayButtonProps) {
  const styles = {
    light: "bg-white text-[#008060] hover:bg-emerald-50",
    dark: "bg-[#008060] text-white hover:bg-[#006b4f]",
    outline: "border-2 border-[#008060] text-[#008060] hover:bg-[#008060]/5",
  };

  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold transition ${styles[variant]} ${className}`}
    >
      {label}
      <ExternalLink className="h-4 w-4 opacity-50" />
    </a>
  );
}
