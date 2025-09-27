import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { isLoggedIn } from "../../config/services/authStorage";
import { ValidateLogin } from "./formValidation/Validation";
import { useAuth } from "../../hooks/useAuth";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ValidateLogin(formData)) {
      return;
    }
    const loggedInUser = await login(formData.email, formData.password);
    if (loggedInUser) {
      toast.success("Login successful!");
      navigate("/");
    } else {
      toast.error(error || "Login failed. Please try again.");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="block mb-1 font-semibold">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="first.last@stud.noroff.no"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-1 font-semibold">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
          minLength="8"
          className="w-full border p-2 rounded"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
