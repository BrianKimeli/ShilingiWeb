import { schemaTypes } from "./lib/sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "shilingi_times";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const sanityConfig = {
  name: "shilingi-times-studio",
  title: "The Shilingi Times Editorial Studio",
  projectId,
  dataset,
  basePath: "/studio",
  schema: {
    types: schemaTypes,
  },
};

export default sanityConfig;
