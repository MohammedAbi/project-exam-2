import RegisterForm from "../forms/RegisterForm";
import RegisterFooter from "./RegisterFooter";

export default function RegisterCard() {
  return (
    <div className="max-w-xl w-full p-6 border border-gray-200 rounded shadow-2xl">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <RegisterForm />
      <RegisterFooter />
    </div>
  );
}
