import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Login from "./Pages/Login/index";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Login />
  </StrictMode>,
);
