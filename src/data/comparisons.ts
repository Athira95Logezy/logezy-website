/**
 * Competitor comparison pages — rendered at /compare/<slug>.
 *
 * TO ADD A COMPETITOR: copy the example entry below, fill in real, verifiable
 * facts about the competitor, and set `draft: false`. Draft entries render but
 * carry a noindex robots tag and are excluded from the sitemap, so nothing
 * half-finished ever reaches search engines.
 *
 * Keep the tone factual. State what each product does and doesn't offer;
 * never guess a competitor's capabilities — check their public docs/pricing
 * and record the date in `lastReviewed`.
 */

/** true = Logezy/competitor has it, false = doesn't, string = nuance worth stating */
export type CellValue = boolean | string;

export interface ComparisonRow {
  feature: string;
  logezy: CellValue;
  competitor: CellValue;
}

export interface Comparison {
  slug: string;
  competitor: string;
  /** Draft pages render with noindex and stay out of the sitemap */
  draft: boolean;
  /** Date competitor facts were last checked, e.g. "July 2026" */
  lastReviewed: string;
  metaDescription: string;
  /** Intro paragraphs, separated by \n\n */
  intro: string;
  /** One line describing who the competitor serves best — keep it fair */
  competitorStrength: string;
  rows: ComparisonRow[];
  differentiators: { title: string; body: string }[];
  /** Closing paragraph before the CTA */
  verdict: string;
}

export const comparisons: Comparison[] = [
  {
    slug: 'example-competitor',
    competitor: 'Example Competitor',
    draft: true, // ← set to false once real competitor facts are filled in
    lastReviewed: 'July 2026',
    metaDescription:
      'Compare Logezy and Example Competitor for UK staffing agencies: scheduling, compliance tracking, digital timesheets, branded mobile apps and pricing.',
    intro:
      "Choosing workforce management software is a long-term decision — the platform you pick will run your scheduling, compliance, timesheets and payroll every day. This page compares Logezy and Example Competitor factually, feature by feature, so you can judge which fits your agency.\n\nBoth platforms serve staffing and workforce-driven businesses, but they take different approaches. The comparison below reflects publicly available information and our own product; always confirm details with each vendor before deciding.",
    competitorStrength:
      'Example Competitor is a solid choice for [describe the segment it genuinely serves well — be fair and specific].',
    rows: [
      { feature: 'Shift scheduling with availability matching', logezy: true, competitor: true },
      { feature: 'Compliance document tracking with expiry alerts', logezy: true, competitor: '[check their docs]' },
      { feature: 'GPS-verified digital timesheets', logezy: true, competitor: '[check their docs]' },
      { feature: 'Fully branded candidate mobile app (iOS & Android)', logezy: true, competitor: false },
      { feature: 'Client portal with live shift visibility', logezy: true, competitor: '[check their docs]' },
      { feature: 'Automated invoicing from approved timesheets', logezy: true, competitor: '[check their docs]' },
      { feature: 'Push + SMS + email three-way notifications', logezy: true, competitor: '[check their docs]' },
      { feature: 'Digital candidate onboarding portal', logezy: true, competitor: '[check their docs]' },
      { feature: 'UK-based support', logezy: true, competitor: '[check their docs]' },
      { feature: 'Built specifically for temp recruitment agencies', logezy: true, competitor: '[their focus]' },
    ],
    differentiators: [
      {
        title: 'Built for UK temporary recruitment',
        body: 'Logezy is designed around the workflows of UK temp staffing agencies — DBS and right-to-work tracking, framework compliance, and the shift-based scheduling patterns healthcare, education and industrial agencies actually use. It is not a generic HR tool adapted after the fact.',
      },
      {
        title: 'Your brand, not ours',
        body: "Workers download an app carrying your agency's name and logo. That keeps candidates engaged with your agency rather than a third-party platform, and reinforces your brand with every shift confirmation.",
      },
      {
        title: 'One platform, end to end',
        body: 'Vacancy to placement to timesheet to invoice, without re-keying data between systems. Approved hours flow straight into payroll and invoicing, which is where most agencies lose their admin time.',
      },
    ],
    verdict:
      'If your agency places temporary workers in the UK and compliance, speed-to-fill, and admin reduction are your priorities, Logezy was purpose-built for exactly that. The fastest way to compare properly is to see both products: book a free Logezy demo and put the same questions to each vendor.',
  },
];
