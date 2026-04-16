/**
 * Minimal REST client for the Linguaspeak backend.
 * Uses environment variables for base URL, without hardcoding any configuration.
 */

function normalizeBaseUrl(url) {
  if (!url) return "";
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

// PUBLIC_INTERFACE
export function getApiBaseUrl() {
  /**
   * Returns the configured backend base URL.
   *
   * Priority:
   *  1) REACT_APP_API_BASE (preferred)
   *  2) REACT_APP_BACKEND_URL (fallback)
   *
   * If neither is set, returns empty string and requests will be treated as "not configured".
   */
  const apiBase = process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || "";
  return normalizeBaseUrl(apiBase);
}

async function safeReadJson(response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (e) {
    return { raw: text };
  }
}

// PUBLIC_INTERFACE
export async function apiGet(path) {
  /** Performs a GET request to the backend REST API. */
  const base = getApiBaseUrl();
  if (!base) {
    return {
      ok: false,
      status: 0,
      data: null,
      error: "Backend API base URL is not configured. Set REACT_APP_API_BASE or REACT_APP_BACKEND_URL."
    };
  }

  const url = `${base}${path.startsWith("/") ? "" : "/"}${path}`;
  try {
    const res = await fetch(url, { method: "GET", headers: { Accept: "application/json" } });
    const data = await safeReadJson(res);
    return { ok: res.ok, status: res.status, data, error: res.ok ? null : (data?.detail || data?.error || "Request failed") };
  } catch (e) {
    return { ok: false, status: 0, data: null, error: e?.message || "Network error" };
  }
}
