import { describe, it, expect, beforeAll } from "vitest";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

interface BlogPostFrontmatter {
  title: string;
  description: string;
  publishDate: string;
  author: string;
  tags: string[];
  featured: boolean;
  draft: boolean;
  ogImage?: string;
  slug?: string;
  i18nSlug?: string;
}

interface ParsedPost {
  id: string;
  locale: "en" | "es";
  slug: string;
  data: BlogPostFrontmatter;
  content: string;
}

const allPosts: ParsedPost[] = [];

beforeAll(() => {
  const contentDir = path.resolve("src/content/blog");
  const locales = ["en", "es"];

  for (const locale of locales) {
    const localeDir = path.join(contentDir, locale);
    if (!fs.existsSync(localeDir)) continue;

    const files = fs.readdirSync(localeDir).filter((f: string) => f.endsWith(".md"));

    for (const file of files) {
      const filePath = path.join(localeDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);

      const slug = file.replace(".md", "");
      const id = `${locale}/${slug}`;

      allPosts.push({
        id,
        locale: locale as "en" | "es",
        slug,
        data: data as BlogPostFrontmatter,
        content,
      });
    }
  }
});

describe("Content Parity EN/ES", () => {
  it("should have matching i18nSlug pairs for EN and ES posts", () => {
    const enPosts = allPosts.filter(p => p.locale === "en");
    const esPosts = allPosts.filter(p => p.locale === "es");

    for (const enPost of enPosts) {
      expect(enPost.data.i18nSlug).toBeDefined();
      const matchingEs = esPosts.find(p => p.slug === enPost.data.i18nSlug);
      expect(matchingEs).toBeDefined();
    }

    for (const esPost of esPosts) {
      expect(esPost.data.i18nSlug).toBeDefined();
      const matchingEn = enPosts.find(p => p.slug === esPost.data.i18nSlug);
      expect(matchingEn).toBeDefined();
    }
  });

  it("should have at least one post in each locale", () => {
    const enPosts = allPosts.filter(p => p.locale === "en");
    const esPosts = allPosts.filter(p => p.locale === "es");

    expect(enPosts.length).toBeGreaterThan(0);
    expect(esPosts.length).toBeGreaterThan(0);
  });

  it("should have all required fields for each post", () => {
    for (const post of allPosts) {
      const { data } = post;

      // Required string fields
      expect(typeof data.title).toBe("string");
      expect(data.title.length).toBeGreaterThan(0);

      expect(typeof data.description).toBe("string");
      expect(data.description.length).toBeGreaterThan(0);

      expect(typeof data.author).toBe("string");
      expect(data.author.length).toBeGreaterThan(0);

      // publishDate should be a valid date string
      expect(typeof data.publishDate).toBe("string");
      const date = new Date(data.publishDate);
      expect(date).toBeInstanceOf(Date);
      expect(date.getTime()).not.toBeNaN();

      // tags should be array
      expect(Array.isArray(data.tags)).toBe(true);

      // featured and draft should be booleans
      expect(typeof data.featured).toBe("boolean");
      expect(typeof data.draft).toBe("boolean");
    }
  });

  it("should have matching publish dates for EN/ES pairs", () => {
    const enPosts = allPosts.filter(p => p.locale === "en");
    const esPosts = allPosts.filter(p => p.locale === "es");

    for (const enPost of enPosts) {
      const esPost = esPosts.find(p => p.slug === enPost.data.i18nSlug);

      expect(esPost).toBeDefined();
      if (esPost) {
        const enDate = new Date(enPost.data.publishDate).getTime();
        const esDate = new Date(esPost.data.publishDate).getTime();
        expect(enDate).toEqual(esDate);
      }
    }
  });

  it("should have non-empty content body for all posts", () => {
    for (const post of allPosts) {
      expect(post.content).toBeDefined();
      expect(typeof post.content).toBe("string");
      expect(post.content.trim().length).toBeGreaterThan(0);
    }
  });

  it("should not have duplicate slugs within the same locale", () => {
    const enPosts = allPosts.filter(p => p.locale === "en");
    const esPosts = allPosts.filter(p => p.locale === "es");

    const enSlugs = enPosts.map(p => p.slug);
    const esSlugs = esPosts.map(p => p.slug);

    const uniqueEnSlugs = new Set(enSlugs);
    const uniqueEsSlugs = new Set(esSlugs);

    expect(uniqueEnSlugs.size).toBe(enSlugs.length);
    expect(uniqueEsSlugs.size).toBe(esSlugs.length);
  });

  it("should have valid tags (non-empty strings)", () => {
    for (const post of allPosts) {
      for (const tag of post.data.tags) {
        expect(typeof tag).toBe("string");
        expect(tag.trim().length).toBeGreaterThan(0);
      }
    }
  });
});