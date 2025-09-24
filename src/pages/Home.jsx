import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeroSlider from "../components/HeroSlider";
import LoadingSpinner from "../components/LoadingSpinner";
import { useVenues } from "../hooks/useVenues";
import SortControls from "../components/SortControls";
import VenuesGrid from "../components/VenuesGrid";
import Pagination from "../components/Pagination";

export default function Home() {
  const limit = 10;

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
    <div className="space-y-6">
      <HeroSlider />
      <h1 className="text-3xl font-bold text-center" id="rooms-title">
        Available Rooms & Suites
      </h1>

      <SortControls params={params} setParams={setParams} />

      <VenuesGrid venues={venues} />

      {(venues.length > 0 || currentPage > 1) && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  );
}
