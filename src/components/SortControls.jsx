export default function SortControls({ params, setParams }) {
  return (
    <div className="flex flex-wrap justify-center items-center gap-6 mb-8 border-gray-200 p-4">
      {/* Sort by */}
      <div className="flex flex-col items-center sm:items-start bg-purple-100 border border-gray-200 px-8 py-4 rounded">
        <span className="text-gray-700 font-medium mb-2">Sort by:</span>
        <div className="flex gap-4">
          {["name", "price", "rating"].map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 cursor-pointer text-sm"
            >
              <input
                type="radio"
                name="sort"
                value={option}
                checked={params.sort === option}
                onChange={(e) =>
                  setParams((prev) => ({
                    ...prev,
                    sort: e.target.value,
                    page: 1,
                  }))
                }
                className="text-purple-600 focus:ring-purple-500"
              />
              <span className="capitalize">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Order */}
      <div className="flex flex-col items-center sm:items-start bg-purple-100 border border-gray-200 px-8 py-4 rounded">
        <span className="text-gray-700 font-medium mb-2">Order:</span>
        <div className="flex gap-4">
          {[
            { value: "asc", label: "Ascending" },
            { value: "desc", label: "Descending" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer text-sm"
            >
              <input
                type="radio"
                name="sortOrder"
                value={option.value}
                checked={params.sortOrder === option.value}
                onChange={(e) =>
                  setParams((prev) => ({
                    ...prev,
                    sortOrder: e.target.value,
                    page: 1,
                  }))
                }
                className="text-purple-600 focus:ring-purple-500"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
