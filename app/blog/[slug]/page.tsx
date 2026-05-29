import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import PortableText, { type PortableTextBlock } from "@/components/portableText";
import { client, type SanityDocument } from "@/sanity/lib/client";
import Content from "@/components/content";
import BackButton from "../../../components/backButton";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{_id, title, description, slug, mainImage, body, publishedAt}`;
const POST_SLUGS_QUERY = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`;

type BlogPost = SanityDocument & {
  title: string;
  description?: string;
  mainImage?: SanityImageSource;
  body?: PortableTextBlock[];
  publishedAt: string;
};

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await client.fetch<{ slug: string }[]>(
    POST_SLUGS_QUERY,
    {},
    options,
  );

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = await client.fetch<BlogPost>(
    POST_QUERY,
    await params,
    options,
  );
  if (!post) {
    notFound();
  }

  return {
    title: post.title,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<BlogPost>(
    POST_QUERY,
    await params,
    options,
  );
  if (!post) {
    notFound();
  }
  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(550).height(310).url()
    : null;

  return (
    <>
      <Content>
        <div className="w-full rounded-t-md relative overflow-hidden not-prose">
          {postImageUrl && (
            <img
              src={postImageUrl}
              alt={post.title}
              className="w-full h-full absolute top-0 left-0 object-cover"
              width="550"
              height="310"
            />
          )}
          <div className="w-full h-full absolute top-0 left-0 from-transparent to-background bg-gradient-to-b"></div>
          <div className="w-full min-h-72 p-4 flex flex-col relative z-20">
            <div className="flex flex-row gap-2">
              <BackButton />
            </div>
            <div className="grow min-h-10"></div>
            <div className="flex flex-row gap-2 w-full">
              <div className="flex flex-col gap-2">
                <h1 className="text-6xl">{post.title}</h1>
                <h2 className="text-xl">
                  {post.description}
                  {post.description && " - "}
                  {new Date(post.publishedAt).toLocaleDateString("en-AU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </h2>
              </div>
            </div>
          </div>
        </div>
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </Content>
    </>
  );
}
