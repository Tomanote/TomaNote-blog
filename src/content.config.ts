// src/content.config.ts — Blog content collections (Astro 6+ glob loader)
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("Camiicode"),
    tags: z.array(z.string()).default([]),
    ogImage: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    i18nSlug: z.string().optional(),
  }),
});

export const collections = { blog };