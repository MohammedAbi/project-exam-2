import { Link } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full p-6 rounded border border-gray-200 shadow-2xl">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <LoginForm />
        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-purple-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
