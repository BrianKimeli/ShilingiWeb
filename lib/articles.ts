export type ArticleCategory =
  | "Tech"
  | "Business"
  | "Markets"
  | "Wealth"
  | "Policy"
  | "Money";

export type Article = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  writerId: string;
  date: string;
  category: ArticleCategory;
  readTimeMinutes: number;
  featured?: boolean;
  trending?: boolean;
  isPremium?: boolean;
  likesCount?: number;
  coverImage?: string;
  subTags?: string[];
};

export const categoriesList: ArticleCategory[] = [
  "Tech",
  "Business",
  "Markets",
  "Wealth",
  "Policy",
  "Money",
];

export const articles: Article[] = [
  {
    id: "1",
    slug: "mpesa-50-30-20-rule",
    title: "The 50/30/20: Why Your M-Pesa Statement is Lying to You",
    description:
      "Living expenses add up quickly, and 'unplanned' is a lifestyle. Here's how to make the 50/30/20 rule work without moving to a cave.",
    content: `Let's be honest. We've all been there, opening your M-Pesa statement at the end of the month and wondering how 'Fuliza' became your most frequent contact. The traditional 50/30/20 rule sounds great on paper, but in a world where a quick 'out with friends' can accidentally cost half your utility budget, it needs a reality check.

> [!NOTE]
> **Executive Summary:** Traditional 50/30/20 budgeting fails in modern digital economies because it ignores micro-transactions and friction-free mobile payments. Automated category tracking turns invisible expenses into actionable cashflow data.

## The Realistic 50/30/20 Breakdown

### 1. 50% — The Survival Fund

This isn't just rent. It's the electricity tokens that always run out at 9 PM on a Sunday, commuting fare, and daily groceries from the local market. If this exceeds 50%, you aren't necessarily overspending; you might just be 'over-rented'. Look at your fixed costs—if you're spending 40% of your income on prime housing while earning a junior salary, the math will never add up.

> [!WARNING]
> **Fixed Cost Trap:** Housing costs above 35% of net income leave zero cushion for medical emergencies or sudden utility rate hikes.

### 2. 30% — The Vibes & Insha'Allah

This is where we usually experience 'character development'. Every unplanned night out, social dates, and impulsive online buys. The trick isn't to stop living, but to stop 'ghost spending' those small daily transactions that vanish into the ether without a trace.

> [!TIP]
> **Pro Tip:** Set up an automatic sweep rule into a secondary Money Market Fund every Friday afternoon before weekend spending begins.

### 3. 20% — The Future You

This is non-negotiable. Savings groups and investment funds are your best friend here. Whether it's 2,000 or 20,000, paying yourself first is the only way to break the cycle of living paycheck to paycheck.

## How Shilingi Flips the Script

Most apps just give you a boring list of transactions. Shilingi looks at your Paybills and Till numbers and speaks the truth: *'Hey, you've spent 8k on food deliveries this month. That's a whole week of your survival fund.'*

By automating the tracking, you stop guessing and start knowing. You don't need a complex spreadsheet; you just need to check your Insights tab before you hit 'Send' on that next impulse buy. Money management isn't about restriction; it's about freedom. The freedom to know that when you do spend that 30% on fun, your future is already taken care of.`,
    author: "Finesse",
    writerId: "finesse",
    date: "Jan 12, 2026",
    category: "Money",
    readTimeMinutes: 4,
    featured: true,
    likesCount: 142,
    subTags: ["Budgeting", "Cashflow", "Personal Finance"],
  },
  {
    id: "2",
    slug: "chamas-digital-wealth",
    title: "Chamas: More Than Just Tea and Gossip",
    description:
      "Saving circles built homes and school fees long before apps existed. Here’s what changes when the books go digital.",
    content: `Chamas have been the backbone of group wealth creation for decades. Our mothers built houses and took us to school through 'Merry-Go-Rounds'. But the era of writing contributions in a counter-book with tea stains is over.

> [!NOTE]
> **Core Principle:** Transparency leads to trust, and trust enables group wealth expansion into high-value asset acquisitions.

## The Trust Gap in Manual Accounting

If your chama is still manual, you're losing out on the most important thing: **Transparency**. We've all heard the horror stories about the treasurer who 'invested' the group's money in a personal emergency, or the confusion during the end-of-year payout. Transparency leads to trust, and trust leads to bigger investments; land, commercial assets, and real wealth.

## Moving Beyond the Cycle

A great chama shouldn't just be about rotating the same 5,000 shillings. It should be a mini-investment bank.

> [!TIP]
> **Group Yield Strategy:** Put active group contributions into regulated Money Market Funds to earn compound interest before major distribution milestones.

### What Digital Chama Tools Enable:

* **Real-Time Visibility:** Every member sees who has paid and what the balance is. No more awkward 'checking with the treasurer' calls.
* **Goal Setting:** Visualizing the group's progress toward buying that investment plot makes the monthly contribution feel less like a chore and more like a win.
* **Automated Reminders:** Let the app be the 'bad guy' who sends the reminders, so you can keep your friendships focused on the tea and the gossip.`,
    author: "Finesse",
    writerId: "finesse",
    date: "Jan 05, 2026",
    category: "Wealth",
    readTimeMinutes: 6,
    likesCount: 98,
    subTags: ["Group Wealth", "Chamas", "Assets"],
  },
  {
    id: "3",
    slug: "inflation-proof-savings",
    title: "Inflation-Proofing Your Savings",
    description:
      "Money sitting in a basic savings account can still lose buying power. A plain look at what actually keeps pace.",
    content: `Imagine you put 1,000 units of currency under your mattress in 2020. Today, that same 1,000 buys significantly fewer eggs and less milk than it did back then. That is inflation, the silent thief of your hard-earned sweat.

> [!WARNING]
> **Purchasing Power Warning:** If your savings account pays 3% annual interest while inflation runs at 8%, your real purchasing power shrinks by 5% every year.

## The Math of Hidden Loss

If your bank is giving you 3% interest while inflation is at 8%, you are effectively **losing 5% of your wealth every year** just by letting it sit there. Your balance stays the same, but your 'purchasing power' is shrinking.

## Where to Park Your Liquid Funds (Legally)

You don't need to be a 'Wolf of Wall Street' to protect yourself.

1. **Money Market Funds (MMFs):** These are the gold standard for beginners. They typically offer 9-13% interest, they are regulated, and you can withdraw your money within 2-3 days. It's like a savings account, but one that actually works for you.
2. **SACCOs:** By earning dividends (often 10%+) and giving you access to low-interest loans, SACCOs are the ultimate hack for building long-term wealth.
3. **Treasury Bills/Bonds:** Lending money to government funds. It sounds fancy, but you can start via your phone. It's one of the safest ways to earn a fixed return.

> [!NOTE]
> **The Bottom Line:** Stop saving just to 'keep' money. Start allocating cash to grow purchasing power above annual CPI figures.`,
    author: "Finesse",
    writerId: "finesse",
    date: "Dec 28, 2025",
    category: "Wealth",
    readTimeMinutes: 5,
    trending: true,
    likesCount: 175,
    subTags: ["Inflation", "MMFs", "Treasury Bills"],
  },
  {
    id: "4",
    slug: "tech-fintech-micro-yields-2026",
    title: "Fintech Micro-Yields: The Rise of Digital Floating Assets",
    description:
      "Mobile interest engines and automated MMF portfolios are transforming how young professionals store liquid cash.",
    content: `The modern financial stack is undergoing a massive structural shift. Rather than leaving operating funds idle between payroll dates and vendor payables, capital moves into high-liquidity, daily-accruing yield instruments.

> [!NOTE]
> **Industry Trend:** Automated liquidity engines allow retail investors to capture compound returns on short-term float previously accessible only to corporate treasuries.

## Key Advantages of Liquid Micro-Yield Accounts

* **Daily Compound Yields:** Watch accrued interest calculate and deposit into your portfolio every morning.
* **T+0 & T+1 Liquidity:** Instant withdrawals to mobile wallets without lock-in penalties.
* **Inflation Differential Protection:** Maintain positive real yields above core inflation indices.`,
    author: "Steve Sumbi",
    writerId: "steve-sumbi",
    date: "Feb 14, 2026",
    category: "Tech",
    readTimeMinutes: 5,
    trending: true,
    likesCount: 112,
    subTags: ["Fintech", "Micro-Yields", "Automation"],
  },
  {
    id: "5",
    slug: "markets-policy-interest-rate-shifts",
    title: "Central Bank Interest Rate Shifts: What Investors Need to Know",
    description:
      "Demystifying benchmark rate updates, fixed income yields, and corporate bond pricing for retail investors.",
    content: `When central banks adjust benchmark policy rates, fixed income yields across treasury auctions and commercial certificates shift rapidly.

> [!TIP]
> **Macro Policy Strategy:** Peak interest rate cycles offer optimal entry windows for locking in high coupon fixed-income bonds before rate cuts begin.

## 3 Core Rules for Rate Adjustments

1. **Lock In Longer Durations:** Secure fixed 1-year to 3-year yields during peak interest rate cycles.
2. **Maintain 30% Portfolio Liquidity:** Keep working capital in compounding short-term funds.
3. **Monitor Real Yield Differentials:** Net out withholding tax and annual inflation rates to measure real purchasing power gains.`,
    author: "Felix Omariba",
    writerId: "felix-omariba",
    date: "Feb 18, 2026",
    category: "Markets",
    readTimeMinutes: 6,
    isPremium: true,
    likesCount: 94,
    subTags: ["Policy", "Markets", "Bonds"],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getFeaturedArticle(): Article {
  return articles.find((a) => a.featured) ?? articles[0];
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return articles.filter((a) => a.category.toLowerCase() === category.toLowerCase());
}

export function getArticlesByWriter(writerId: string): Article[] {
  return articles.filter((a) => a.writerId === writerId || a.author.toLowerCase() === writerId.toLowerCase());
}
