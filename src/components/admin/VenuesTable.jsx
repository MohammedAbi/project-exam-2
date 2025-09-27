import LoadingSpinner from "../LoadingSpinner";
import VenueActions from "./VenueActions";

export default function VenuesTable({
  venues,
  loading,
  error,
  onEdit,
  onDelete,
}) {
  if (loading)
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );

  if (error) return <div className="text-red-600">Error: {error}</div>;

  if (!venues || venues.length === 0) return <div>No venues found.</div>;

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
      <table className="min-w-full bg-white text-xs sm:text-sm">
        <thead>
          <tr className="bg-purple-600 text-white text-left uppercase">
            <th className="p-2 sm:p-4">Image</th>
            <th className="p-2 sm:p-4">Name</th>
            <th className="p-2 sm:p-4 hidden md:table-cell">Description</th>
            <th className="p-2 sm:p-4 text-center">Max Guests</th>
            <th className="p-2 sm:p-4 text-center">Price / Night</th>
            <th className="p-2 sm:p-4 text-center">Rating</th>
            <th className="p-2 sm:p-4 hidden lg:table-cell">Location</th>
            <th className="p-2 sm:p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {venues.map((venue) => (
            <tr
              key={venue.id}
              className="hover:bg-purple-50 transition-colors last:border-none"
            >
              <td className="p-2 sm:p-3">
                <img
                  src={venue.media?.[0]?.url}
                  alt={venue.media?.[0]?.alt || venue.name}
                  className="w-6 h-6 sm:w-8 sm:h-8 object-cover rounded"
                />
              </td>
              <td className="p-2 sm:p-3 text-purple-800 truncate">
                {venue.name}
              </td>
              <td className="p-2 sm:p-3 text-purple-800 hidden md:table-cell max-w-xs truncate">
                {venue.description || "No description"}
              </td>
              <td className="p-2 sm:p-3 text-purple-800 text-center">
                {venue.maxGuests}
              </td>
              <td className="p-2 sm:p-3 text-purple-800 text-center">
                ${venue.price}
              </td>
              <td className="p-2 sm:p-3 text-center text-yellow-600">
                {venue.rating != null ? venue.rating.toFixed(1) : "-"} ⭐
              </td>
              <td className="p-2 sm:p-3 text-purple-800 hidden lg:table-cell max-w-xs truncate">
                {venue.location?.city || "Unknown city"},{" "}
                {venue.location?.country || "Unknown country"}
              </td>
              <td className="p-2 sm:p-3 text-center">
                <VenueActions
                  onEdit={() => onEdit(venue.id)}
                  onDelete={() => onDelete(venue.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
