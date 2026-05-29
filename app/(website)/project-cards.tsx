import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
const POSTS_QUERY = `*[
  _type == "project"
  && defined(slug.current)
]|order(publishedAt desc)[0...4]{_id, title, slug, body, "mainImageUrl": mainImage.asset->url, links}`;
const options = { cache: "force-cache" as const };

export default async function ProjectCards() {
  const projects = await client.fetch<SanityDocument[]>(
    POSTS_QUERY,
    {},
    options,
  );

  return (
    <div className="max-w-4xl w-full mx-auto border-l border-dashed relative">
      <div className="border-b border-dashed border-r text-2xl p-4 text-primary">
        Some of my projects
      </div>
      <div className="grid md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
      <div className="h-96 w-full absolute bottom-0 left-0 border-r border-dashed mask-t-from-0% mask-t-to-100% backdrop-blur-lg backdrop-brightness-50 backdrop-grayscale pointer-events-none"></div>
      <Link
        href="/projects"
        className="h-20 w-full bg-background/50 backdrop-blur-sm absolute bottom-0 left-0 border-t border-b border-r border-dashed flex hover:bg-muted active:brightness-75 duration-200 justify-center items-center"
      >
        View All Projects
      </Link>
    </div>
  );
}

export function ProjectCard({ project }: { project: SanityDocument }) {
  return (
    <div className="flex flex-col border-r border-b border-dashed md:nth-3:[&>p]:hidden md:nth-3:[&>div]:hidden last:[&>p]:hidden last:[&>div]:hidden">
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
