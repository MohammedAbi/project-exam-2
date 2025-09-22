// components/LoadingSpinner.jsx
import { ClipLoader } from "react-spinners";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <ClipLoader color="#3b82f6" size={50} />
    </div>
  );
}
