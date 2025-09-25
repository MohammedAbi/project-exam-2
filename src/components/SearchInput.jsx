import React, { useState } from "react";

export default function SearchInput({
  value,
  onSearch,
  placeholder = "Search...",
}) {
  const [inputValue, setInputValue] = useState(value || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mb-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="border rounded-l px-4 py-2 w-64 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded-r hover:bg-purple-700 transition"
      >
        Search
      </button>
    </form>
  );
}
