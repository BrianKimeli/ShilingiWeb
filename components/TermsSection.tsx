interface TermsSectionProps {
  title: string;
  content: string;
}

export default function TermsSection({ title, content }: TermsSectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#003322]">{title}</h2>
      <p className="leading-relaxed text-gray-700">{content}</p>
    </section>
  );
}
