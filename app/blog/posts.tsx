"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Content from "@/components/content";
import { motion } from "motion/react";
import clsx from "clsx";
import { type SanityDocument } from "@/sanity/lib/client";

export type BlogPostSummary = SanityDocument & {
  title: string;
  slug: { current: string };
  publishedAt: string;
  description?: string;
};

export default function Posts({
  posts,
}: {
  posts: BlogPostSummary[];
}) {
  return (
    <Content>
      <h1>Blog</h1>
      <div className="min-w-full grid grid-cols-1 lg:grid-cols-2 gap-2 not-prose">
        {posts.map((post, index) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{
              ease: [0.165, 0.84, 0.44, 1.0],
              delay: 0.1 * index + 0.1,
            }}
            key={post._id}
          >
            <Link href={`/blog/${post.slug.current}`}>
              <Card className={clsx("mb-2 h-full")}>
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>
                    {new Date(post.publishedAt).toLocaleDateString("en-AU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                    {post.description && " - " + post.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </Content>
  );
}
