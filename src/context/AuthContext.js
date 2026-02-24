import { createContext, useEffect, useState } from "react";
import { generateToken } from "../api/auth";

export const AuthContext = createContext();

// Created AuthProvider to wrap entire app with all required values.
// Storing Token in Local Storage
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Login session
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  // Logout session
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // Silent Refresh

  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      const decode = JSON.parse(atob(token));
      if (decode.exp < Date.now()) {
        const newRefreshedToken = generateToken();
        login(newRefreshedToken);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [token]);
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
