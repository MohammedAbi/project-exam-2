import React, { useState, useEffect } from "react";
import {
  clearAuthData,
  getUserData,
  saveAuthData,
} from "../../config/services/authStorage";
import { loginUser, registerUser } from "../../config/services/authApi";
import { AuthContext } from "./AuthContext";

// 2️⃣ Provider component
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => getUserData());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  function logout() {
    clearAuthData();
    setAuth(null);
  }

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
