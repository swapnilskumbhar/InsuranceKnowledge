---
title: "[LOB Name] — [Market]"
description: One sentence on what this product covers and who buys it.
verified: YYYY-MM
status: not-started
sources: []
---

> **Template.** Every LOB page follows this structure. Sections 2, 6 and 7 are the ones
> that make this handbook different from a textbook — do not skip them, and do not write
> them from memory.

## 1. What it actually covers

Section by section, as the policy wording structures it — not as marketing describes it.
Name the sections the way the document names them, because that is what your users will
see on the schedule.

- Section I — …
- Section II — …
- Common exclusions that generate the most claim disputes

## 2. Rating: a worked quote

The differentiator. Take one realistic risk and compute premium to the final rupee.

| Step | Factor | Value | Running premium |
|---|---|---|---|
| Base rate | … | … | … |
| × zone/geography | … | … | … |
| × age/experience | … | … | … |
| − no-claim discount | … | … | … |
| + add-ons | … | … | … |
| + tax | … | … | … |
| **Final** | | | **₹…** |

State explicitly: which factors are regulator-set, which are insurer-set, and which
change most often — because that determines what must be configurable versus hard-coded.

## 3. Underwriting rules and referral triggers

What is auto-accepted, what refers to a human, and on what thresholds. This is the
material that becomes your rules engine's test suite.

## 4. The document set

Field by field. Proposal form, policy schedule, endorsement, claim form.
If you can, include a redacted real example.

## 5. Claims workflow for this line

Where it diverges from the generic lifecycle, plus the document checklist claimants
are actually asked for.

## 6. Domain objects specific to this line

How this LOB extends the [core model](/systems/domain-model/):

- Risk object type and its attributes
- Coverage terms unique to this line
- Any entity that exists only here

## 7. Edge cases that break systems

Worked with real dates and numbers. These become scenario tests.

1. …
2. …

## 8. Regulatory constraints

Market-specific. Carry a `verified:` date — this section goes stale fastest.

## 9. Sources

Primary sources only where possible: regulator circulars, insurer product brochures,
policy wordings. Note where a claim is author synthesis and needs review.
