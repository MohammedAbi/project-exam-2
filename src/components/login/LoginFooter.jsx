import React from "react";
import { Link } from "react-router-dom";

export default function LoginFooter() {
  return (
    <p className="mt-4 text-center text-sm text-gray-600">
      Don&apos;t have an account?{" "}
      <Link to="/register" className="text-purple-600 hover:underline">
        Sign up
      </Link>
    </p>
  );
}
