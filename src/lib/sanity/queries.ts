import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { defineQuery } from "groq";
import { sanityClient } from "sanity:client";

export const postsQuery = defineQuery(`*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc){_id, title, slug, image, publishedAt, summary}`);

export const postQuery = defineQuery(
  `*[_type == "post" && slug.current == $slug][0]`,
);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

const builder = createImageUrlBuilder(sanityClient);
