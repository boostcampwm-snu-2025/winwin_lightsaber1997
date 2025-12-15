// lib/http/fetcher.ts

/**
 * Generic HTTP fetch helper function for both server and client.
 *
 * - Automatically prepends the backend base URL (from .env.local)
 * - Handles JSON headers and parsing
 * - Throws an error if the response is not OK (status 200–299)
 * - Uses "no-store" cache for always-fresh SSR data
 *
 * @template T - The expected response data type
 * @param url - The API endpoint path (e.g. "/api/brands")
 * @param options - Optional RequestInit config (method, headers, body, etc.)
 * @returns A Promise resolving to the parsed JSON response of type T
 */
export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  // Build the full API URL using the environment variable defined in .env.local
  // e.g. NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json', // Tell backend we expect JSON
    },
    cache: 'no-store', // Ensure no caching — always fetch fresh data (good for SSR)
    ...options, // Allow overriding or adding fetch options (method, body, etc.)
  });

  // If the HTTP response is not successful (e.g. 404, 500), throw an error
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }

  // Parse and return the JSON body as the generic type T
  return res.json() as Promise<T>;
}
