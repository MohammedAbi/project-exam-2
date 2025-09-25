import React from "react";
export default function PaginationControls({
  page,
  totalPages,
  onPrev,
  onNext,
}) {
  return (
    <div className="flex justify-center items-center gap-2 sm:gap-4 mt-6 text-sm sm:text-base">
      <button
        data-testid="prev-button"
        onClick={onPrev}
        disabled={page === 1}
        className="px-3 sm:px-4 py-1 sm:py-2 bg-purple-600 hover:bg-purple-900 text-white rounded disabled:bg-gray-300"
      >
        Prev
      </button>
      <span>
        Page {page}
        {totalPages ? ` of ${totalPages}` : ""}
      </span>
      <button
        data-testid="next-button"
        onClick={onNext}
        disabled={totalPages ? page >= totalPages : false}
        className="px-3 sm:px-4 py-1 sm:py-2 bg-purple-600 hover:bg-purple-900 text-white rounded disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
}
