import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import AppShell from "./components/AppShell";
import CoursesPage from "./pages/CoursesPage";
import LessonsPage from "./pages/LessonsPage";
import PracticePage from "./pages/PracticePage";
import ProgressPage from "./pages/ProgressPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";

// PUBLIC_INTERFACE
function App() {
  /** Root React component that configures client-side routing and the mobile app shell. */
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/courses" replace />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Admin is intentionally outside the bottom tab bar to keep it separate from learner flow */}
        <Route path="/admin" element={<AdminPage />} />

        <Route path="*" element={<Navigate to="/courses" replace />} />
      </Routes>
    </AppShell>
  );
}

export default App;
