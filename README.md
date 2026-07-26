# Insurance Domain Handbook

Insurance domain knowledge written for the people who build the systems.

## Why this exists

The Insurance Institute of India teaches insurance to insurance people. Guidewire teaches
its own platform. IRMI defines terms. Nothing connects *"here is what proximate cause means"*
to *"here is why your claims data model needs a cause-of-loss hierarchy."*

That gap is what this handbook fills.

## Editorial contract

Every page answers two questions:

1. **What does a practitioner actually do?**
2. **What does that mean for the system?**

A page that only answers the first belongs in a textbook. Cut it or link out.

See [CONTENT-PLAN.md](./CONTENT-PLAN.md) for the full structure and build order.

## Running locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in ./dist
```

## Deploying to GitHub Pages

Deployment is wired up already — `.github/workflows/deploy.yml` builds and publishes
on every push to `main`. Two things are needed once:

1. In `astro.config.mjs`, set `GITHUB_USER` (and `REPO`, if you name it something
   other than `insurance-handbook`). These two constants drive `site`, `base`, the
   GitHub social link, and the edit links.
2. In repo **Settings → Pages**, set **Source** to **GitHub Actions**.

The site publishes to `https://<user>.github.io/<repo>/`.

Note: on a free personal account, GitHub Pages requires a **public** repository.

### Layout

Astro serves pages from `src/content/docs/`. The Markdown files at the repo root
(`CONTENT-PLAN.md`, `_TEMPLATE.md`, this README) are project documentation and are
**not** published — move a file into `src/content/docs/` to publish it.

Page frontmatter is schema-checked in `src/content.config.ts`: `verified`, `status`
and `sources` are validated at build time, so a typo fails the build rather than
shipping. New sidebar sections are commented out in `astro.config.mjs` — uncomment
each one as its first page lands.

## Content status

| Page | Status |
|---|---|
| `systems/domain-model` | Draft — needs practitioner review |
| Everything else | Not started |

## Contributing / review

Factual claims need sources in page frontmatter. India-specific regulatory content
carries a `verified:` date — regulation moves, and stale is worse than absent.
Money figures are labelled `illustrative` or `sourced (date)`.

**Nothing here should be published under your name until reviewed by a practising
insurance professional**, particularly the India-specific regulatory material.
