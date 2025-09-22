import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

/**
 * Custom hook to access authentication state and actions.
 * @returns {Object} Authentication context value.
 */
export function useAuth() {
  return useContext(AuthContext);
}
