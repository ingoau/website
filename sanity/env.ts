export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-08-25";

export const dataset = "production";
export const projectId = "n6kwawc1";

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
