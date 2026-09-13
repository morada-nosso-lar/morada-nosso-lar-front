import { BrowserRouter, Routes, Route } from "react-router-dom";
import  ProtectedRoute from "./ProtectedRoute"
import Login from "../Pages/Login";
import Notification from "../Pages/Notification";
import Settings from "../Pages/Settings";
import Dashboard from "../Pages/Dashboard";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/settings" element={<Settings />} />

        <Route path="/notification" element={<Notification />} />
      </Routes>
    </BrowserRouter>
  );
}
