import { defineType, defineField } from "./types";

export const postSchema = defineType({
  name: "post",
  title: "Article / News Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Headline",
      type: "string",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Primary Beat Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "subTags",
      title: "Sub-Topic Tags",
      type: "array",
      options: { layout: "tags" },
    }),
    defineField({
      name: "excerpt",
      title: "Executive Summary / Excerpt",
      type: "text",
      rows: 3,
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "readTimeMinutes",
      title: "Estimated Read Time (Minutes)",
      type: "number",
      initialValue: 5,
    }),
    defineField({
      name: "isFeatured",
      title: "Lead Hero Story",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isTrending",
      title: "Trending Analysis",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isPremium",
      title: "Insider Premium Story",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "body",
      title: "Article Body Content (Markdown / Text)",
      type: "text",
      rows: 15,
      validation: (rule: any) => rule.required(),
    }),
  ],
});
