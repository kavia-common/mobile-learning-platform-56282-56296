import React, { useEffect, useState } from "react";
import { apiGet } from "../api/client";

// PUBLIC_INTERFACE
export default function ProgressPage() {
  /** User progress overview page. */
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      const candidates = ["/progress", "/api/progress", "/me/progress", "/api/me/progress"];
      for (const path of candidates) {
        const res = await apiGet(path);
        if (cancelled) return;

        if (res.ok && res.data) {
          setProgress(res.data);
          setLoading(false);
          return;
        }
      }

      // Fallback stub progress
      setProgress({
        streakDays: 4,
        lessonsCompleted: 12,
        minutesThisWeek: 48,
        nextGoal: "Complete 1 lesson today"
      });
      setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="stack">
      <section className="card">
        <h1 className="h1">Progress</h1>
        <p className="muted">Keep your streak going and track weekly learning time.</p>
      </section>

      <section className="card">
        <div className="row">
          <strong>Overview</strong>
          <span className="badge badge-success">{loading ? "Loading…" : "Up to date"}</span>
        </div>
        <div className="divider" />

        <div className="stack">
          <div className="card" style={{ padding: 12, borderRadius: 14 }}>
            <div className="row">
              <span className="muted">Streak</span>
              <strong>{progress?.streakDays ?? "—"} days</strong>
            </div>
          </div>
          <div className="card" style={{ padding: 12, borderRadius: 14 }}>
            <div className="row">
              <span className="muted">Lessons completed</span>
              <strong>{progress?.lessonsCompleted ?? "—"}</strong>
            </div>
          </div>
          <div className="card" style={{ padding: 12, borderRadius: 14 }}>
            <div className="row">
              <span className="muted">Minutes this week</span>
              <strong>{progress?.minutesThisWeek ?? "—"}</strong>
            </div>
          </div>
          <div className="card" style={{ padding: 12, borderRadius: 14 }}>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Next goal</div>
            <div className="muted">{progress?.nextGoal ?? "—"}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
