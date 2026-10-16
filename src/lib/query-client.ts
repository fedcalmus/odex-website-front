import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "@/lib/api";

/**
 * One factory for both sides: the server builds a fresh client per request
 * (so nothing leaks between visitors), the browser keeps a single one.
 */
export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Server-provided data stays fresh long enough that hydration doesn't
        // trigger an immediate second request.
        staleTime: 5 * 60_000,
        // The server never retries (it would only delay the page). In the
        // browser, retry transient failures but not 4xx — those won't change.
        retry: (failureCount, error) =>
          typeof window !== "undefined" &&
          failureCount < 2 &&
          !(error instanceof ApiError && error.status < 500),
      },
    },
  });
}
