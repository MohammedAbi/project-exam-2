import { Link } from "react-router-dom";
import RegisterForm from "../components/forms/RegisterForm";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="max-w-xl w-full p-6 border border-gray-200 rounded shadow-2xl">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <RegisterForm />
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
