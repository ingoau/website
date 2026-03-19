import { defineQuery } from "groq";

export const postsQuery = defineQuery(`*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc){_id, title, slug, image, publishedAt}`);
