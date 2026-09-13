import { createContext, useState } from "react";
import { api } from "../services/api";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    return !!token;
  });

  async function signIn(email, password) {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erro na tentativa de login:", error);
      throw error;
    }
  }

  function signOut() {
    localStorage.removeItem("token"); // Apaga o crachá do HD
    setIsAuthenticated(false); // Muda o sinal para vermelho
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
