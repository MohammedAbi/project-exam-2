import React, { useEffect, useState } from "react";
import { BsPeople } from "react-icons/bs";
import { profilesApi } from "../config/services/profilesApi";

import { getUserData, saveAuthData } from "../config/services/authStorage";
import ProfileEditModal from "../components/ProfileEditModal";
import { useAuth } from "../hooks/useAuth";

export default function Profile() {
  const currentUser = getUserData();
  const { auth, accessToken } = useAuth();
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    if (!auth || !auth.name || !accessToken) {
      setLoading(false);
      return;
    }

    async function fetchProfileData() {
      try {
        const [profileData, bookingsData] = await Promise.all([
          profilesApi.getProfile(auth.name, accessToken),
          profilesApi.getBookings(auth.name, accessToken),
        ]);
        setProfile(profileData);
        setBookings(bookingsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProfileData();
  }, [auth, accessToken]);

  // 🔑 Save handler
  const handleSaveProfile = async (updatedData) => {
    try {
      const updatedProfile = await profilesApi.updateProfile(
        auth.name,
        updatedData,
        accessToken
      );
      setProfile(updatedProfile);

      // Also update localStorage so UI stays consistent
      saveAuthData({ ...currentUser, ...updatedProfile });
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Failed to save changes. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!profile) return <p>No profile data found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header
        className="mb-12 text-white text-center p-12 relative overflow-hidden"
        style={{
          backgroundImage: `url(${profile.banner?.url || "/default-banner.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "inset 0 0 0 2000px rgba(0,0,0,0.5)",
        }}
      >
        <img
          src={profile.avatar?.url || "/default-avatar.png"}
          alt={profile.avatar?.alt || profile.name || "User avatar"}
          className="mx-auto rounded-full border-4 border-white w-32 h-32 object-cover mb-4 shadow-lg"
        />
        <h1 className="text-4xl font-extrabold drop-shadow-lg">
          {profile.name}
        </h1>
        <p className="mt-3 max-w-xl mx-auto text-lg font-light drop-shadow-sm">
          {profile.bio}
        </p>
        <p className="mt-1 text-sm opacity-80 drop-shadow-sm">
          {profile.email}
        </p>
        <div className="w-full flex md:justify-start justify-center items-center">
          <button
            onClick={() => setIsEditOpen(true)}
            className="py-2 px-4 rounded bg-green-700 hover:bg-green-900 mt-6"
          >
            Edit profile
          </button>
        </div>
      </header>

      {/* Edit Modal */}
      <ProfileEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initialData={profile}
        onSave={handleSaveProfile}
      />

      {/* Bookings */}
      <section className="mt-8 px-4">
        <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                    Booking ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                    Venue Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase flex items-center gap-1">
                    Guests <BsPeople className="inline-block text-lg" />
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                    Dates
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.map((booking) => {
                  const venue = booking.venue || {};
                  return (
                    <tr
                      key={booking.id}
                      className="hover:bg-purple-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm">
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-mono">
                          {booking.id.slice(0, 8) + "…"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-purple-700">
                        {venue.name || "Unknown Venue"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 flex items-center gap-1">
                        {booking.guests}
                        <BsPeople className="inline-block text-purple-600" />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {new Date(booking.dateFrom).toLocaleDateString()} –{" "}
                        {new Date(booking.dateTo).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
