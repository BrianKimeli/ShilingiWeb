import { defineType, defineField } from "./types";

export const authorSchema = defineType({
  name: "author",
  title: "Writer Profile",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Editorial Desk",
      type: "string",
      placeholder: "e.g., Tech & Markets Lead",
    }),
    defineField({
      name: "avatar",
      title: "Avatar Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Short Bio",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "twitter",
      title: "Twitter / X Profile URL",
      type: "url",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn Profile URL",
      type: "url",
    }),
  ],
});
