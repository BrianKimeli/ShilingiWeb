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
    id: "finesse",
    slug: "finesse",
    name: "Finesse",
    role: "Senior Money & Behavioral Editor",
    bio: "Unpacking money psychology, budgeting realistically, and building practical financial habits.",
    twitter: "https://x.com/shilingiapp",
    linkedin: "https://linkedin.com/company/shilingi",
    articleCount: 3,
    mpesaPhone: "254700000000",
    featured: true,
  },
  {
    id: "steve-sumbi",
    slug: "steve-sumbi",
    name: "Steve Sumbi",
    role: "Markets & Tech Lead",
    bio: "Analyzing market yields, high-growth investments, digital asset trends, and fintech innovations.",
    twitter: "https://x.com/shilingiapp",
    articleCount: 2,
    mpesaPhone: "254711000000",
    featured: true,
  },
  {
    id: "felix-omariba",
    slug: "felix-omariba",
    name: "Felix Omariba",
    role: "Wealth & Savings Strategist",
    bio: "Demystifying compound growth, money market funds, group investment circles, and asset allocation.",
    twitter: "https://x.com/shilingiapp",
    articleCount: 2,
    mpesaPhone: "254722000000",
    featured: true,
  },
  {
    id: "amina-mohamed",
    slug: "amina-mohamed",
    name: "Amina Mohamed",
    role: "Micro-Investing & Strategy Columnist",
    bio: "Helping creators and side hustlers scale cashflow, manage float, and build resilient wealth.",
    twitter: "https://x.com/shilingiapp",
    articleCount: 1,
    mpesaPhone: "254733000000",
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
