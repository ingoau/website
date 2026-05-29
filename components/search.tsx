import { client } from "@/sanity/lib/client";
import { SanityDocument } from "sanity";
import { SearchDialog } from "./search-dialog";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, body}`;

const options = { cache: "force-cache" as const };

export default async function Search() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return <SearchDialog posts={posts} />;
}
