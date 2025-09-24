import { toast } from "react-toastify";
import { useState } from "react";
import { venuesApi } from "../config/services/venuesApi";
import { useVenues } from "../hooks/useVenues";
import { getAccessToken, getUserData } from "../config/services/authStorage";
import ConfirmModal from "../components/ConfirmModal";
import CreateVenueForm from "../components/forms/CreateVenueForm";
import UserHeader from "../components/admin/UserHeader";
import VenuesTable from "../components/admin/VenuesTable";
import PaginationControls from "../components/admin/PaginationControls";

export default function AdminDashboard() {
  const currentUser = getUserData();
  const accessToken = getAccessToken();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editVenueId, setEditVenueId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    venueId: null,
  });

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

  const openDeleteModal = (venueId) =>
    setConfirmDelete({ open: true, venueId });
  const closeDeleteModal = () =>
    setConfirmDelete({ open: false, venueId: null });

  const handleDeleteConfirmed = async () => {
    try {
      await venuesApi.deleteVenue(confirmDelete.venueId, accessToken);
      toast.success("Venue deleted successfully!");
      refetch();
    } catch (err) {
      toast.error(`Failed to delete venue: ${err.message || err}`);
    } finally {
      closeDeleteModal();
    }
  };

  const goToPrevPage = () =>
    setParams((prev) => ({ ...prev, page: Math.max(prev.page - 1, 1) }));

  const goToNextPage = () =>
    setParams((prev) => ({
      ...prev,
      page: totalPages ? Math.min(prev.page + 1, totalPages) : prev.page + 1,
    }));

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

      <ConfirmModal
        isOpen={confirmDelete.open}
        title="Delete Venue"
        message="Are you sure you want to delete this venue?"
        onConfirm={handleDeleteConfirmed}
        onCancel={closeDeleteModal}
      />

      <UserHeader user={currentUser} />

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

        <VenuesTable
          venues={venues}
          loading={loading}
          error={error}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
        />

        <PaginationControls
          page={params.page}
          totalPages={totalPages}
          onPrev={goToPrevPage}
          onNext={goToNextPage}
        />
      </section>
    </div>
  );
}
