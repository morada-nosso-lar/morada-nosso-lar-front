import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./Router/index.jsx";
import { AuthProvider } from "./contexts/AuthContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
