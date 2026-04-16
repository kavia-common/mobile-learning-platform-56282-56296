import React, { useMemo, useState } from "react";

// PUBLIC_INTERFACE
export default function PracticePage() {
  /** Speech practice page using browser speech recognition when available. */
  const SpeechRecognition = useMemo(() => {
    return window.SpeechRecognition || window.webkitSpeechRecognition || null;
  }, []);

  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");

  const start = () => {
    setError("");
    setTranscript("");

    if (!SpeechRecognition) {
      setError("Speech recognition is not available in this browser. Try Chrome on Android/desktop.");
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.continuous = false;

    rec.onresult = (e) => {
      const text = Array.from(e.results).map(r => r[0].transcript).join("");
      setTranscript(text);
    };
    rec.onerror = (e) => setError(e?.error || "Speech recognition error");
    rec.onend = () => setListening(false);

    setListening(true);
    rec.start();
  };

  return (
    <div className="stack">
      <section className="card">
        <h1 className="h1">Practice (Speech)</h1>
        <p className="muted">
          Tap “Start” and say the phrase. This is a client-only stub using the Web Speech API.
        </p>
        <div className="divider" />
        <div className="stack">
          <div className="card" style={{ padding: 12, borderRadius: 14 }}>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Try saying:</div>
            <div className="muted">“Hello, how are you?”</div>
          </div>

          <button className="btn btn-primary" onClick={start} disabled={listening}>
            {listening ? "Listening…" : "Start"}
          </button>

          {error ? <div className="error">{error}</div> : null}

          <div className="card" style={{ padding: 12, borderRadius: 14 }}>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Transcript</div>
            <div className="muted">{transcript ? transcript : "—"}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
