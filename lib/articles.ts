export type Article = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTimeMinutes: number;
  featured?: boolean;
};

/** Live stories by Finesse until more writers are added. */
export const articles: Article[] = [
  {
    id: "1",
    slug: "mpesa-50-30-20-rule",
    title: "The 50/30/20: Why Your M-Pesa Statement is Lying to You",
    description:
      "Nairobi is expensive, and 'unplanned' is a lifestyle. Here's how to make the 50/30/20 rule work without moving to a cave.",
    content: `Let's be honest. We've all been there, opening your M-Pesa statement at the end of the month and wondering how 'Fuliza' became your most frequent contact. The traditional 50/30/20 rule sounds great on paper, but in a world where a quick 'out with friends' can accidentally cost half your utility budget, it needs a reality check.

### The Realistic Breakdown

1. **50% - The Survival Fund:** This isn't just rent. It's the KPLC tokens that always run out at 9 PM on a Sunday, the matatu fare that doubles because of a light drizzle, and the groceries from the mama mboga. If this exceeds 50%, you aren't necessarily overspending; you might just be 'over-rented'. Look at your fixed costs, if you're spending 40% of your income on a house in Kilimani while earning a junior salary, the math will never add up.

2. **30% - The Vibes & Insha'Allah:** This is where we usually experience 'character development'. Every unplanned 'sherehe', the impulsive Java dates, and that pair of shoes you saw on an Instagram ad. The trick isn't to stop living, but to stop 'ghost spending' those small 200-shilling transactions that vanish into the ether.

3. **20% - The Future You:** This is non-negotiable. Saccos are your best friend here. Whether it's 2,000 or 20,000, paying yourself first is the only way to break the cycle of living paycheck to paycheck.

### How Shilingi Flips the Script

Most apps just give you a boring list of transactions. Shilingi looks at your Paybills and Till numbers and speaks the truth: 'Hey, you've spent 8k on food deliveries this month. That's a whole week of your survival fund.'

By automating the tracking, you stop guessing and start knowing. You don't need a complex spreadsheet; you just need to check your Insights tab before you hit 'Send' on that next impulse buy. Money management isn't about restriction; it's about freedom. The freedom to know that when you do spend that 30% on fun, your future is already taken care of.`,
    author: "Finesse",
    date: "Jan 12, 2026",
    category: "Budgeting",
    readTimeMinutes: 4,
    featured: true,
  },
  {
    id: "2",
    slug: "chamas-digital-wealth",
    title: "Chamas: More Than Just Tea and Gossip",
    description:
      "Saving circles built homes and school fees long before apps existed. Here’s what changes when the books go digital.",
    content: `Chamas have been the backbone of Kenyan wealth creation for decades. Our mothers built houses and took us to school through 'Merry-Go-Rounds'. But the era of writing contributions in a counter-book with tea stains is over.

### The Trust Gap

If your chama is still manual, you're losing out on the most important thing: **Transparency**. We've all heard the horror stories about the treasurer who 'invested' the group's money in a personal emergency, or the confusion during the end-of-year payout. Transparency leads to trust, and trust leads to bigger investments; land, commercial assets, and real wealth.

### Moving Beyond the Cycle

A great chama shouldn't just be about rotating the same 5,000 shillings. It should be a mini-investment bank.

**With Shilingi's Chama tools, your group can:**
* Track in Real-Time: Every member sees who has paid and what the balance is. No more awkward 'checking with the treasurer' calls.
* Goal Setting: Visualizing the group's progress toward buying that plot of land in Malaa makes the monthly contribution feel less like a chore and more like a win.
* Automated Reminders: Let the app be the 'bad guy' who sends the reminders, so you can keep your friendships focused on the tea and the gossip.`,
    author: "Finesse",
    date: "Jan 05, 2026",
    category: "Wealth",
    readTimeMinutes: 6,
  },
  {
    id: "3",
    slug: "inflation-proof-savings",
    title: "Inflation-Proofing Your Savings",
    description:
      "Money sitting in a basic savings account can still lose buying power. A plain look at what actually keeps pace.",
    content: `Imagine you put 1,000 KES under your mattress in 2020. Today, that same 1,000 KES buys significantly fewer eggs and less milk than it did back then. That is inflation, the silent thief of your hard-earned sweat.

### The Math of Loss

If your bank is giving you 3% interest while inflation is at 8%, you are effectively **losing 5% of your wealth every year** just by letting it sit there. Your balance stays the same, but your 'purchasing power' is shrinking.

### Where to Hide Your Money (Legally)

You don't need to be a 'Wolf of Wall Street' to protect yourself.

1. **Money Market Funds (MMFs):** These are the gold standard for beginners. They typically offer 9-13% interest, they are regulated by the CMA, and you can withdraw your money within 2-3 days. It's like a savings account, but one that actually works for you.
2. **Saccos:** By earning dividends (often 10%+) and giving you access to low-interest loans, Saccos are the ultimate Kenyan hack for building long-term wealth.
3. **Treasury Bills/Bonds:** Lending money to the government. It sounds fancy, but you can start via your phone. It's one of the safest ways to earn a fixed return.

**The Bottom Line:** Stop saving to 'keep' money. Start saving to 'grow' money. Use the Shilingi Saving goals to compare your different pots and see which one is actually beating the inflation monster.`,
    author: "Finesse",
    date: "Dec 28, 2025",
    category: "Investment",
    readTimeMinutes: 5,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getFeaturedArticle(): Article {
  return articles.find((a) => a.featured) ?? articles[0];
}
