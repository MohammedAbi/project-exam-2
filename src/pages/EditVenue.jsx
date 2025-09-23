// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";

// import { venues as importedVenues } from "../data/venues";

// export default function EditVenue() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const venueData = importedVenues.find((v) => v.data.id === id)?.data;

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: 0,
//     maxGuests: 1,
//     city: "",
//     imageUrl: "",
//   });

//   useEffect(() => {
//     if (venueData) {
//       setForm({
//         name: venueData.name || "",
//         description: venueData.description || "",
//         price: venueData.price || 0,
//         maxGuests: venueData.maxGuests || 1,
//         city: venueData.location.city || "",
//         imageUrl: venueData.media?.[0]?.url || "",
//       });
//     }
//   }, [venueData]);

//   if (!venueData) {
//     return (
//       <div className="max-w-3xl mx-auto p-8">
//         <p className="text-red-600 text-center text-lg font-semibold">
//           Venue not found.
//         </p>
//         <div className="text-center mt-6">
//           <Link to="/admin" className="text-blue-600 underline">
//             Return to Admin Dashboard
//           </Link>
//         </div>
//       </div>
//     );
//   }


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: name === "price" || name === "maxGuests" ? Number(value) : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const updatedVenue = {
//       ...venueData,
//       name: form.name,
//       description: form.description,
//       price: form.price,
//       maxGuests: form.maxGuests,
//       location: {
//         ...venueData.location,
//         city: form.city,
//       },
//       media: [{ url: form.imageUrl, alt: form.name }],
//     };

//     console.log("Updated venue data:", updatedVenue);

//     // Navigate back to admin dashboard after "saving"
//     navigate("/admin");
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-8">
//       <h1 className="text-3xl font-bold mb-6">Edit Venue</h1>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label htmlFor="name" className="block font-semibold mb-1">
//             Name
//           </label>
//           <input
//             id="name"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             type="text"
//             required
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>

//         <div>
//           <label htmlFor="description" className="block font-semibold mb-1">
//             Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             rows={4}
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>

//         <div>
//           <label htmlFor="price" className="block font-semibold mb-1">
//             Price per Night ($)
//           </label>
//           <input
//             id="price"
//             name="price"
//             value={form.price}
//             onChange={handleChange}
//             type="number"
//             min={0}
//             required
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>

//         <div>
//           <label htmlFor="maxGuests" className="block font-semibold mb-1">
//             Max Guests
//           </label>
//           <input
//             id="maxGuests"
//             name="maxGuests"
//             value={form.maxGuests}
//             onChange={handleChange}
//             type="number"
//             min={1}
//             required
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>

//         <div>
//           <label htmlFor="city" className="block font-semibold mb-1">
//             City
//           </label>
//           <input
//             id="city"
//             name="city"
//             value={form.city}
//             onChange={handleChange}
//             type="text"
//             required
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>

//         {/* NEW FIELD for image URL */}
//         <div>
//           <label htmlFor="imageUrl" className="block font-semibold mb-1">
//             Image URL
//           </label>
//           <input
//             id="imageUrl"
//             name="imageUrl"
//             value={form.imageUrl}
//             onChange={handleChange}
//             type="url"
//             required
//             placeholder="https://example.com/image.jpg"
//             className="w-full border rounded px-3 py-2"
//           />
//           {/* Optionally show a live preview */}
//           {form.imageUrl && (
//             <img
//               src={form.imageUrl}
//               alt="Preview"
//               className="mt-2 max-h-48 object-contain"
//             />
//           )}
//         </div>

//         <div className="flex gap-4">
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//           >
//             Save Changes
//           </button>
//           <Link
//             to="/admin"
//             className="px-6 py-2 rounded border border-gray-400 hover:bg-gray-100 transition"
//           >
//             Cancel
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// }
