---
title: The Insurance Domain Model
description: The six core entities every policy administration system is built from, why they take the shape they do, and the modelling mistakes that are expensive to undo.
sidebar:
  order: 1
verified: 2026-07
status: draft
sources:
  - ACORD Reference Architecture — entity definitions (acord.org)
  - Guidewire PolicyCenter data model documentation (product docs)
  - OMG / ACORD Property & Casualty Data Model overviews
  - Author synthesis from implementation practice — REQUIRES REVIEW
---

Almost every painful insurance system is painful for the same reason: someone modelled a **policy** as a row in a table.

It isn't. A policy is a *contract that changes over time*, whose terms at any given moment depend on which moment you ask about, and which must simultaneously answer three different questions — what did we agree, what do we charge, and what do we owe. Getting this wrong is not a bug you fix later. It is the kind of mistake that produces a five-year replatforming programme.

This chapter covers the six entities that every serious policy administration system converges on, regardless of vendor, and what each one is really for.

## The six core entities

```
        Party ──────────┐
          │             │
     (roles)        (insures)
          │             │
          ▼             ▼
       Policy ───► Risk Object
          │             │
          │        (attaches)
          ▼             ▼
    Transaction ──► Coverage
          │             │
          │        (responds to)
          ▼             ▼
       Premium        Claim
```

The arrows matter less than one observation: **nothing in this diagram is a static record.** Every box is a thing whose state is a function of time.

---

## 1. Party

A **party** is any person or organisation the system needs to know about: the policyholder, the insured (often not the same), the nominee, the driver, the broker, the garage, the hospital, the reinsurer, the claimant, the lawyer.

### Why you don't model "customer"

The single most common early mistake is a `customer` table. It fails immediately, because the same human being is:

- the **policyholder** on their own motor policy
- the **insured** and also the **nominee** on their spouse's health policy
- a **claimant** against a third party's liability policy
- a **witness** on someone else's claim

Four relationships, one person. A `customer` table forces four duplicate records and guarantees you can never answer "how many policies does this person hold with us."

### The shape that works

Model a `Party` (with a subtype of person or organisation) and attach **roles** to it, where each role is a relationship between a party and something else:

| Party | Role | In relation to |
|---|---|---|
| Ramesh Kulkarni | Policyholder | Policy MTR-4471 |
| Ramesh Kulkarni | Insured | Policy MTR-4471 |
| Priya Kulkarni | Nominee | Policy LIF-8823 |
| Sunrise Motors | Repairer | Claim CLM-99201 |
| Marsh India | Broker | Policy COM-1120 |

Roles are **time-bounded** — a nominee can be changed, a broker of record can be transferred, a driver can be added mid-term. If your role table has no `effective_from` / `effective_to`, you have already lost the ability to answer "who was the nominee when the death occurred," which is a question that decides whether a claim is paid to the right person.

### The identity problem

Party matching is genuinely hard and permanently unsolved. Names transliterate inconsistently (Kulkarni / Kulkarny), addresses are free text, dates of birth are entered wrong, and in India PAN and Aadhaar are subject to real constraints on storage and use. Assume you will need:

- a **candidate-match** process rather than a deterministic key
- a **merge** operation that is reversible, because you *will* merge two different people
- an audit trail of merges, because a merged party's policies must remain traceable

> **What this means for your system**
> Build `Party` + `Role` from day one, even if the first product has one role. Retrofitting a role model onto a `customer` table is a data migration, not a refactor.

---

## 2. Risk Object

The **risk object** is the thing being insured: a vehicle, a building, a shipment, a person's life, a piece of machinery, a construction project, a business's liability exposure.

This entity is where naive models break hardest, because a single policy can carry many risk objects — a commercial property policy covering fourteen locations, a fleet policy covering 300 vehicles, a family floater covering five members — and coverage is often defined *per risk object*, not per policy.

### Risk objects are typed, and the types differ radically

A vehicle has a registration number, chassis number, make/model/variant, year, engine capacity, fuel type, and IDV. A building has a construction class, occupancy, number of floors, fire-protection rating, and geocoded location. A life has a date of birth, gender, smoking status, occupation class, and medical history.

