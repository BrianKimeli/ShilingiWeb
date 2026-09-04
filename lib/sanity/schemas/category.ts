import { defineType, defineField } from "./types";

export const categorySchema = defineType({
  name: "category",
  title: "Beat & Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Category Title",
      type: "string",
      placeholder: "e.g., Tech, Business, Markets, Wealth, Policy",
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
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
  ],
});
