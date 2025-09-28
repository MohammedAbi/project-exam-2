import React, { useState, useEffect } from "react";
import {
  clearAuthData,
  getUserData,
  saveAuthData,
} from "../../config/services/authStorage";
import { loginUser, registerUser } from "../../config/services/authApi";
import { AuthContext } from "./AuthContext";

/**
 * AuthProvider wraps app and provides authentication state and actions.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - React children components
 * @returns {JSX.Element} Provider component with authentication context
 */
export function AuthProvider({ children }) {
  /** @type {[Object|null, Function]} auth state and setter */
  const [auth, setAuth] = useState(() => getUserData());

  /** @type {[boolean, Function]} loading state for async requests */
  const [loading, setLoading] = useState(false);

  /** @type {[string|null, Function]} error messages from auth actions */
  const [error, setError] = useState(null);

  /**
   * Register a new user
   * @param {Object} formData - User registration data
   * @returns {Promise<Object>} Auth data on successful registration
   * @throws {Error} If registration fails
   */
  async function register(formData) {
    setLoading(true);
    setError(null);
    try {
      const { data } = await registerUser(formData);
      saveAuthData(data);
      setAuth(data);
      return data;
    } catch (err) {
      const message = err.response?.data?.errors?.[0]?.message || err.message;
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Log in an existing user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object|null>} Auth data if successful, null if failed
   */
  async function login(email, password) {
    setLoading(true);
    setError(null);
    try {
      const { data } = await loginUser(email, password);
      saveAuthData(data);
      setAuth(data);
      return data;
    } catch (err) {
      setError(err.response?.data?.errors?.[0]?.message || err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  /** Log out the current user and clear stored auth data */
  function logout() {
    clearAuthData();
    setAuth(null);
  }

  // Sync auth state with localStorage changes
  useEffect(() => {
    function onStorageChange() {
      setAuth(getUserData());
    }
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        loading,
        error,
        accessToken: auth?.accessToken || null,
        isLoggedIn: Boolean(auth?.accessToken),
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
