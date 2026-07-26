import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    // The editorial contract in CONTENT-PLAN.md is enforced here: pages may
    // carry a verification date, a status, and a source list. Making these
    // part of the schema means a typo fails the build instead of shipping.
    schema: docsSchema({
      extend: z.object({
        /** When the market/regulatory facts on this page were last checked, e.g. "2026-07". */
        verified: z.union([z.string(), z.date()]).optional(),
        status: z.enum(['not-started', 'draft', 'reviewed', 'published']).optional(),
        sources: z.array(z.string()).default([]),
      }),
    }),
  }),
};