There is no useful common denominator beyond an identifier and a type. Two patterns work:

**Typed subtables** — `risk_object` base plus `risk_vehicle`, `risk_property`, `risk_life`. Strong typing, clean queries, requires a schema change per new risk type.

**Attribute bags** — `risk_object` plus a key-value attribute table driven by product configuration. Add new risk types without a release, at the cost of type safety and query ergonomics.

Most commercial platforms use the second, because insurers add products faster than IT can ship schema changes. If you go this way, invest early in an attribute *schema registry* — otherwise you get `engine_cc`, `engineCC`, and `cubic_capacity` in the same database inside eighteen months.

### Risk objects change mid-term

A vehicle gets a CNG kit fitted. A warehouse adds a sprinkler system. A fleet adds twelve trucks in March and disposes of five in August. Each change potentially alters premium, and each must be attributable to a point in time.

> **What this means for your system**
> Risk objects need their own effective-dated version history, independent of the policy's. The question "what was the IDV of this vehicle on 14 August" must be answerable, because that is the date the claim occurred and that is the number the settlement uses.

---

## 3. Policy

The **policy** is the contract. Modelling it well means separating three things that beginners conflate:

**Policy** — the durable identity. `MTR-4471`. Survives renewals in some designs, not in others (decide this early; it affects every report you will ever write).

**Policy Term** — one contract period. 1 April 2026 to 31 March 2027. A renewal creates a new term. Most reporting, reserving, and reinsurance ceding happens at term level.

**Policy Version** (or *revision*) — the state of a term after a specific change. Term 2026–27 might have versions 1 (as issued), 2 (CNG kit added, effective 12 July), 3 (address corrected, effective 1 April, processed 20 August).

That third one is the entity people leave out, and its absence is the root cause of the most expensive class of insurance system defect.

### Why versions are non-negotiable

Consider a claim occurring on **15 July 2026**. To settle it you must know the policy as it stood on 15 July — not as it stands today. If someone processed an endorsement in August that reduced the sum insured effective 1 September, today's state is wrong for this claim. If someone processed a *backdated* endorsement in August effective 1 July, today's state is right — but only because of the backdating, and you need to be able to prove that.

Without versioning you cannot reconstruct either scenario, and you will settle claims against terms that were not in force.

### The bitemporal requirement

Insurance systems need **two independent time axes**, and this is the single most important idea in this chapter:

| Axis | Question it answers |
|---|---|
| **Effective time** | When did this change take effect in the real world? |
| **Transaction time** (or *knowledge time*) | When did we come to know about it? |

An endorsement processed on 20 August with effect from 1 July has an effective date of 1 July and a transaction date of 20 August. Both are true. Both are needed.

- **Claims** ask effective-time questions: what were the terms on the date of loss?
- **Finance and audit** ask transaction-time questions: what did our books say on 31 July, given only what we knew on 31 July?

A system with one time axis can answer one of these. Regulators and auditors require both. Retrofitting bitemporality is, in practice, a rewrite — this is the decision to get right before the first line of code.

---

## 4. Coverage

**Coverage** is a specific promise to pay, under stated conditions, up to a stated limit, subject to a stated deductible. It attaches to a risk object (usually) within a policy version.

The mistake here is treating coverage as a column on the policy — `sum_insured`, `deductible`. Real policies carry many coverages with independent limits:

A single Indian motor policy carries: third-party liability (unlimited for death/injury by statute, capped for property damage), own damage (limited to IDV), personal accident cover for the owner-driver (₹15 lakh), plus optional add-ons — zero depreciation, engine protection, roadside assistance, consumables — each with its own limit, its own deductible, and its own claim conditions.

A health floater carries: hospitalisation (up to sum insured), pre-hospitalisation (30 days), post-hospitalisation (60 days), day-care procedures, room-rent sub-limit (often 1% of SI per day), ambulance (capped at ₹2,000 per event), and maternity (with its own waiting period and its own sub-limit).

### Coverage needs a term structure

Every coverage carries a set of **terms** — the numeric and categorical parameters that define its scope:

