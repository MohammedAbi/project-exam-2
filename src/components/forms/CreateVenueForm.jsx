import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { venuesApi } from "../../config/services/venuesApi";

export default function CreateVenueForm({
  onClose,
  refreshVenues,
  accessToken,
  venueId,
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    maxGuests: "",
    rating: 0,
    media: [{ url: "", alt: "" }],
    location: { city: "", country: "" },
  });
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    const fetchVenue = async () => {
      if (!venueId) return;
      setLoading(true);
      try {
        const response = await venuesApi.getVenueById(venueId, accessToken);
        const venue = response.data;
        setFormData({
          name: venue.name || "",
          description: venue.description || "",
          price: venue.price || "",
          maxGuests: venue.maxGuests || "",
          rating: venue.rating || 0,
          media: venue.media?.length ? venue.media : [{ url: "", alt: "" }],
          location: venue.location || { city: "", country: "" },
        });
      } catch (err) {
        console.error("Error fetching venue:", err);
        toast.error("Failed to load venue data");
      } finally {
        setLoading(false);
      }
    };
    fetchVenue();
  }, [venueId, accessToken]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => {
      const updated = { ...prev };
      const keys = name.replace(/\]/g, "").split(/\.|\[/);
      let obj = updated;

      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          obj[key] =
            type === "number" ? (value === "" ? "" : Number(value)) : value;
        } else {
          obj[key] = Array.isArray(obj[key]) ? [...obj[key]] : { ...obj[key] };
          obj = obj[key];
        }
      });

      return updated;
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (venueId) {
        await venuesApi.updateVenue(venueId, formData, accessToken);
        toast.success("Venue updated successfully!");
      } else {
        await venuesApi.createVenue(formData, accessToken);
        toast.success("Venue created successfully!");
      }
      refreshVenues();
      onClose();
    } catch (err) {
      toast.error(
        `Failed to ${venueId ? "update" : "create"} venue: ${err.message || err}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg w-full max-w-lg sm:max-w-xl md:max-w-2xl 
               max-h-[75vh] overflow-y-auto p-4 sm:p-6 md:p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-6 text-gray-500 hover:text-gray-800 font-bold text-3xl"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">
          {venueId ? "Edit Venue" : "Create New Venue"}
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Basic Info */}
          <label
            htmlFor="venue-name"
            className="block text-sm font-medium text-gray-700"
          >
            Venue Name
          </label>
          <input
            type="text"
            id="venue-name"
            name="name"
            placeholder="Venue Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />

          <label
            htmlFor="venue-description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="venue-description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 resize-y"
            required
          />

          <label
            htmlFor="venue-price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="venue-price"
            name="price"
            min={0}
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />

          <label
            htmlFor="maxGuests"
            className="block text-sm font-medium text-gray-700"
          >
            Max Guests
          </label>
          <input
            type="number"
            id="maxGuests"
            name="maxGuests"
            placeholder="Max Guests"
            min={1}
            value={formData.maxGuests}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />

          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700"
          >
            Rating
          </label>
          <input
            type="number"
            name="rating"
            id="rating"
            placeholder="Rating"
            step="0.1"
            min="0"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />

          {/* Media Group */}
          <fieldset className="border border-gray-300 rounded p-4">
            <legend className="text-sm font-medium text-gray-700 px-1">
              Media
            </legend>
            <label
              htmlFor="media-url"
              className="block text-sm font-medium text-gray-700"
            >
              Image URL
            </label>
            <input
              type="text"
              id="media-url"
              name="media[0].url"
              placeholder="Image URL"
              value={formData.media[0].url}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
            />

            <label
              htmlFor="media-alt"
              className="block text-sm font-medium text-gray-700"
            >
              Media Alt Text
            </label>
            <input
              type="text"
              name="media[0].alt"
              id="media-alt"
              placeholder="Image Alt Text"
              value={formData.media[0].alt}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </fieldset>

          {/* Location Group */}
          <fieldset className="border border-gray-300 rounded p-4">
            <legend className="text-sm font-medium text-gray-700 px-1">
              Location
            </legend>
            <label
              htmlFor="location-city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              name="location.city"
              id="location-city"
              placeholder="City"
              value={formData.location.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
            />

            <label
              htmlFor="location-country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <input
              type="text"
              name="location.country"
              id="location-country"
              placeholder="Country"
              value={formData.location.country}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </fieldset>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 w-full text-white px-6 py-6 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading
              ? venueId
                ? "Updating..."
                : "Creating..."
              : venueId
                ? "Update Venue"
                : "Create Venue"}
          </button>
        </form>
      </div>
    </div>
  );
}
