export type Writer = {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl?: string;
  twitter?: string;
  linkedin?: string;
  articleCount: number;
  mpesaPhone?: string;
  featured?: boolean;
};

export const writers: Writer[] = [
  {
    id: "steve-sumbi",
    slug: "steve-sumbi",
    name: "Steve Sumbi",
    role: "Lead Writer & Markets Editor",
    bio: "Lead Writer at The Shilingi Times covering African markets, monetary policy, currency movements, and fintech infrastructure.",
    twitter: "https://x.com/shilingiapp",
    articleCount: 4,
    mpesaPhone: "254711000000",
    featured: true,
  },
  {
    id: "finesse",
    slug: "finesse",
    name: "Finesse",
    role: "Tech Lead & Contributing Editor",
    bio: "Tech Lead building Shilingi's software platform and writing sharp, analytical breakdowns on personal finance, money psychology, and tech-driven wealth creation.",
    twitter: "https://x.com/shilingiapp",
    linkedin: "https://linkedin.com/company/shilingi",
    articleCount: 3,
    mpesaPhone: "254700000000",
    featured: true,
  },
  {
    id: "felix-omariba",
    slug: "felix-omariba",
    name: "Felix Omariba",
    role: "Head of Marketing & Writer",
    bio: "Leading marketing, distribution, and commercial growth for The Shilingi Times while publishing actionable guides on Money Market Funds and group investing.",
    twitter: "https://x.com/shilingiapp",
    articleCount: 2,
    mpesaPhone: "254722000000",
    featured: true,
  },
];

export function getWriterById(id: string): Writer | undefined {
  return writers.find((w) => w.id === id || w.slug === id);
}

export function getWriterByName(name: string): Writer | undefined {
  return writers.find(
    (w) => w.name.toLowerCase() === name.toLowerCase() || name.toLowerCase().includes(w.name.toLowerCase())
  );
}
