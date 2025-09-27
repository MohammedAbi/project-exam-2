import React, { useState } from "react";
import {
  ValidateRegister,
  ValidateLogin,
  ValidateContact,
} from "../components/forms/formValidation/Validation";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = ValidateContact(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
      return;
    }

    // Clear errors and simulate form submit
    setErrors({});
    console.log("Contact Form Submitted:", formData);

    setSuccessMessage(
      "Thank you for contacting us! We'll get back to you soon."
    );
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
      <p className="text-gray-600 mb-6">
        Have questions or feedback? Reach out to us and we’ll get back to you as
        soon as possible.
      </p>

      {successMessage && (
        <div className="bg-green-100 text-green-700 p-3 mb-4 rounded text-center">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block mb-1 font-semibold">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${
              errors.name ? "border-red-500" : ""
            }`}
            placeholder="Your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-1 font-semibold">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block mb-1 font-semibold">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`w-full border p-2 rounded ${
              errors.message ? "border-red-500" : ""
            }`}
            placeholder="Your message..."
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-4 rounded hover:bg-purple-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
