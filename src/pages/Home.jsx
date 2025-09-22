// import { useEffect } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import VenueCard from "../components/VenueCard";
// import HeroSlider from "../components/HeroSlider";
// import { useVenues } from "../hooks/useVenues";
// import LoadingSpinner from "../components/LoadingSpinner";

// export default function Home() {
//   const limit = 10;

//   // Use useVenues hook
//   const { venues, loading, error, totalPages, currentPage, setParams } =
//     useVenues({
//       limit,
//       page: 1,
//     });

//   // Show error toast if API fails
//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//     }
//   }, [error]);

//   // Pagination handlers
//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setParams((prev) => ({ ...prev, page: prev.page - 1 }));
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       setParams((prev) => ({ ...prev, page: prev.page + 1 }));
//     }
//   };

//   if (loading) return <LoadingSpinner />;

//   return (
//     <div className="space-y-6">
//       {/* Hero / Slider */}
//       <HeroSlider />

//       {/* Title */}
//       <h1 className="text-3xl font-bold text-center" id="rooms-title">
//         Available Rooms & Suites
//       </h1>

//       {/* Venues grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//         {venues.map((venue) => (
//           <VenueCard key={venue.id} venue={venue} />
//         ))}
//       </div>

//       {/* Pagination controls */}
//       {(venues.length > 0 || currentPage > 1) && (
//         <div className="flex justify-center items-center gap-4 mb-6">
//           <button
//             onClick={handlePrevious}
//             disabled={currentPage === 1}
//             className={`px-4 py-2 rounded ${
//               currentPage === 1
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-purple-600 hover:bg-purple-900 text-white"
//             }`}
//           >
//             Previous
//           </button>

//           {/* Current Page / Total Pages */}
//           <span className="text-gray-700">
//             Page {currentPage} of {totalPages}
//           </span>

//           <button
//             onClick={handleNext}
//             disabled={currentPage >= totalPages}
//             className={`px-4 py-2 rounded ${
//               currentPage >= totalPages
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-purple-600 hover:bg-purple-900 text-white"
//             }`}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useEffect } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import VenueCard from "../components/VenueCard";
// import HeroSlider from "../components/HeroSlider";
// import { useVenues } from "../hooks/useVenues";
// import LoadingSpinner from "../components/LoadingSpinner";

// export default function Home() {
//   const limit = 10;

//   // Use useVenues hook
//   const { venues, loading, error, totalPages, currentPage, setParams } =
//     useVenues({
//       limit,
//       page: 1,
//     });

//   // Show error toast if API fails
//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//     }
//   }, [error]);

//   // Pagination handlers
//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setParams((prev) => ({ ...prev, page: prev.page - 1 }));
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       setParams((prev) => ({ ...prev, page: prev.page + 1 }));
//     }
//   };

//   if (loading) return <LoadingSpinner />;

//   return (
//     <div className="space-y-6">
//       {/* Hero / Slider */}
//       <HeroSlider />

//       {/* Title */}
//       <h1 className="text-3xl font-bold text-center" id="rooms-title">
//         Available Rooms & Suites
//       </h1>

//       {/* Venues grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//         {venues.map((venue) => (
//           <VenueCard key={venue.id} venue={venue} />
//         ))}
//       </div>

//       {/* Pagination controls */}
//       {(venues.length > 0 || currentPage > 1) && (
//         <div className="flex justify-center items-center gap-4 mb-6">
//           <button
//             onClick={handlePrevious}
//             disabled={currentPage === 1}
//             className={`px-4 py-2 rounded ${
//               currentPage === 1
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-purple-600 hover:bg-purple-900 text-white"
//             }`}
//           >
//             Previous
//           </button>

//           {/* Current Page / Total Pages */}
//           <span className="text-gray-700">
//             Page {currentPage} of {totalPages}
//           </span>

//           <button
//             onClick={handleNext}
//             disabled={currentPage >= totalPages}
//             className={`px-4 py-2 rounded ${
//               currentPage >= totalPages
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-purple-600 hover:bg-purple-900 text-white"
//             }`}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VenueCard from "../components/VenueCard";
import HeroSlider from "../components/HeroSlider";
import { useVenues } from "../hooks/useVenues";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {
  const limit = 10;

  const { venues, loading, error, totalPages, currentPage, params, setParams } =
    useVenues({
      limit,
      page: 1,
      sort: "name",
      sortOrder: "asc",
    });

  // Show error toast if API fails
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // Pagination handlers
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
      {/* Hero / Slider */}
      <HeroSlider />

      {/* Title */}
      <h1 className="text-3xl font-bold text-center" id="rooms-title">
        Available Rooms & Suites
      </h1>

      {/* Sorting controls */}
      <div className="flex justify-center items-center gap-4 mb-4">
        <label>
          Sort by:
          <select
            value={params.sort}
            onChange={(e) =>
              setParams((prev) => ({ ...prev, sort: e.target.value, page: 1 }))
            }
            className="ml-2 border p-1 rounded"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </label>

        <label>
          Order:
          <select
            value={params.sortOrder}
            onChange={(e) =>
              setParams((prev) => ({
                ...prev,
                sortOrder: e.target.value,
                page: 1,
              }))
            }
            className="ml-2 border p-1 rounded"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      {/* Venues grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>

      {/* Pagination controls */}
      {(venues.length > 0 || currentPage > 1) && (
        <div className="flex justify-center items-center gap-4 mb-6">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-900 text-white"
            }`}
          >
            Previous
          </button>

          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage >= totalPages}
            className={`px-4 py-2 rounded ${
              currentPage >= totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-900 text-white"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
