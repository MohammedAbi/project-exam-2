// import React, { useState } from "react";
// import { validateRegister } from "./formValidation/validation";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
// import { toast } from "react-toastify";

// export default function RegisterForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     bio: "",
//     avatarUrl: "",
//     avatarAlt: "",
//     bannerUrl: "",
//     bannerAlt: "",
//     venueManager: false,
//   });

//   const [errors, setErrors] = useState({});

//   const { register, loading, error } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate first
//     const validationErrors = validateRegister({
//       name: formData.name,
//       email: formData.email,
//       password: formData.password,
//     });

//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length > 0) {
//       // Show all validation errors as toasts
//       Object.values(validationErrors).forEach((errorMsg) => {
//         toast.error(errorMsg);
//       });
//       return;
//     }

//     try {
//       await register(formData);
//       toast.success("Registration successful! Redirecting to login...");
//       setTimeout(() => navigate("/login"), 3000);
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   return (
//     <form className="space-y-4" onSubmit={handleSubmit}>
//       {/* Name input */}
//       <div>
//         <label htmlFor="name" className="block mb-1 font-semibold">
//           Name *
//         </label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           placeholder="Firstname Lastname"
//           required
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//       </div>

//       {/* Email input */}
//       <div>
//         <label htmlFor="email" className="block mb-1 font-semibold">
//           Email *
//         </label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           placeholder="first.last@stud.noroff.no"
//           required
//           value={formData.email}
//           onChange={handleChange}
//           className={`w-full border p-2 rounded ${
//             errors.email ? "border-red-500" : ""
//           }`}
//         />
//         {errors.email && (
//           <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//         )}
//         {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//       </div>

//       {/* Password input */}
//       <div>
//         <label htmlFor="password" className="block mb-1 font-semibold">
//           Password *
//         </label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           required
//           value={formData.password}
//           onChange={handleChange}
//           className={`w-full border p-2 rounded ${
//             errors.password ? "border-red-500" : ""
//           }`}
//         />
//         {errors.password && (
//           <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//         )}
//         {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//       </div>

//       {/* Bio input */}
//       <div>
//         <label htmlFor="bio" className="block mb-1 font-semibold">
//           Bio
//         </label>
//         <textarea
//           id="bio"
//           name="bio"
//           value={formData.bio}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           rows={3}
//           placeholder="Tell us about yourself"
//         />
//       </div>

//       {/* Avatar fields */}
//       <fieldset className="border p-3 rounded">
//         <legend className="font-semibold mb-2">Avatar (optional)</legend>
//         <div>
//           <label htmlFor="avatarUrl" className="block mb-1">
//             URL
//           </label>
//           <input
//             type="url"
//             id="avatarUrl"
//             name="avatarUrl"
//             value={formData.avatarUrl}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             placeholder="https://example.com/avatar.jpg"
//           />
//         </div>
//         <div>
//           <label htmlFor="avatarAlt" className="block mb-1">
//             Alt text
//           </label>
//           <input
//             type="text"
//             id="avatarAlt"
//             name="avatarAlt"
//             value={formData.avatarAlt}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             placeholder="My avatar"
//           />
//         </div>
//       </fieldset>

//       {/* Banner fields */}
//       <fieldset className="border p-3 rounded">
//         <legend className="font-semibold mb-2">Banner (optional)</legend>
//         <div>
//           <label htmlFor="bannerUrl" className="block mb-1">
//             URL
//           </label>
//           <input
//             type="url"
//             id="bannerUrl"
//             name="bannerUrl"
//             value={formData.bannerUrl}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             placeholder="https://example.com/banner.jpg"
//           />
//         </div>
//         <div>
//           <label htmlFor="bannerAlt" className="block mb-1">
//             Alt text
//           </label>
//           <input
//             type="text"
//             id="bannerAlt"
//             name="bannerAlt"
//             value={formData.bannerAlt}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             placeholder="My banner"
//           />
//         </div>
//       </fieldset>

//       {/* Venue Manager checkbox */}
//       <div className="flex items-center gap-2">
//         <input
//           type="checkbox"
//           id="venueManager"
//           name="venueManager"
//           checked={formData.venueManager}
//           onChange={handleChange}
//           className="w-4 h-4"
//         />
//         <label htmlFor="venueManager" className="select-none">
//           Register as Venue Manager
//         </label>
//       </div>

//       {/* Submit button */}
//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition disabled:opacity-50"
//       >
//         {loading ? "Registering..." : "Register"}
//       </button>
//     </form>
//   );
// }
import React, { useState } from "react";
import { validateRegister } from "./formValidation/validation";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
    avatarUrl: "",
    avatarAlt: "",
    bannerUrl: "",
    bannerAlt: "",
    venueManager: false,
  });

  const [errors, setErrors] = useState({});
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    const validationErrors = validateRegister(formData);
    // Add confirmPassword validation
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      await register(formData);
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-semibold">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Firstname Lastname"
            value={formData.name}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-semibold">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="first.last@stud.noroff.no"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Password & Confirm Password */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="password" className="block mb-1 font-semibold">
            Password *
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block mb-1 font-semibold">
            Confirm Password *
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      {/* Bio */}
      <div>
        <label htmlFor="bio" className="block mb-1 font-semibold">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={3}
          value={formData.bio}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Tell us about yourself"
        />
      </div>

      {/* Avatar & Banner optional side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <fieldset className="border p-3 rounded">
          <legend className="font-semibold mb-2">Avatar (optional)</legend>
          <input
            type="url"
            name="avatarUrl"
            placeholder="Avatar URL"
            value={formData.avatarUrl}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="text"
            name="avatarAlt"
            placeholder="Alt text"
            value={formData.avatarAlt}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </fieldset>

        <fieldset className="border p-3 rounded">
          <legend className="font-semibold mb-2">Banner (optional)</legend>
          <input
            type="url"
            name="bannerUrl"
            placeholder="Banner URL"
            value={formData.bannerUrl}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="text"
            name="bannerAlt"
            placeholder="Alt text"
            value={formData.bannerAlt}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </fieldset>
      </div>

      {/* Venue Manager */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="venueManager"
          name="venueManager"
          checked={formData.venueManager}
          onChange={handleChange}
          className="w-4 h-4"
        />
        <label htmlFor="venueManager" className="select-none">
          Register as Venue Manager
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition disabled:opacity-50"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
