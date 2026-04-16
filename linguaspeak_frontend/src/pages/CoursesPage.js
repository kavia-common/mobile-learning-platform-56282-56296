import React, { useEffect, useMemo, useState } from "react";
import { apiGet } from "../api/client";

// PUBLIC_INTERFACE
export default function CoursesPage() {
  /** Courses discovery page. */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [courses, setCourses] = useState([]);

  const fallback = useMemo(() => ([
    { id: "spanish-a1", title: "Spanish • A1", subtitle: "Basics: greetings, numbers, everyday phrases", badge: "New" },
    { id: "french-a1", title: "French • A1", subtitle: "Pronunciation and essential verbs", badge: "Popular" },
    { id: "japanese-a1", title: "Japanese • A1", subtitle: "Hiragana, simple phrases, introductions", badge: "Starter" }
  ]), []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");

      // We don't have a provided OpenAPI spec; try a couple of conventional endpoints.
      const candidates = ["/courses", "/api/courses"];
      for (const path of candidates) {
        const res = await apiGet(path);
        if (cancelled) return;

        if (res.ok && Array.isArray(res.data)) {
          setCourses(res.data);
          setLoading(false);
          return;
        }
      }

      setCourses(fallback);
      setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, [fallback]);

  return (
    <div className="stack">
      <section className="card">
        <h1 className="h1">Choose a course</h1>
        <p className="muted">
          Browse available courses and start learning with short, daily lessons.
        </p>
        <div className="divider" />
        <div className="row">
          <span className="muted">Backend</span>
          <span className="muted">
            <code className="inline">{process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || "not configured"}</code>
          </span>
        </div>
        {error ? <p className="error">{error}</p> : null}
      </section>

      <section className="card">
        <div className="row">
          <strong>Courses</strong>
          <span className="badge badge-success">{loading ? "Loading…" : `${courses.length} available`}</span>
        </div>

        <div className="divider" />

        <div className="stack">
          {courses.map((c) => (
            <div key={c.id || c.slug || c.title} className="card" style={{ padding: 12, borderRadius: 14 }}>
              <div className="row">
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ fontWeight: 800 }}>{c.title || c.name}</div>
                  <div className="muted">{c.subtitle || c.description}</div>
                </div>
                <span className="badge badge-accent">{c.badge || c.level || "A1"}</span>
              </div>
              <div style={{ height: 10 }} />
              <button className="btn btn-primary" type="button" onClick={() => alert("Course selection is a UI stub in this iteration.")}>
                Start
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
