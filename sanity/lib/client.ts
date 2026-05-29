import { apiVersion, dataset, projectId } from "../env";

type QueryParams = Record<string, unknown>;

const apiUrl = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`;

export type SanityDocument = Record<string, unknown> & {
  _id: string;
};

export const client = {
  config() {
    return { projectId, dataset, apiVersion };
  },

  async fetch<T>(
    query: string,
    params: QueryParams = {},
    _options?: unknown,
  ): Promise<T> {
    const url = new URL(apiUrl);
    url.searchParams.set("query", query);

    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(`$${key}`, JSON.stringify(value));
    }

    const response = await fetch(url);
    const body = await response.json();

    if (!response.ok || body.error) {
      throw new Error(body.error?.description ?? "Sanity query failed");
    }

    return body.result as T;
  },
};
