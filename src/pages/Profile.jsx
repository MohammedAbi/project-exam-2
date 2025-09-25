import React, { useEffect, useState } from "react";
import { profilesApi } from "../config/services/profilesApi";
import { getUserData, saveAuthData } from "../config/services/authStorage";
import { useAuth } from "../hooks/useAuth";
import ProfileEditModal from "../components/ProfileEditModal";
import ProfileBookings from "../components/profile/ProfileBookings";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import ProfileHeader from "../components/profile/ProfileHeader";

export default function Profile() {
  const currentUser = getUserData();
  const { auth, accessToken } = useAuth();
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
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

  const handleSaveProfile = async (updatedData) => {
    setSaving(true);
    try {
      const updatedProfile = await profilesApi.updateProfile(
        auth.name,
        updatedData,
        accessToken
      );
      setProfile(updatedProfile);
      saveAuthData({ ...currentUser, ...updatedProfile });
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };
  

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <LoadingSpinner />
      </div>
    );
  if (error) return <p>Error: {error}</p>;
  if (!profile) return <p>No profile data found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <ProfileHeader profile={profile} onEdit={() => setIsEditOpen(true)} />
      <ProfileEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initialData={profile}
        onSave={handleSaveProfile}
      />
      <ProfileBookings bookings={bookings} />
    </div>
  );
}
