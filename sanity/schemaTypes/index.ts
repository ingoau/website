import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { postType } from "./postType";
import { redirectType } from "./redirectType";
import { projectType } from "./projectType";
import { projectTagType } from "./projectTagType";
import { photoType } from "./photoType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    postType,
    redirectType,
    projectType,
    projectTagType,
    photoType,
  ],
};
