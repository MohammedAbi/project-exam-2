import React from "react";
import LoginForm from "../forms/LoginForm";
import LoginFooter from "./LoginFooter";

export default function LoginCard() {
  return (
    <div className="max-w-md w-full p-6 rounded border border-gray-200 shadow-2xl">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <LoginForm />
      <LoginFooter />
    </div>
  );
}
