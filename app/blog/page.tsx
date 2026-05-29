import { client } from "@/sanity/lib/client";
import Posts from "./posts";
import { type BlogPostSummary } from "./posts";
import { Metadata } from "next";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, description }`;

const options = { next: { revalidate: 30 } };

export const metadata: Metadata = {
  title: "Blog",
};

export default async function PostsIndexPage() {
  const posts = await client.fetch<BlogPostSummary[]>(POSTS_QUERY, {}, options);

  return <Posts posts={posts} />;
}
