import React, { useState } from "react";
import { apiGet, getApiBaseUrl } from "../api/client";

// PUBLIC_INTERFACE
export default function AdminPage() {
  /** Admin tools page (UI stub) accessible via header button. */
  const [health, setHealth] = useState(null);
  const [error, setError] = useState("");

  const checkHealth = async () => {
    setError("");
    setHealth(null);

    // Conventional health paths; backend may differ.
    const candidates = ["/health", "/api/health", "/status", "/api/status"];
    for (const path of candidates) {
      const res = await apiGet(path);
      if (res.ok) {
        setHealth({ path, payload: res.data });
        return;
      }
    }
    setError("Could not find a health endpoint. This UI is ready; wire it to your backend routes when available.");
  };

  return (
    <div className="stack">
      <section className="card">
        <h1 className="h1">Admin</h1>
        <p className="muted">Admin tools are separated from the learner tabs and accessible via the shield icon in the header.</p>
      </section>

      <section className="card">
        <div className="row">
          <strong>Connectivity</strong>
          <span className="badge badge-success">Env-based</span>
        </div>
        <div className="divider" />
        <div className="muted">
          API base URL: <code className="inline">{getApiBaseUrl() || "not configured"}</code>
        </div>

        <div style={{ height: 10 }} />

        <button className="btn btn-primary" type="button" onClick={checkHealth}>
          Check backend health
        </button>

        {error ? <div className="error" style={{ marginTop: 10 }}>{error}</div> : null}

        {health ? (
          <div className="card" style={{ marginTop: 12, padding: 12, borderRadius: 14 }}>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Health response ({health.path})</div>
            <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: 12 }}>
              {JSON.stringify(health.payload, null, 2)}
            </pre>
          </div>
        ) : null}
      </section>
    </div>
  );
}
