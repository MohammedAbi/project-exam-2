import { Link } from "react-router-dom";

export default function RegisterFooter() {
  return (
    <p className="mt-4 text-center text-sm text-gray-600">
      Already have an account?{" "}
      <Link to="/login" className="text-purple-600 hover:underline">
        Log in
      </Link>
    </p>
  );
}
