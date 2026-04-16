import React, { useState } from "react";

// PUBLIC_INTERFACE
export default function ProfilePage() {
  /** User profile / settings page (UI-only stub). */
  const [name, setName] = useState("Alex Learner");
  const [nativeLang, setNativeLang] = useState("English");
  const [targetLang, setTargetLang] = useState("Spanish");

  return (
    <div className="stack">
      <section className="card">
        <h1 className="h1">Profile</h1>
        <p className="muted">Manage learning preferences. Authentication is not implemented in this iteration.</p>
      </section>

      <section className="card">
        <div className="stack">
          <label>
            <div className="muted" style={{ marginBottom: 6 }}>Display name</div>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label>
            <div className="muted" style={{ marginBottom: 6 }}>Native language</div>
            <input className="input" value={nativeLang} onChange={(e) => setNativeLang(e.target.value)} />
          </label>

          <label>
            <div className="muted" style={{ marginBottom: 6 }}>Target language</div>
            <input className="input" value={targetLang} onChange={(e) => setTargetLang(e.target.value)} />
          </label>

          <button className="btn btn-secondary" type="button" onClick={() => alert("Saved (UI stub).")}>
            Save
          </button>

          <div className="divider" />

          <div className="muted">
            Backend API base is read from <code className="inline">REACT_APP_API_BASE</code> (preferred) or <code className="inline">REACT_APP_BACKEND_URL</code>.
          </div>
        </div>
      </section>
    </div>
  );
}
