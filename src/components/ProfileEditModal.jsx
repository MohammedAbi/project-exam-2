import React, { useEffect, useState } from "react";

export default function ProfileEditModal({
  isOpen,
  onClose,
  initialData,
  onSave,
}) {
  const [formData, setFormData] = useState(
    initialData || {
      bio: "",
      avatar: { url: "", alt: "" },
      banner: { url: "", alt: "" },
      venueManager: false,
    }
  );

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const setAvatarField = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      avatar: { ...prev.avatar, [key]: value },
    }));
  };

  const setBannerField = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      banner: { ...prev.banner, [key]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl overflow-y-auto max-h-[90vh] relative">
        {/* Close button inside modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg"
          aria-label="Close modal"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block font-medium mb-1">
              Bio (max 160 characters)
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              maxLength={160}
              placeholder="Tell us something about yourself..."
              className="w-full border border-gray-200 p-2 rounded h-20"
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.bio.length}/160 characters
            </p>
          </div>

          {/* Avatar Section */}
          <fieldset className="border border-gray-200 p-4 rounded mb-4">
            <legend className="font-semibold px-2">Avatar</legend>
            <div className="mb-2">
              <label htmlFor="avatar-url" className="block font-medium mb-1">
                Avatar URL
              </label>
              <input
                id="avatar-url"
                type="url"
                value={formData.avatar.url}
                onChange={(e) => setAvatarField("url", e.target.value)}
                placeholder="Avatar URL"
                className="w-full border border-gray-200 p-2 rounded h-12"
                required
              />
            </div>
            <div>
              <label htmlFor="avatar-alt" className="block font-medium mb-1">
                Avatar Alt Text
              </label>
              <input
                id="avatar-alt"
                value={formData.avatar.alt}
                onChange={(e) => setAvatarField("alt", e.target.value)}
                placeholder="Avatar Alt Text"
                className="w-full border border-gray-200 p-2 rounded h-12"
              />
            </div>
          </fieldset>

          {/* Banner Section */}
          <fieldset className="border border-gray-200 p-4 rounded mb-4">
            <legend className="font-semibold px-2">Banner</legend>
            <div className="mb-2">
              <label htmlFor="banner-url" className="block font-medium mb-1">
                Banner URL
              </label>
              <input
                id="banner-url"
                type="url"
                value={formData.banner.url}
                onChange={(e) => setBannerField("url", e.target.value)}
                placeholder="Banner URL"
                className="w-full border border-gray-200 p-2 rounded h-12"
                required
              />
            </div>
            <div>
              <label htmlFor="banner-alt" className="block font-medium mb-1">
                Banner Alt Text
              </label>
              <input
                id="banner-alt"
                value={formData.banner.alt}
                onChange={(e) => setBannerField("alt", e.target.value)}
                placeholder="Banner Alt Text"
                className="w-full border border-gray-200 p-2 rounded h-12"
              />
            </div>
          </fieldset>

          {/* Venue Manager */}
          <div>
            <label htmlFor="venueManager" className="flex items-center gap-2">
              <input
                id="venueManager"
                type="checkbox"
                name="venueManager"
                checked={formData.venueManager}
                onChange={handleChange}
              />
              Venue Manager
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
