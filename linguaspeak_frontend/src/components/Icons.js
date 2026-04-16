import React from "react";

function Svg({ children }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

// PUBLIC_INTERFACE
export function IconBook() {
  /** Courses icon. */
  return (
    <Svg>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </Svg>
  );
}

// PUBLIC_INTERFACE
export function IconLessons() {
  /** Lessons icon. */
  return (
    <Svg>
      <path d="M4 4h16v16H4z" />
      <path d="M8 8h8" />
      <path d="M8 12h8" />
      <path d="M8 16h6" />
    </Svg>
  );
}

// PUBLIC_INTERFACE
export function IconMic() {
  /** Practice (speech) icon. */
  return (
    <Svg>
      <path d="M12 14a3 3 0 0 0 3-3V7a3 3 0 0 0-6 0v4a3 3 0 0 0 3 3z" />
      <path d="M19 11a7 7 0 0 1-14 0" />
      <path d="M12 18v4" />
      <path d="M8 22h8" />
    </Svg>
  );
}

// PUBLIC_INTERFACE
export function IconChart() {
  /** Progress icon. */
  return (
    <Svg>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M8 15v-5" />
      <path d="M12 19v-9" />
      <path d="M16 19v-3" />
    </Svg>
  );
}

// PUBLIC_INTERFACE
export function IconUser() {
  /** Profile icon. */
  return (
    <Svg>
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="8" r="4" />
    </Svg>
  );
}

// PUBLIC_INTERFACE
export function IconShield() {
  /** Admin icon. */
  return (
    <Svg>
      <path d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4z" />
      <path d="M9 12l2 2 4-5" />
    </Svg>
  );
}
