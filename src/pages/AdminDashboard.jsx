import React, { useState } from "react";
import { toast } from "react-toastify";

import { getAccessToken, getUserData } from "../config/services/authStorage";
import { venuesApi } from "../config/services/venuesApi";
import CreateVenueForm from "../components/forms/CreateVenueForm";
import { useVenues } from "../hooks/useVenues";

export default function AdminDashboard() {
  const currentUser = getUserData();
  const accessToken = getAccessToken();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editVenueId, setEditVenueId] = useState(null);

  const initialParams = currentUser
    ? { owner: currentUser.name, page: 1, limit: 5 }
    : { owner: "", page: 1, limit: 5 };

  const { venues, loading, error, totalPages, params, setParams, refetch } =
    useVenues(initialParams, accessToken);

  const openCreateModal = () => {
    setEditVenueId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (venueId) => {
    setEditVenueId(venueId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditVenueId(null);
    setIsModalOpen(false);
  };

  const goToPrevPage = () =>
    setParams((prev) => ({ ...prev, page: Math.max(prev.page - 1, 1) }));

  const goToNextPage = () =>
    setParams((prev) => ({
      ...prev,
      page: totalPages ? Math.min(prev.page + 1, totalPages) : prev.page + 1,
    }));

  const handleDelete = async (venueId) => {
    if (!venueId) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this venue?"
    );
    if (!confirmed) return;

    try {
      await venuesApi.deleteVenue(venueId, accessToken);
      toast.success("Venue deleted successfully!");
      refetch();
    } catch (err) {
      toast.error(`Failed to delete venue: ${err.message || err}`);
    }
  };

  if (!currentUser) return <div>User not logged in.</div>;


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {isModalOpen && (
        <CreateVenueForm
          onClose={closeModal}
          accessToken={accessToken}
          venueId={editVenueId}
          refreshVenues={refetch}
        />
      )}

      {/* User Header */}
      <header
        className="rounded-lg mb-8 sm:mb-12 text-white text-center p-6 sm:p-10 md:p-12 relative overflow-hidden"
        style={{
          backgroundImage: `url(${currentUser.banner?.url || "/default-banner.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "inset 0 0 0 2000px rgba(0,0,0,0.5)",
        }}
      >
        <img
          src={currentUser.avatar?.url || "/default-avatar.png"}
          alt={currentUser.avatar?.alt || currentUser.name || "User avatar"}
          className="mx-auto rounded-full border-4 border-white w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover mb-4 shadow-lg"
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold drop-shadow-lg">
          {currentUser.name}
        </h1>
        <p className="mt-3 max-w-xl mx-auto text-base sm:text-lg font-light drop-shadow-sm">
          {currentUser.bio}
        </p>
        <p className="mt-1 text-xs sm:text-sm opacity-80 drop-shadow-sm">
          {currentUser.email}
        </p>
      </header>

      {/* Venues Section */}
      <section>
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            My Venues
          </h2>
          <button
            onClick={openCreateModal}
            className="bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded hover:bg-green-700 transition text-sm sm:text-base"
          >
            + Create New Venue
          </button>
        </div>

        {loading ? (
          <div>Loading your venues...</div>
        ) : error ? (
          <div className="text-red-600">Error: {error}</div>
        ) : venues.length === 0 ? (
          <div>No venues found.</div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
            <table className="min-w-full bg-white text-xs sm:text-sm">
              <thead>
                <tr className="bg-purple-600 text-white text-left uppercase">
                  <th className="p-2 sm:p-4">Image</th>
                  <th className="p-2 sm:p-4">Name</th>
                  <th className="p-2 sm:p-4 hidden md:table-cell">
                    Description
                  </th>
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
                        src={venue.media?.[0]?.url || "/placeholder.jpg"}
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
                      <div className="inline-flex justify-center gap-1 sm:gap-2">
                        <button
                          onClick={() => openEditModal(venue.id)}
                          className="px-3 sm:px-4 py-1 sm:py-2 rounded bg-blue-600 text-white text-xs sm:text-sm hover:bg-blue-700 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(venue.id)}
                          className="px-3 sm:px-4 py-1 sm:py-2 rounded bg-red-600 text-white text-xs sm:text-sm hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 sm:gap-4 mt-6 text-sm sm:text-base">
          <button
            onClick={goToPrevPage}
            disabled={params?.page === 1}
            className="px-3 sm:px-4 py-1 sm:py-2 bg-purple-600 hover:bg-purple-900 text-white rounded disabled:bg-gray-300"
          >
            Prev
          </button>
          <span>
            Page {params?.page}
            {totalPages ? ` of ${totalPages}` : ""}
          </span>
          <button
            onClick={goToNextPage}
            disabled={totalPages ? params?.page >= totalPages : false}
            className="px-3 sm:px-4 py-1 sm:py-2 bg-purple-600 hover:bg-purple-900 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}
