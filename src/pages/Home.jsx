// import { useEffect } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import VenueCard from "../components/VenueCard";
// import HeroSlider from "../components/HeroSlider";
// import { useVenues } from "../hooks/useVenues";
// import LoadingSpinner from "../components/LoadingSpinner";
// import { Helmet } from "react-helmet";

// export default function Home() {
//   const limit = 10;

//   const { venues, loading, error, totalPages, currentPage, params, setParams } =
//     useVenues({
//       limit,
//       page: 1,
//       sort: "name",
//       sortOrder: "asc",
//     });

//   // Show error toast if API fails
//   useEffect(() => {
//     if (error) toast.error(error);
//   }, [error]);

//   // Pagination handlers
//   const handlePrevious = () => {
//     if (currentPage > 1)
//       setParams((prev) => ({ ...prev, page: prev.page - 1 }));
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages)
//       setParams((prev) => ({ ...prev, page: prev.page + 1 }));
//   };

//   if (loading) return <LoadingSpinner />;

//   return (
//     <>
//       <Helmet>
//         <title>Holidaze | Vacation Rentals</title>
//       </Helmet>
//       <div className="space-y-6">
//         {/* Hero / Slider */}
//         <HeroSlider />
//         {/* Title */}
//         <h1 className="text-3xl font-bold text-center" id="rooms-title">
//           Available Rooms & Suites
//         </h1>
//         {/* Sorting controls */}
//         <div className="flex flex-wrap justify-center items-center gap-6 mb-8 border-gray-200 p-4 ">
//           {/* Sort by */}
//           <div className="flex flex-col items-center sm:items-start bg-purple-100 border border-gray-200 px-8 py-4 rounded">
//             <span className="text-gray-700 font-medium mb-2">Sort by:</span>
//             <div className="flex gap-4">
//               {["name", "price", "rating"].map((option) => (
//                 <label
//                   key={option}
//                   className="flex items-center gap-2 cursor-pointer text-sm"
//                 >
//                   <input
//                     type="radio"
//                     name="sort"
//                     value={option}
//                     checked={params.sort === option}
//                     onChange={(e) =>
//                       setParams((prev) => ({
//                         ...prev,
//                         sort: e.target.value,
//                         page: 1,
//                       }))
//                     }
//                     className="text-purple-600 focus:ring-purple-500"
//                   />
//                   <span className="capitalize">{option}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Order */}
//           <div className="flex flex-col items-center sm:items-start bg-purple-100 border border-gray-200 px-8 py-4 rounded">
//             <span className="text-gray-700 font-medium mb-2">Order:</span>
//             <div className="flex gap-4">
//               {[
//                 { value: "asc", label: "Ascending" },
//                 { value: "desc", label: "Descending" },
//               ].map((option) => (
//                 <label
//                   key={option.value}
//                   className="flex items-center gap-2 cursor-pointer text-sm"
//                 >
//                   <input
//                     type="radio"
//                     name="sortOrder"
//                     value={option.value}
//                     checked={params.sortOrder === option.value}
//                     onChange={(e) =>
//                       setParams((prev) => ({
//                         ...prev,
//                         sortOrder: e.target.value,
//                         page: 1,
//                       }))
//                     }
//                     className="text-purple-600 focus:ring-purple-500"
//                   />
//                   {option.label}
//                 </label>
//               ))}
//             </div>
//           </div>
//         </div>
//         {/* Venues grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//           {venues.map((venue) => (
//             <VenueCard key={venue.id} venue={venue} />
//           ))}
//         </div>
//         {/* Pagination controls */}
//         {(venues.length > 0 || currentPage > 1) && (
//           <div className="flex justify-center items-center gap-4 mb-6">
//             <button
//               onClick={handlePrevious}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 rounded ${
//                 currentPage === 1
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-purple-600 hover:bg-purple-900 text-white"
//               }`}
//             >
//               Previous
//             </button>

//             <span className="text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>

//             <button
//               onClick={handleNext}
//               disabled={currentPage >= totalPages}
//               className={`px-4 py-2 rounded ${
//                 currentPage >= totalPages
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-purple-600 hover:bg-purple-900 text-white"
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeroSlider from "../components/HeroSlider";
import LoadingSpinner from "../components/LoadingSpinner";
import { useVenues } from "../hooks/useVenues";
import SortControls from "../components/SortControls";
import VenuesGrid from "../components/VenuesGrid";
import Pagination from "../components/Pagination";
import { Helmet } from "react-helmet";

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
    <>
      <Helmet>
        <title>Holidaze | Vacation Rentals</title>
      </Helmet>

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
    </>
  );
}
