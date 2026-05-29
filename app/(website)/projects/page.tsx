import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import { Metadata } from "next";
import { SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
const POSTS_QUERY = `*[
  _type == "project"
  && defined(slug.current)
]|order(publishedAt desc){_id, title, slug, body, "mainImageUrl": mainImage.asset->url, links}`;
const options = { cache: "force-cache" as const };

export const metadata: Metadata = {
  title: "Projects",
};

export default async function Projects() {
  const projects = await client.fetch<SanityDocument[]>(
    POSTS_QUERY,
    {},
    options,
  );

  return (
    <div className="max-w-4xl w-full mx-auto border-l border-dashed">
      <Header className="border-r">Projects</Header>
      <div className="grid md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
        {projects.length % 2 === 1 && (
          <div className="bg-card bg-striped-gradient bg-size-[80px_80px] border-b border-r border-dashed hidden md:block"></div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: SanityDocument }) {
  return (
    <div className="flex flex-col border-r border-b border-dashed">
      <Image
        src={project.mainImageUrl}
        alt={project.title}
        width={16 * 100}
        height={9 * 100}
        className="aspect-video w-full object-cover border-b border-dashed"
      />
      <h2 className="w-full p-4 text-2xl border-b border-dashed">
        {project.title}
      </h2>
      <p className="p-4">
        {project.body &&
          project.body
            .map((b: { children?: { text?: string }[] }) =>
              (b.children || [])
                .map((c: { text?: string }) => c.text || "")
                .join(""),
            )
            .join(" ")}
      </p>
      <div className="w-full flex flex-row mt-auto border-t border-dashed">
        {project.links.map(
          (link: { title: string; url: string }, index: number) => (
            <Button
              key={index}
              variant="ghost"
              className="cursor-pointer px-4 py-2 duration-200 ease-out hover:bg-card active:brightness-75 bg-background border-r border-dashed"
              asChild
            >
              <Link href={link.url} target="_blank">
                {link.title}
              </Link>
            </Button>
          ),
        )}
      </div>
    </div>
  );
}