| Term type | Example | Behaviour |
|---|---|---|
| Limit | ₹10,00,000 | Ceiling on total payout |
| Sub-limit | Room rent 1% of SI/day | Ceiling within a limit |
| Deductible | ₹5,000 per claim | Retained by insured |
| Waiting period | 36 months for pre-existing disease | Time-based exclusion |
| Co-pay | 20% on claims above age 60 | Proportional retention |

These are not columns. They are rows in a `coverage_term` table, typed and configured per product. The moment you hard-code `room_rent_limit` as a column, you have coupled your schema to one product, and the next product will need `sub_limit_cataract`.

### The aggregation question

When a claim is paid, *what* is reduced? Under an indemnity floater, a ₹2 lakh claim reduces the ₹10 lakh family sum insured to ₹8 lakh for the remaining policy year — for **all** members. Under a benefit product, nothing is reduced. Under a policy with restore/reinstatement benefit, the sum insured is topped back up under defined conditions.

> **What this means for your system**
> You need a running `coverage_balance` concept — available limit as a function of claims paid to date within the term — and it must be reconstructable at any point in time, not just current. A second claim's eligibility depends on the balance *at the date of that claim*, and claims are frequently reported and settled out of order.

---

## 5. Transaction

A **transaction** is a business event that changes the policy: new business, endorsement, cancellation, reinstatement, renewal.

This is the entity that separates systems that can explain themselves from systems that cannot.

### Transactions are the source of truth; state is derived

The instinct is to store the current state and update it. The correct model is closer to event sourcing: store the **transactions**, and derive current state from them.

```
NEW BUSINESS   01-Apr-2026  eff 01-Apr-2026   premium +₹18,400
ENDORSEMENT    12-Jul-2026  eff 12-Jul-2026   premium +₹2,700   (CNG kit)
ENDORSEMENT    20-Aug-2026  eff 01-Apr-2026   premium  -₹900    (NCB correction, backdated)
CANCELLATION   03-Feb-2027  eff 03-Feb-2027   premium -₹3,150   (pro-rata refund)
```

From this sequence you can answer every question anyone will ask: the terms on any date, the premium as at any date, what changed and when, what we knew and when we knew it. From a mutable `policy` row, you can answer none of them.

### Every transaction produces a premium delta

Not a new premium — a **delta**. The endorsement on 12 July added ₹2,700, which is itself derived from a full re-rate of the policy under the new terms, minus the premium already charged, pro-rated for the unexpired period.

This calculation is where most insurance systems accumulate their worst bugs, because it involves:

- re-rating the whole policy under new terms (not incrementally pricing the change)
- pro-rating for the unexpired portion of the term
- deciding whether the change is *pro-rata* or *short-rate* (short-rate applies a penalty scale, common in cancellations)
- handling the case where the rate table itself changed between the original effective date and now
- correctly ordering against other transactions already applied

### Out-of-sequence transactions

Here is the case that every insurance system gets wrong at least once:

> On 1 April, a policy is issued.
> On 15 June, an endorsement is processed increasing the sum insured, effective 15 June.
> On 20 August, an endorsement arrives that must take effect from **1 May** — before the June change.

The May change must be applied, and then the June change must be **recalculated on top of it**, because the June re-rate was computed against terms that have now changed retroactively. The premium delta of the June endorsement is therefore no longer ₹2,700 — it must be reversed and reissued.

Systems that model policy as mutable state cannot do this at all. Systems that model transactions as an ordered sequence can, by:

1. Reversing every transaction with an effective date after 1 May
2. Inserting the new transaction in effective-date order
3. Replaying the reversed transactions in sequence, recalculating each
4. Booking the net financial difference

This is why the transaction sequence must be replayable, and why rating must be a **pure function** of (terms, rate version, dates) with no hidden state. If your rating engine reads current policy state internally, replay produces wrong answers.

> **What this means for your system**
> Design the transaction model before the policy model. Make reversal a first-class operation — not a delete. Make rating deterministic and replayable. Test out-of-sequence endorsements on day one, not in UAT.

---

## 6. Claim

