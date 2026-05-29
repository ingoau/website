import {
  FilteredResponseQueryOptions,
  PortableText,
  type SanityDocument,
} from "next-sanity";
import { client } from "@/sanity/lib/client";
import { PostNavbar } from "@/components/navbar";
import urlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";
import Image from "next/image";
import clsx from "clsx";
import { notFound } from "next/navigation";
import ShareButton from "@/components/share-button";
import { FormattedDateTime } from "@/components/formatted-date";
import CodeBlock from "@/components/code-block";
import type { Metadata } from "next";
import Header from "@/components/header";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  ...,
  categories[]->{
    ...
  }
}`;

const POST_SLUGS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]{ "slug": slug.current }`;

const options: FilteredResponseQueryOptions = {
  cache: "force-cache",
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await client.fetch<{ slug: string }[]>(POST_SLUGS_QUERY);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    await params,
    options,
  );

  return {
    title: post?.title,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    await params,
    options,
  );

  if (!post) notFound();

  return (
    <>
      <PostNavbar title={post.title} />
      <article className="max-w-4xl w-full mx-auto border border-t-0 border-dashed">
        <Header>{post.title}</Header>
        {post.categories && (
          <div className="categories flex flex-row sm:hidden border-b border-dashed">
            {post.categories.map((category: SanityDocument) => (
              <div
                key={category._id}
                className="text-sm p-2 px-4 border-r border-dashed"
              >
                {category.title}
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-row border-b border-dashed">
          <div className="text-sm p-2 px-4 border-r border-dashed bg-card">
            <FormattedDateTime date={post.publishedAt} format="DATETIME" />
          </div>
          <div className="categories sm:flex flex-row hidden">
            {post.categories &&
              post.categories.map((category: SanityDocument) => (
                <div
                  key={category._id}
                  className="text-sm p-2 px-4 border-r border-dashed"
                >
                  {category.title}
                </div>
              ))}
          </div>
          <div className="grow"></div>
          <ShareButton className="sm:border-l border-dashed" />
        </div>
        <div className="prose max-w-full p-4">
          {Array.isArray(post.body) && (
            <PortableText
              components={{
                types: {
                  code: ({ value }) => {
                    return (
                      <CodeBlock language={value.language} code={value.code} />
                    );
                  },
                  image: ({ value, isInline }) => {
                    const { width, height } = getImageDimensions(value);
                    return (
                      <Image
                        src={urlBuilder(client)
                          .image(value)
                          .width(isInline ? 100 : 800)
                          .fit("max")
                          .auto("format")
                          .url()}
                        alt={value.alt || " "}
                        width={width}
                        height={height}
                        className={clsx(!isInline && "w-full")}
                        style={{
                          // Display alongside text if image appears inside a block text span
                          display: isInline ? "inline-block" : "block",

                          // Avoid jumping around with aspect-ratio CSS property
                          aspectRatio: width / height,
                        }}
                      />
                    );
                  },
                },
              }}
              value={post.body}
            />
          )}
        </div>
      </article>
    </>
  );
}
