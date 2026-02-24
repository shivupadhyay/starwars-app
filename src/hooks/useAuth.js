import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";
// Custom hook useAuth
export const useAuth = () => useContext(AuthContext);
