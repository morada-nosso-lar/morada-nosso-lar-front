import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importações das nossas páginas e layouts
import Login from "../Pages/Login";
import AppLayout from "../layouts/AppLayout";
import Notification from "../Pages/Notification";
import Settings from "../Pages/Settings";
import Dashboard from "../Pages/Dashboard";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/settings" element={<Settings />} />

          <Route path="/notification" element={<Notification />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
