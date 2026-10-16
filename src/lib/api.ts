/**
 * Thin fetch wrapper for the backend API. Works in Server Components, route
 * handlers and client components (the base URL is a NEXT_PUBLIC_ variable).
 *
 *   const events = await apiFetch<EventDto[]>("/events", { query: { region: "aragatsotn" } });
 */

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly url: string,
    /** Parsed JSON error body when the API sent one, otherwise the raw text. */
    readonly body: unknown,
  ) {
    super(`API ${status} for ${url}`);
    this.name = "ApiError";
  }
}

/** Must be a literal `process.env.X` access so Next can inline it in the browser bundle. */
function baseUrl(): string {
  const value = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!value) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not set — copy .env.example to .env.");
  }
  return value.replace(/\/+$/, "");
}

type QueryValue = string | number | boolean | null | undefined;

export interface ApiRequestInit extends Omit<RequestInit, "body"> {
  /** Serialised as JSON. Repeated params: pass an array. Empty values are skipped. */
  query?: Record<string, QueryValue | QueryValue[]>;
  body?: unknown;
}

/** Absolute API URL for a path, e.g. `apiUrl("/events", { page: 2 })`. */
export function apiUrl(path: string, query?: ApiRequestInit["query"]): string {
  const url = new URL(`${baseUrl()}${path.startsWith("/") ? path : `/${path}`}`);
  for (const [key, raw] of Object.entries(query ?? {})) {
    for (const value of Array.isArray(raw) ? raw : [raw]) {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, String(value));
      }
    }
  }
  return url.toString();
}

export async function apiFetch<T>(path: string, init: ApiRequestInit = {}): Promise<T> {
  const { query, body, headers, ...rest } = init;
  const url = apiUrl(path, query);

  const response = await fetch(url, {
    ...rest,
    headers: {
      Accept: "application/json",
      ...(body !== undefined && { "Content-Type": "application/json" }),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const text = await response.text();
  let parsed: unknown = text;
  if (text) {
    try {
      parsed = JSON.parse(text);
    } catch {
      // Non-JSON body (e.g. a proxy error page) — keep the raw text.
    }
  }

  if (!response.ok) throw new ApiError(response.status, url, parsed);
  return parsed as T;
}
