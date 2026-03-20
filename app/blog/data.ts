export type BlogSection = {
  title?: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  tag: string;
  title: string;
  description: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  author: string;
  featured?: boolean;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-fixflow-connects-to-tally-in-real-time",
    tag: "Product",
    title: "How Fixflow Connects to Tally in Real Time",
    description:
      "A practical look at how the Fixflow connector syncs Tally data safely, reliably, and continuously.",
    excerpt:
      "Fixflow uses a local read-only connector that captures ledger and voucher updates from Tally and syncs them to the cloud every few minutes.",
    publishedAt: "2026-03-20",
    readTime: "6 min read",
    author: "Fixflow Product Team",
    featured: true,
    sections: [
      {
        title: "Why We Use a Local Connector",
        paragraphs: [
          "Many businesses run Tally in local office setups where direct cloud integrations are not always practical. A local connector gives predictable connectivity and fast onboarding.",
          "The connector runs on the same machine as Tally, reads data, and sends it to Fixflow over encrypted transport.",
        ],
      },
      {
        title: "How Synchronization Works",
        paragraphs: [
          "After pairing, Fixflow performs an initial sync to establish a baseline. Once completed, incremental sync runs automatically in short intervals.",
          "This keeps dashboards, reports, and AI analysis aligned with the latest accounting updates without manual export-import workflows.",
        ],
        bullets: [
          "First sync starts immediately after pairing",
          "Auto sync runs every 5 minutes while connector is active",
          "Company and ledger records are upserted safely",
          "Voucher ingestion is processed in stable time windows",
        ],
      },
      {
        title: "Reliability and Safety",
        paragraphs: [
          "Fixflow is designed with read-only behavior toward Tally. It never modifies source books.",
          "If connectivity drops, sync resumes on the next cycle. Operational status is visible in the Connect Tally page.",
        ],
      },
    ],
  },
  {
    slug: "weekly-finance-metrics-every-sme-should-track",
    tag: "Finance",
    title: "Weekly Finance Metrics Every SME Should Track",
    description:
      "A practical KPI framework for founders and finance leads to make faster operating decisions.",
    excerpt:
      "A compact weekly scorecard can improve cash control, cost discipline, and growth quality more than monthly review rituals.",
    publishedAt: "2026-03-12",
    readTime: "5 min read",
    author: "Fixflow Finance Office",
    sections: [
      {
        title: "The Weekly Scorecard Principle",
        paragraphs: [
          "Monthly reviews are essential, but weekly tracking catches drift early. Small correction cycles prevent end-of-quarter surprises.",
          "Your weekly dashboard should stay concise and decision-focused, not overloaded with accounting detail.",
        ],
      },
      {
        title: "Core Metrics to Review",
        paragraphs: [
          "Track margin quality, receivable movement, and expense velocity in one place. These are direct levers for short-term control.",
        ],
        bullets: [
          "Gross margin trend by week",
          "Receivables aging movement",
          "Collections vs billings",
          "Expense run rate vs plan",
          "Cash available runway",
        ],
      },
      {
        title: "Execution Cadence",
        paragraphs: [
          "Keep a fixed weekly finance review with owners and action deadlines. Metrics without accountability do not improve outcomes.",
          "Use one source of truth so teams are aligned on the same numbers and definitions.",
        ],
      },
    ],
  },
  {
    slug: "designing-an-ai-financial-analyst-you-can-trust",
    tag: "AI",
    title: "Designing an AI Financial Analyst You Can Trust",
    description:
      "How Fixflow approaches AI reliability for financial workflows where precision matters.",
    excerpt:
      "In financial analysis, confidence comes from deterministic data access and clear guardrails, not only language quality.",
    publishedAt: "2026-03-04",
    readTime: "7 min read",
    author: "Fixflow AI Team",
    sections: [
      {
        title: "Reliability Before Fluency",
        paragraphs: [
          "Financial users need consistency. Our approach prioritizes verified calculations and source-linked answers before stylistic output.",
          "This reduces risk from model hallucination and keeps responses grounded in accounting records.",
        ],
      },
      {
        title: "Guardrail Design",
        paragraphs: [
          "We classify requests, apply domain constraints, and enforce structured query behavior for data retrieval paths.",
          "Where data is unavailable in source systems, responses are explicit about limits rather than implying certainty.",
        ],
        bullets: [
          "Scoped tool access for data queries",
          "Category-aware response templates",
          "Validation checks for ambiguous prompts",
          "Clear unavailable-data messaging",
        ],
      },
      {
        title: "What This Means for Teams",
        paragraphs: [
          "Finance teams can use AI for faster first-draft analysis without giving up control.",
          "Decision ownership remains human while repetitive interpretation work is accelerated.",
        ],
      },
    ],
  },
  {
    slug: "security-model-for-a-read-only-tally-connector",
    tag: "Security",
    title: "Security Model for a Read-Only Tally Connector",
    description:
      "A concise overview of Fixflow's connector security principles for production environments.",
    excerpt:
      "Connector architecture is deliberately minimal: local read access, controlled API communication, and no write-back path to source data.",
    publishedAt: "2026-02-24",
    readTime: "6 min read",
    author: "Fixflow Engineering",
    sections: [
      {
        title: "Design Principles",
        paragraphs: [
          "The connector follows least-privilege behavior and avoids unnecessary host-level surface area.",
          "Operations are limited to required sync functions and status heartbeats.",
        ],
      },
      {
        title: "Operational Controls",
        paragraphs: [
          "For external access scenarios, controlled networking is essential. VPN-first access remains the recommended production posture.",
        ],
        bullets: [
          "Read-only source interaction",
          "Encrypted transport channels",
          "Controlled endpoint communication",
          "Firewall and network policy recommendations",
        ],
      },
      {
        title: "Incident Readiness",
        paragraphs: [
          "Teams should maintain basic runbooks for connectivity incidents and credential rotation.",
          "Preventive controls and observability are more effective than reactive troubleshooting.",
        ],
      },
    ],
  },
  {
    slug: "from-tally-books-to-executive-reporting-in-minutes",
    tag: "Operations",
    title: "From Tally Books to Executive Reporting in Minutes",
    description:
      "How finance teams can reduce manual monthly reporting effort with standardized data flow.",
    excerpt:
      "Executive reporting delays are often caused by repetitive extraction and reconciliation. A stable sync pipeline removes that friction.",
    publishedAt: "2026-02-16",
    readTime: "5 min read",
    author: "Fixflow Operations",
    sections: [
      {
        title: "The Reporting Bottleneck",
        paragraphs: [
          "Most delays happen before analysis begins: collecting files, consolidating formats, and checking mismatches.",
          "Once source continuity is established, report generation and commentary become significantly faster.",
        ],
      },
      {
        title: "A Practical Workflow",
        paragraphs: [
          "Move from ad-hoc exports to continuous sync, then layer weekly and monthly views on top of the same core dataset.",
        ],
        bullets: [
          "Single synchronized source",
          "Reusable report templates",
          "Weekly and monthly review cadence",
          "Action logs tied to finance outcomes",
        ],
      },
      {
        title: "Business Impact",
        paragraphs: [
          "Leadership receives faster visibility while finance teams spend less effort on repetitive formatting tasks.",
          "Time saved can be redirected toward pricing, cost optimization, and collections strategy.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatBlogDate(dateISO: string): string {
  return new Date(dateISO).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
