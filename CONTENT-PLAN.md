# Content Plan

## The thesis

**Insurance domain knowledge, written for the people who build the systems.**

This is the gap in the market. The Insurance Institute of India teaches insurance to insurance people. Guidewire teaches its own platform. IRMI defines terms. Nothing connects *"here is what proximate cause means"* to *"here is why your claims data model needs a cause-of-loss hierarchy and what breaks when it doesn't."*

Every page in this handbook must earn its place by answering one of two questions:

1. **What does a practitioner actually do?** (the domain fact)
2. **What does that mean for the system?** (the modelling consequence)

A page that only does (1) belongs in a textbook, not here. Cut it or link out to the textbook.

## Non-goals

- Competing with III / LOMA / CPCU as a general insurance primer. We will lose.
- Exhaustive coverage of every LOB. Two deep beats twelve shallow.
- Actuarial rigour. We explain reserving well enough to justify data requirements, then link to the actuarial literature.
- Any single market's regulation in full. India-first, with US/UK contrasts where they change the model.

## Structure

### Part I — Foundations (`foundations/`)
Short. Assumes an intelligent reader who has never sold a policy.

| Page | Systems angle it must deliver |
|---|---|
| `risk-and-pooling` | Why premium is a *forecast*, and why that makes rating tables versioned data |
| `the-policy-contract` | The contract's anatomy → the shape of the policy aggregate |
| `core-principles` | Indemnity, insurable interest, utmost good faith, proximate cause → validation rules and claim decisioning |
| `money-and-metrics` | Earned/unearned, reserves, combined ratio → why the ledger and the policy system disagree, and which is right |
| `market-vocabulary` | Excess vs deductible, sum insured vs limit, IDV vs agreed value — mapping terms across India / US / London |

### Part II — Ecosystem (`ecosystem/`)
Who exists, what they're incentivised to do, and which system boundary they sit on.

- `carriers-and-reinsurers`
- `distribution` — agents, brokers, bancassurance, aggregators, embedded
- `mgas-and-delegated-authority` — **high value**, badly documented elsewhere, and a growing integration pattern
- `tpas-and-service-providers`
- `regulators` — IRDAI first; NAIC/FCA contrast
- `standards-bodies` — ACORD, and what an ACORD message actually looks like

### Part III — Lifecycle (`lifecycle/`)
The spine of the handbook. One page per process, each ending in a **data and integration** section.

- `product-development` — filing, versioning, and why product config is a release-management problem
- `distribution-and-quoting`
- `underwriting` — rules, referrals, STP, and the referral-queue model
- `binding-and-issuance`
- `policy-servicing` — endorsements, the effective-dating chapter, **out-of-sequence** worked in full
- `billing-and-commissions`
- `claims` — FNOL → reserve → settle → recover, with the reserve-movement data model
- `reinsurance-operations` — cessions, recoveries, bordereaux formats
- `finance-and-regulatory` — reserving mechanics (chain ladder), solvency, IFRS 17 data demands

### Part IV — Lines of Business (`lines-of-business/`)
**Depth over breadth.** Ship two complete, then expand.

Priority order:
1. **Motor (India)** — highest volume, richest workflow, most familiar
2. **Health (India)** — cashless, TPA, network, pre-auth: the most integration-heavy
3. Term life · 4. Commercial property + BI · 5. Marine cargo · 6. Cyber

Every LOB page follows the same template (`_TEMPLATE.md`):

1. What the product actually covers, section by section
2. The real rating factors and how they combine — **with a worked quote to final premium**
3. Underwriting rules and referral triggers
4. The document set: proposal, schedule, endorsement, claim form — field by field
5. Claims workflow specific to this line, with the document checklist
6. **Domain objects unique to this LOB** and how they extend the core model
7. Edge cases that break systems, with dates and numbers
8. Regulatory constraints
9. Sources

### Part V — Systems (`systems/`)
**The differentiator. This is why the handbook exists.**

- `domain-model` — party, policy, coverage, risk object, transaction, claim ⭐ *written*
- `effective-dating` — the hard problem, in full
- `rating-architecture` — externalised tables, versioning, filings
- `product-configuration`
- `claims-architecture` — reserves as an event stream
- `integration-patterns` — ACORD, quote journeys, payment, registry lookups
- `document-generation`
- `data-migration` — closed books, 30-year policies, three system generations
- `core-platforms` — Guidewire / Duck Creek / Sapiens / TCS BaNCS, compared on model, not marketing
- `testing-insurance-systems` — scenario libraries, the cases BAs always miss

### Part VI — Reference (`reference/`)
- `glossary` — target 300 terms, each with an example, searchable component
- `acronyms`
- `reading-list`
- `sources`

## Editorial rules

1. **Every factual claim gets a source** in the page's `sources` frontmatter. No source, no claim.
2. **Money figures are labelled** either `illustrative` or `sourced (date)`. Never ambiguous.
3. **India-specific facts carry a `verified:` date.** Regulation moves; stale is worse than absent.
4. Worked examples use real arithmetic that a reader can reproduce.
5. Every page ends with **"What this means for your system"**. If you can't write that section, the page doesn't belong.

## Build order (suggested)

**Phase 1 — Prove the format.** `systems/domain-model`, `lifecycle/policy-servicing` (with effective dating), `lines-of-business/motor-india`. Three pages, done properly. If these are good, the rest is just repetition.

**Phase 2 — The spine.** Rest of `lifecycle/`, plus `foundations/`.

**Phase 3 — Depth.** Health, then the remaining systems pages.

**Phase 4 — Reference.** Glossary to 300, sources audit, external review by a practising underwriter and a practising claims manager before any public launch.
