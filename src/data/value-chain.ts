/**
 * The insurance value chain — eight processes nearly every platform organises
 * itself around.
 *
 * `sys` is a required field, not a nicety: the handbook's editorial contract is
 * that every domain fact is paired with its modelling consequence. Making it
 * part of the type means a step cannot be added without answering the second
 * question.
 */

export interface ChainStep {
  key: string;
  title: string;
  summary: string;
  steps: string[];
  example: string;
  /** What this process means for the systems that support it. Required. */
  sys: string;
  /** Lifecycle page that treats this step in full. */
  slug: string;
}

export const chainSteps: ChainStep[] = [
  {
    key: 'Product',
    title: 'Product Development',
    summary:
      'Design coverage → draft policy wording → build the rating algorithm → file with the regulator where required → configure in core systems → launch.',
    steps: [
      'Coverage design and wording',
      'Rating framework built by pricing actuaries',
      'Regulatory filing / approval',
      'Product configuration in the PAS',
      'Launch to distribution channels',
    ],
    example:
      'A health insurer designs a diabetes-friendly plan: actuaries price it by age band and city tier, the wording is drafted and filed with IRDAI, the product is configured in the PAS with its rating tables, then launched through agents and aggregators.',
    sys: 'Product and rating configuration is a major PAS capability — and a classic source of long implementation timelines.',
    slug: 'lifecycle/product-development',
  },
  {
    key: 'Distribute',
    title: 'Distribution & Sales',
    summary: 'Getting the product to customers through the right channel mix.',
    steps: [
      'Agents (tied and independent)',
      'Brokers (dominant in commercial)',
      'Bancassurance — banks selling insurance, very large in India',
      'Direct digital and aggregators (comparison sites)',
      'Embedded — insurance sold inside another purchase',
    ],
    example:
      'The same term plan sells through a tied agent, a bank branch (bancassurance), and an aggregator — three channels, three commission structures, three integration patterns, one product.',
    sys: "Aggregator and partner APIs make distribution one of the largest integration surfaces you'll design.",
    slug: 'lifecycle/distribution-and-quoting',
  },
  {
    key: 'Underwrite',
    title: 'New Business & Underwriting',
    summary: 'From proposal to a live policy.',
    steps: [
      'Submission / proposal — risk details captured',
      'Quote — the rating engine calculates premium',
      'Underwriting review — automated rules (STP) or referral to a human',
      'Bind — the insurer formally agrees; coverage starts',
      'Issue — policy documents generated and delivered',
    ],
    example:
      'An applicant seeks ₹1 crore of term cover: online proposal → instant quote → auto rules flag the high sum assured → tele-medical interview and income proof → underwriter approves at standard rates → e-policy issued the same week.',
    sys: 'Life adds medical and financial underwriting: questionnaires, medical exams, and income justification for large sums assured. The referral queue is its own domain object.',
    slug: 'lifecycle/underwriting',
  },
  {
    key: 'Service',
    title: 'Policy Servicing',
    summary: 'Everything that happens mid-term.',
    steps: [
      'Endorsements — changes with premium adjustment',
      'Cancellations — pro-rata or short-rate refunds',
      'Renewals — re-rate and re-offer; retention is a key metric',
      'Life-specific: premium schedules, lapse and revival, policy loans, surrender, maturity, nominations',
    ],
    example:
      'An owner adds a CNG kit in July (endorsement, extra premium), transfers ownership when the car is sold in October (another endorsement), and at renewal the system applies the buyer\'s fresh No Claim Bonus status.',
    sys: 'Out-of-sequence endorsements — a change effective before an already-processed change — are the notorious hard problem of PAS design.',
    slug: 'lifecycle/policy-servicing',
  },
  {
    key: 'Billing',
    title: 'Billing & Collections',
    summary: 'Money in, commissions out.',
    steps: [
      'Invoicing and installment plans',
      'Agency bill versus direct bill — who collects?',
      'Commission calculation and producer payments',
      'Dunning — chasing unpaid premium',
      'Cancellation for non-payment',
    ],
    example:
      "A shop's ₹24,000 annual premium is split into quarterly installments; the agent's commission accrues per receipt; one missed installment triggers dunning reminders and, eventually, notice of cancellation for non-payment.",
    sys: 'Billing is complex enough that major platforms ship it as a separate module — the ledger and the policy system will disagree, and you need to know which is authoritative.',
    slug: 'lifecycle/billing-and-commissions',
  },
  {
    key: 'Claims',
    title: 'Claims',
    summary: 'The moment of truth — the process customers judge insurers by.',
    steps: [
      'FNOL — First Notice of Loss via call centre, app, portal, or broker',
      'Registration and triage — severity, assignment, fraud scoring',
      'Coverage verification — is this loss covered under this policy?',
      'Investigation — surveys, documents, medical and police reports',
      'Reserving — estimated cost set aside, updated as facts emerge',
      'Settlement — pay, repair, replace, or cashless service',
      'Recovery — subrogation and salvage',
      'Litigation when disputes escalate',
    ],
    example:
      'A driver hits a divider: FNOL via the app with photos → triaged low-severity → coverage verified → surveyor estimates ₹38,000 → reserve set → cashless repair at a network garage → ₹2,000 excess collected → file closed in nine days.',
    sys: 'Reserves are an event stream, not a column. Health adds cashless pre-authorization via TPAs; motor adds garage networks and repair estimation.',
    slug: 'lifecycle/claims',
  },
  {
    key: 'Reinsure',
    title: 'Reinsurance Administration',
    summary: 'Passing risk up the chain and getting recoveries back.',
    steps: [
      'Cede premium per treaty terms',
      'Track retention and accumulation',
      'Claim recoveries on large losses',
      'Bordereaux — periodic data files reported to reinsurers',
    ],
    example:
      "A cyclone causes ₹120 crore of claims across an insurer's coastal book; its catastrophe excess-of-loss treaty attaches above ₹20 crore, so it recovers ₹100 crore from reinsurers — evidenced through claims bordereaux.",
    sys: 'Reinsurance admin is often the most legacy-bound, spreadsheet-driven corner of an insurer — and therefore a real modernisation opportunity.',
    slug: 'lifecycle/reinsurance-operations',
  },
  {
    key: 'Report',
    title: 'Finance, Actuarial & Regulatory Reporting',
    summary: 'Proving solvency and closing the books.',
    steps: [
      'Reserving and IBNR estimation',
      'Solvency reporting — Solvency II (EU), RBC (US), IRDAI solvency margin (India)',
      'IFRS 17 — the insurance accounting standard driving large system programmes',
      'Statistical returns to regulators',
    ],
    example:
      'Quarter-end: actuaries estimate IBNR for late-reported motor claims, finance computes the solvency ratio, and the IFRS 17 engine regroups policies into cohorts for the new accounting disclosures.',
    sys: 'Every core system you design ultimately feeds this layer — data lineage and auditability are first-class requirements, not afterthoughts.',
    slug: 'lifecycle/finance-and-regulatory',
  },
];
