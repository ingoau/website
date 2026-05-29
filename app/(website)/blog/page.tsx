import Header from "@/components/header";
import PostCard from "@/components/post-card";
import { client } from "@/sanity/lib/client";
import { Metadata } from "next";
import { SanityDocument } from "next-sanity";
const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, body}`;
const options = { cache: "force-cache" as const };

export const metadata: Metadata = {
  title: "Blog",
  description: "My random rantings and stuff",
};

export default async function Blog() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <div className="max-w-4xl w-full mx-auto border border-t-0 border-dashed">
      <Header>Blog</Header>
      {posts.map((post, index) => (
        <PostCard
          key={index}
          title={post.title}
          slug={post.slug.current}
          date={post.publishedAt}
          excerpt={post.body
            .map((b: { children?: { text?: string }[] }) =>
              (b.children || [])
                .map((c: { text?: string }) => c.text || "")
                .join(""),
            )
            .join(" ")}
        />
      ))}
    </div>
  );
}
