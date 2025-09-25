import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeroSlider from "../components/HeroSlider";
import LoadingSpinner from "../components/LoadingSpinner";
import { useVenues } from "../hooks/useVenues";
import SortControls from "../components/SortControls";
import VenuesGrid from "../components/VenuesGrid";
import Pagination from "../components/Pagination";
import SearchInput from "../components/SearchInput";

export default function Home() {
  const limit = 10;
  const [search, setSearch] = useState("");

  const { venues, loading, error, totalPages, currentPage, params, setParams } =
    useVenues({ limit, page: 1, sort: "name", sortOrder: "asc" });

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handlePrevious = () => {
    if (currentPage > 1)
      setParams((prev) => ({ ...prev, page: prev.page - 1 }));
  };

  const handleNext = () => {
    if (currentPage < totalPages)
      setParams((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <main className="space-y-6">
      <HeroSlider />
      <h1
        className="text-3xl font-bold text-center drop-shadow-lg"
        id="rooms-title"
      >
        Available Rooms & Suites
      </h1>

      <SortControls params={params} setParams={setParams} />

      <SearchInput
        value={search}
        onSearch={(value) => {
          setSearch(value); // update local state for input
          setParams((prev) => ({ ...prev, search: value, page: 1 })); // update API fetch params
        }}
        placeholder="Search for venues..."
      />

      {loading ? (
        <LoadingSpinner />
      ) : venues.length > 0 ? (
        <VenuesGrid venues={venues} />
      ) : (
        <p className="text-center text-gray-500 text-lg mt-6">
          No venues found for "{search}"
        </p>
      )}

      {(venues.length > 0 || currentPage > 1) && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </main>
  );
}
