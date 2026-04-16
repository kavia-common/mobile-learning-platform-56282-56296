import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { IconBook, IconLessons, IconMic, IconChart, IconUser, IconShield } from "./Icons";

function Tab({ to, label, Icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `tab${isActive ? " active" : ""}`}
      aria-label={label}
    >
      <span className="icon" aria-hidden="true"><Icon /></span>
      <span>{label}</span>
    </NavLink>
  );
}

// PUBLIC_INTERFACE
export default function AppShell({ children }) {
  /** Layout container that provides header + tab navigation for mobile-first UX. */
  const location = useLocation();
  const navigate = useNavigate();

  const onAdminClick = () => {
    navigate("/admin");
  };

  const pageLabelMap = {
    "/courses": "Courses",
    "/lessons": "Lessons",
    "/practice": "Practice",
    "/progress": "Progress",
    "/profile": "Profile",
    "/admin": "Admin"
  };

  const current = Object.keys(pageLabelMap).find((k) => location.pathname.startsWith(k)) || "/courses";
  const title = pageLabelMap[current] || "Linguaspeak";

  return (
    <div className="App">
      <div className="app-shell">
        <div className="app-frame">
          <header className="app-header">
            <div className="brand" role="banner">
              <div className="brand-title">Linguaspeak</div>
              <div className="brand-subtitle">{title}</div>
            </div>

            <div className="header-actions">
              <div className="pill" title="Backend base URL">
                API <strong>{(process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL) ? "connected" : "not set"}</strong>
              </div>
              <button className="admin-link" onClick={onAdminClick} aria-label="Open admin tools">
                <IconShield />
              </button>
            </div>
          </header>

          <main className="app-content" role="main">
            {children}
          </main>

          <nav className="tabbar" aria-label="Primary navigation">
            <div className="tabbar-inner">
              <Tab to="/courses" label="Courses" Icon={IconBook} />
              <Tab to="/lessons" label="Lessons" Icon={IconLessons} />
              <Tab to="/practice" label="Practice" Icon={IconMic} />
              <Tab to="/progress" label="Progress" Icon={IconChart} />
              <Tab to="/profile" label="Profile" Icon={IconUser} />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
