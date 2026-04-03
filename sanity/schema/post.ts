import { File } from "lucide-react";
import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: File,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "summary",
      type: "text",
    }),
    defineField({
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    // TODO: add tags
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      name: "body",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      return { ...selection };
    },
  },
});
