// rss.xml.js — RSS feed generation
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const locale = new URL(context.url).pathname.startsWith("/es") ? "es" : "en";
  const posts = await getCollection("blog", ({ id, data }) => !data.draft && id.startsWith(`${locale}/`));
  const sortedPosts = posts.sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime()
  );
  const siteUrl = "https://blog.tomanote.app";

  return rss({
    title: "TomaNote Blog",
    description: locale === "es"
      ? "Artículos, changelogs, insights de privacidad y consejos de productividad minimalista."
      : "Articles, changelogs, privacy-first insights, and minimalist productivity tips.",
    site: siteUrl,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/${post.id}/`,
      pubDate: post.data.publishDate,
      updatedDate: post.data.updatedDate,
      author: post.data.author,
      categories: post.data.tags,
    })),
    customData: `<language>${locale}</language>`,
    stylesheet: "/rss-styles.xsl",
  });
}