import React, { useEffect, useMemo, useState } from "react";
import { apiGet } from "../api/client";

// PUBLIC_INTERFACE
export default function LessonsPage() {
  /** Lessons list page. */
  const [loading, setLoading] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState("");

  const fallback = useMemo(() => ([
    { id: "l1", title: "Lesson 1: Greetings", durationMin: 5, status: "Ready" },
    { id: "l2", title: "Lesson 2: Numbers", durationMin: 6, status: "Ready" },
    { id: "l3", title: "Lesson 3: Ordering food", durationMin: 8, status: "Locked" }
  ]), []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");

      const candidates = ["/lessons", "/api/lessons"];
      for (const path of candidates) {
        const res = await apiGet(path);
        if (cancelled) return;

        if (res.ok && Array.isArray(res.data)) {
          setLessons(res.data);
          setLoading(false);
          return;
        }
      }

      setLessons(fallback);
      setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, [fallback]);

  return (
    <div className="stack">
      <section className="card">
        <h1 className="h1">Lessons</h1>
        <p className="muted">Short lessons designed for mobile learning. Pick one and practice daily.</p>
        {error ? <p className="error">{error}</p> : null}
      </section>

      <section className="card">
        <div className="row">
          <strong>Today’s set</strong>
          <span className="badge badge-accent">{loading ? "Loading…" : "Quick sessions"}</span>
        </div>
        <div className="divider" />

        <div className="stack">
          {lessons.map((l) => (
            <div key={l.id || l.title} className="card" style={{ padding: 12, borderRadius: 14 }}>
              <div className="row">
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ fontWeight: 800 }}>{l.title || l.name}</div>
                  <div className="muted">{(l.durationMin || l.duration_minutes || 5)} min • {l.status || (l.locked ? "Locked" : "Ready")}</div>
                </div>
                <button
                  className="btn btn-outline"
                  type="button"
                  onClick={() => alert("Lesson playback is a UI stub in this iteration.")}
                >
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
