export default function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}) {
  return (
    <div className="flex justify-center items-center gap-4 mb-6">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-900 text-white"}`}
      >
        Previous
      </button>

      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={currentPage >= totalPages}
        className={`px-4 py-2 rounded ${currentPage >= totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-900 text-white"}`}
      >
        Next
      </button>
    </div>
  );
}
