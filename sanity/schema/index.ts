import { type SchemaTypeDefinition } from "sanity";
import { post } from "./post";
import { blockContent } from "./blockContent";
import { project } from "./project";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContent, post, project],
};