A **claim** is a demand for payment under a policy, and it introduces its own time problem: the claim has a **date of loss** (when it happened), a **date of notification** (when we were told), and a series of **transaction dates** (when we did things about it). All three differ, sometimes by years.

### The claim's relationship to the policy is as-at-date-of-loss

Coverage determination resolves against the policy version in force on the **date of loss**, using effective time. This is the single most important join in a claims system, and the reason the policy model must be effective-dated.

Long-tail liability makes this vivid: a professional negligence act in 2020, discovered in 2024, notified in 2025, settled in 2027. Which policy responds depends on whether the wording is **occurrence-based** (the 2020 policy) or **claims-made** (the 2025 policy). This is not a detail — it determines which of seven annual policies pays, and your model must express it.

### Reserves are a time series, not a number

The most common claims-model error is `claim.reserve_amount` as a single field. A reserve is an *estimate that changes*, and the history of those changes is itself the data that actuaries need:

| Date | Reserve | Paid | Movement |
|---|---|---|---|
| 02-Aug-2026 | ₹50,000 | — | Initial, on FNOL triage |
| 18-Aug-2026 | ₹1,80,000 | — | Surveyor report received |
| 05-Sep-2026 | ₹1,80,000 | ₹1,55,000 | Part payment to garage |
| 22-Sep-2026 | ₹0 | ₹1,72,400 | Final settlement, claim closed |

From the movement history you get **incurred** (paid + outstanding reserve) at any point in time, development triangles for reserving, and the reserve-adequacy analysis that regulators require. From a single mutable field, you get nothing.

Model reserves and payments as immutable **financial transactions** against the claim, split by coverage and by head of damage (indemnity vs. legal expense vs. surveyor fee — these are reported separately and reinsured differently).

### Recoveries run in the opposite direction

Subrogation and salvage recoveries reduce net claim cost but are not negative payments — they are separate flows, often received long after closure, sometimes requiring the claim to be reopened. Reinsurance recoveries are a third flow again, calculated from the gross claim under treaty terms.

> **What this means for your system**
> `Claim` → `ClaimCoverage` → `FinancialTransaction` (typed: reserve movement, payment, recovery, reinsurance recovery). Never mutate. Always attributable to a date, a user, and a reason code.

---

## Putting it together: the modelling checklist

Before you commit to a schema, confirm you can answer each of these:

- [ ] Can I retrieve the exact policy terms in force on an arbitrary past date?
- [ ] Can I retrieve what the system *believed* those terms were, as at an arbitrary past date?
- [ ] Can I add a transaction effective before an existing one, and get correct premium?
- [ ] Can the same human being hold four different roles without duplicate records?
- [ ] Can a policy carry 300 risk objects with different coverage on each?
- [ ] Can I add a new coverage term type without a schema change?
- [ ] Can I reconstruct the available sum insured as at the date of a second claim?
- [ ] Can I produce the reserve movement history for any claim?
- [ ] Can I reverse any transaction without deleting anything?
- [ ] Is rating a pure function that produces identical output on replay?

Nine of these ten are cheap to satisfy at design time and expensive to retrofit. The tenth — bitemporality — is not cheap at any point, and is the one most worth paying for up front.

## Vendor implementations, for orientation

The commercial platforms all land in roughly the same place, which is itself evidence the model is right rather than fashionable:

- **Guidewire PolicyCenter** models `PolicyPeriod` (term) with branch-and-merge revisions, and out-of-sequence handling as an explicit product capability
- **Duck Creek** externalises product structure into configuration ("Manuscripts") so coverage terms are data, not schema
- **Sapiens** and **TCS BaNCS** follow comparable term/version separation with product-driven coverage configuration

Where they differ is in how much of the model is configuration versus code, which is the real axis to evaluate on — not feature lists.

---

## Sources and status

:::caution[Review needed]
This chapter is **author synthesis from implementation practice**, cross-checked against public vendor documentation and ACORD reference material. The structural claims are well-established industry practice. Before publication, the vendor-specific statements should be verified against current product documentation, and the whole chapter reviewed by a practising insurance solution architect.
:::

**Next:** *Effective Dating in Depth* (not yet written) — the out-of-sequence problem worked through with full arithmetic.
