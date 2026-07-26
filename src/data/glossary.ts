/**
 * The glossary.
 *
 * Target is 300 terms (CONTENT-PLAN, Part VI). Every entry must carry an
 * `eg` — a term defined without an instance is the vagueness this handbook
 * exists to avoid. `sourced: false` marks entries that are author synthesis
 * and still need a citation before publication.
 */

export interface Term {
  term: string;
  category: Category;
  definition: string;
  /** A concrete instance. Required — not optional by design. */
  eg: string;
  /** Slug of the page that treats this term properly, if one exists yet. */
  seeAlso?: string;
  /** False until a primary source is attached in the page frontmatter. */
  sourced?: boolean;
}

export const CATEGORIES = [
  'Basics',
  'Principle',
  'Policy',
  'Core',
  'Claims',
  'Health',
  'Life',
  'Motor',
  'Liability',
  'Reinsurance',
  'Finance',
  'Actuarial',
  'Distribution',
  'Ecosystem',
  'Systems',
  'Markets',
  'Innovation',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const glossary: Term[] = [
  {
    term: 'Premium',
    category: 'Basics',
    definition: 'The price paid for insurance cover — pure premium + expenses + margin.',
    eg: '₹12,000/year for ₹1 crore of term life cover.',
  },
  {
    term: 'Sum Insured / Limit',
    category: 'Basics',
    definition: 'The maximum amount the insurer will pay under the policy.',
    eg: "a ₹10 lakh family floater caps the whole family's claims at ₹10 lakh for the year.",
  },
  {
    term: 'Deductible / Excess',
    category: 'Basics',
    definition: 'The first slice of each loss borne by the insured before the insurer pays.',
    eg: '₹5,000 excess on a ₹40,000 repair → the insurer pays ₹35,000.',
  },
  {
    term: 'Endorsement',
    category: 'Policy',
    definition: 'A mid-term change to the policy, with a corresponding premium adjustment.',
    eg: 'adding a CNG kit to the insured car in July raises the IDV and the premium.',
    seeAlso: 'lifecycle/policy-servicing',
  },
  {
    term: 'Exclusion',
    category: 'Policy',
    definition: 'A peril or circumstance the policy explicitly does not cover.',
    eg: 'driving under the influence voids a motor own-damage claim.',
  },
  {
    term: 'Insurable Interest',
    category: 'Principle',
    definition: "You may only insure something whose loss would financially hurt you.",
    eg: "your own flat: yes; a stranger's flat: no.",
    seeAlso: 'foundations/core-principles',
  },
  {
    term: 'Indemnity',
    category: 'Principle',
    definition:
      'Insurance restores you to your pre-loss position — no profiting from a claim. Life insurance is the exception: it is a benefit contract.',
    eg: 'a stolen 5-year-old TV is paid at depreciated value, not the price of a new one.',
    seeAlso: 'foundations/core-principles',
  },
  {
    term: 'Utmost Good Faith',
    category: 'Principle',
    definition: 'Both parties must disclose all material facts honestly; non-disclosure can void the policy.',
    eg: 'an undisclosed heart condition can get a death claim repudiated.',
    seeAlso: 'foundations/core-principles',
  },
  {
    term: 'Proximate Cause',
    category: 'Principle',
    definition: 'The dominant cause of the loss decides whether it is covered.',
    eg: 'a storm smashes a window and rain ruins the carpet — the storm is the proximate cause of both.',
    seeAlso: 'foundations/core-principles',
  },
  {
    term: 'Subrogation',
    category: 'Claims',
    definition: 'After paying your claim, the insurer steps into your shoes to recover from the at-fault third party.',
    eg: "your insurer pays your ₹1 lakh repair, then recovers it from the at-fault truck's insurer.",
  },
  {
    term: 'Salvage',
    category: 'Claims',
    definition: "The insurer's right to the damaged goods after paying a total loss.",
    eg: 'the written-off car\'s wreck is auctioned by the insurer.',
  },
  {
    term: 'FNOL',
    category: 'Claims',
    definition: 'First Notice of Loss — the moment a claim is first reported to the insurer.',
    eg: 'a driver uploads accident photos in the app minutes after the crash.',
    seeAlso: 'lifecycle/claims',
  },
  {
    term: 'Reserve',
    category: 'Claims',
    definition: "Money set aside for an open claim's estimated ultimate cost, revised as facts emerge.",
    eg: "₹38,000 reserved when the surveyor's estimate lands.",
    seeAlso: 'lifecycle/claims',
  },
  {
    term: 'IBNR',
    category: 'Actuarial',
    definition: "Incurred But Not Reported — losses that have happened but haven't been claimed yet.",
    eg: "a December accident claimed in February still belongs to last year's accounts.",
  },
  {
    term: 'Cashless Claim',
    category: 'Health',
    definition: 'The insurer or TPA settles directly with a network hospital via pre-authorization.',
    eg: 'an appendectomy billed straight to the TPA; the patient pays nothing at discharge.',
  },
  {
    term: 'Pre-Authorization',
    category: 'Health',
    definition: 'TPA approval of treatment costs before or at admission.',
    eg: 'the hospital sends an estimate; the TPA approves ₹1.2 lakh within hours.',
  },
  {
    term: 'Underwriting',
    category: 'Core',
    definition: 'Evaluating a risk: whether to accept it, at what price, and on what terms.',
    eg: "a smoker's term premium loads 40–60% over standard rates.",
    seeAlso: 'lifecycle/underwriting',
  },
  {
    term: 'Bind',
    category: 'Core',
    definition: 'The insurer\'s formal agreement to cover the risk — coverage begins at bind, not at document issue.',
    eg: "the broker's client is on risk from midnight even before documents are issued.",
  },
  {
    term: 'Straight-Through Processing',
    category: 'Systems',
    definition: 'Quote to issue with no human touch — the economics of high-volume personal lines depend on it.',
    eg: 'a clean two-wheeler policy quoted, paid and issued in four minutes.',
  },
  {
    term: 'Effective Dating',
    category: 'Systems',
    definition:
      'Versioning policies and products along a time axis, so the system can answer "what were the terms on this date" and accept changes that arrive out of order.',
    eg: 'a 1 May change arriving after the 1 June renewal forces both terms to re-rate.',
    seeAlso: 'systems/domain-model',
  },
  {
    term: 'Reinsurance — Treaty',
    category: 'Reinsurance',
    definition: "Automatic cover for a whole portfolio of the insurer's risks, agreed in advance.",
    eg: 'every fire policy the insurer writes is 60% ceded under its quota share.',
  },
  {
    term: 'Reinsurance — Facultative',
    category: 'Reinsurance',
    definition: 'Reinsurance negotiated risk by risk, for individual large exposures.',
    eg: 'a ₹500 crore refinery placed risk-by-risk across global reinsurers.',
  },
  {
    term: 'Cession / Retention',
    category: 'Reinsurance',
    definition: "What is passed to reinsurers versus what is kept on the insurer's own book.",
    eg: 'keep ₹5 crore of a ₹50 crore factory risk, cede ₹45 crore.',
  },
  {
    term: 'Bordereaux',
    category: 'Reinsurance',
    definition: 'Periodic data files reported to reinsurers listing premiums and claims.',
    eg: 'the monthly claims file an MGA sends its capacity provider.',
  },
  {
    term: 'Loss Ratio',
    category: 'Finance',
    definition: 'Claims ÷ earned premium. The core measure of underwriting quality.',
    eg: '₹620 cr of claims on ₹1,000 cr of earned premium → 62%.',
    seeAlso: 'foundations/money-and-metrics',
  },
  {
    term: 'Combined Ratio',
    category: 'Finance',
    definition: 'Loss ratio + expense ratio. Below 100% means an underwriting profit.',
    eg: '62% + 30% = 92% → 8 paise of profit per premium rupee, before investment income.',
    seeAlso: 'foundations/money-and-metrics',
  },
  {
    term: 'GWP / NWP',
    category: 'Finance',
    definition: 'Gross versus Net Written Premium — net is after reinsurance cessions.',
    eg: '₹1,000 cr written, ₹300 cr ceded → NWP ₹700 cr.',
  },
  {
    term: 'Earned Premium',
    category: 'Finance',
    definition: 'The portion of premium earned so far across the policy period; the rest is a liability.',
    eg: 'six months into an annual policy, half the premium is earned.',
    seeAlso: 'foundations/money-and-metrics',
  },
  {
    term: 'Lapse',
    category: 'Life',
    definition: 'Termination of cover because premium went unpaid past the grace period.',
    eg: 'premium unpaid 30 days past due → cover ceases.',
  },
  {
    term: 'Surrender Value',
    category: 'Life',
    definition: 'The cash paid if a savings-type policy is terminated early.',
    eg: 'exiting a 20-year endowment in year 8 returns a discounted value.',
  },
  {
    term: 'Free-Look Period',
    category: 'Life',
    definition: 'A window after issue in which a new policy can be returned for a refund.',
    eg: 'a mis-sold ULIP cancelled in week two, premium refunded less charges.',
  },
  {
    term: 'No Claim Bonus',
    category: 'Motor',
    definition: 'A renewal discount for claim-free years — the big retention lever in motor.',
    eg: 'five claim-free years → 50% off the own-damage premium.',
  },
  {
    term: 'Long-Tail',
    category: 'Liability',
    definition: 'Claims that surface and settle years after the policy period, driving complex reserving.',
    eg: 'a 2020 professional-negligence act litigated and paid in 2026.',
  },
  {
    term: 'Bancassurance',
    category: 'Distribution',
    definition: 'Banks distributing insurance — a very large Indian channel.',
    eg: 'term cover offered at the branch alongside a home loan.',
  },
  {
    term: 'Embedded Insurance',
    category: 'Distribution',
    definition: 'Cover sold inside another purchase rather than bought on its own.',
    eg: 'the ₹49 damage-protection tick-box at an electronics checkout.',
  },
  {
    term: 'MGA',
    category: 'Ecosystem',
    definition: 'Managing General Agent — an intermediary with delegated underwriting authority.',
    eg: "a cyber-specialist MGA underwrites SME cyber on a carrier's paper.",
  },
  {
    term: 'TPA',
    category: 'Ecosystem',
    definition: "Third-Party Administrator — runs claims or policy admin on the insurer's behalf.",
    eg: 'a TPA adjudicating a corporate group-health claim.',
  },
  {
    term: 'ACORD',
    category: 'Systems',
    definition: 'The global standards body for insurance data exchange — forms plus AL3/XML/JSON standards.',
    eg: 'a US broker submits risk data to carriers on an ACORD 125 form.',
  },
  {
    term: 'Parametric',
    category: 'Innovation',
    definition: 'Payout triggered automatically by an index rather than by loss assessment.',
    eg: 'rainfall below 60% of normal → automatic payout, no survey.',
  },
  {
    term: 'IFRS 17',
    category: 'Finance',
    definition: 'The international accounting standard for insurance contracts — a major systems programme.',
    eg: 'policies regrouped into annual cohorts with a Contractual Service Margin.',
  },

  // ─── Cross-market terms ────────────────────────────────────────────────────
  // Included where the concept differs enough between markets to change the model,
  // not merely the label. See foundations/market-vocabulary.
  {
    term: 'Admitted / Non-admitted',
    category: 'Markets',
    definition:
      'US: whether the insurer is licensed in that state. Admitted carriers file rates and forms and are backed by the state guaranty fund; non-admitted ones are not.',
    eg: 'a coastal property the admitted market declines is written non-admitted instead.',
    seeAlso: 'systems/market-structures',
  },
  {
    term: 'Surplus Lines',
    category: 'Markets',
    definition:
      'US: business placed with a non-admitted carrier for risks the admitted market will not take. Generally free of rate and form filing, and taxed separately.',
    eg: 'an unusual cyber exposure placed surplus lines, attracting a surplus lines tax.',
    seeAlso: 'systems/market-structures',
  },
  {
    term: 'Slip',
    category: 'Markets',
    definition:
      'London market: the placing document recording a risk, its terms, and which syndicates have subscribed to what share.',
    eg: 'a broker walks a slip round the Lloyd\'s boxes until the risk is fully subscribed.',
    seeAlso: 'systems/market-structures',
  },
  {
    term: 'Written line vs Signed line',
    category: 'Markets',
    definition:
      'London market: underwriters write for more than they intend to keep when a risk is oversubscribed; lines are scaled down proportionally to the binding signed line.',
    eg: 'a syndicate writes 15% on a risk subscribed to 150% — its signed line is 10%.',
    seeAlso: 'systems/market-structures',
  },
  {
    term: 'Co-insurance (subscription)',
    category: 'Markets',
    definition:
      'One risk shared across several insurers, each on its own share. Distinct from the US health sense of co-insurance, which is a policyholder cost-share.',
    eg: 'four syndicates on 40/30/20/10 split both the premium and every claim on those shares.',
    seeAlso: 'systems/market-structures',
  },
  {
    term: 'Sum Insured vs Limit',
    category: 'Markets',
    definition:
      'Not synonyms. Sum insured is the declared value driving premium; limit is the maximum payable, constraining the claim. Either can exist without the other.',
    eg: 'a liability policy has a ₹5 crore limit but no sum insured — legal liability has no declarable value.',
    seeAlso: 'foundations/market-vocabulary',
  },
  {
    term: 'IDV / Agreed Value / ACV',
    category: 'Markets',
    definition:
      'Three mechanisms for valuing a vehicle at claim time: IDV (India) from a depreciation schedule fixed at inception, agreed value negotiated up front, Actual Cash Value assessed at the loss.',
    eg: 'the same car total-lossed on the same day yields three different settlements.',
    seeAlso: 'foundations/market-vocabulary',
  },
  {
    term: 'Solvency II',
    category: 'Markets',
    definition: 'The EU/UK prudential regime setting capital requirements and supervisory reporting for insurers.',
    eg: 'quarterly and annual quantitative reporting templates drawn from core system data.',
  },
  {
    term: 'RBC',
    category: 'Markets',
    definition: 'Risk-Based Capital — the US solvency framework, administered at state level.',
    eg: 'an insurer holding capital scaled to its underwriting and asset risk.',
  },
  {
    term: 'Guaranty Fund',
    category: 'Markets',
    definition:
      'US: a state-backed fund that pays claims if an admitted insurer becomes insolvent. Surplus lines business is not covered.',
    eg: 'an admitted carrier fails; the state fund meets its policyholder claims up to statutory caps.',
  },
];
