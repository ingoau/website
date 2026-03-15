import { type SchemaTypeDefinition } from "sanity";
import { post } from "./post";
import { blockContent } from "./blockContent";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContent, post],
};
