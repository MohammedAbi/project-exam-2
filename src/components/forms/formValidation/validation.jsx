// import { toast } from "react-toastify";

// // Validate registration form
// export function validateRegister({ name, email, password }) {
//   const errors = {};

//   if (!name.trim()) errors.name = "Name is required";
//   if (!email.trim()) errors.email = "Email is required";
//   else if (!/^[\w.+-]+@stud\.noroff\.no$/.test(email)) {
//     errors.email = "Email must be a valid @stud.noroff.no address";
//   }
//   if (!password) errors.password = "Password is required";
//   else if (password.length < 8) {
//     errors.password = "Password must be at least 8 characters long";
//   }

//   return errors;
// }

// // Validate login form
// export function validateLogin({ email, password }) {
//   if (!email.trim() || !password.trim()) {
//     toast.error("Please fill in both email and password");
//     return false;
//   }

//   const emailRegex = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
//   if (!emailRegex.test(email)) {
//     toast.error("Email must be a valid @stud.noroff.no address");
//     return false;
//   }

//   if (password.length < 8) {
//     toast.error("Password must be at least 8 characters");
//     return false;
//   }

//   return true;
// }

// // Validate contact form
// export function validateContact({ name, email, message }) {
//   if (!name.trim()) {
//     toast.error("Name is required");
//     return false;
//   }

//   const emailRegex = /^[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}$/;
//   if (!emailRegex.test(email)) {
//     toast.error("Please enter a valid email address");
//     return false;
//   }

//   if (!message.trim()) {
//     toast.error("Message is required");
//     return false;
//   }

//   return true;
// }
import { toast } from "react-toastify";

/**
 * Validate registration form fields.
 *
 * @param {Object} params - Registration form data
 * @param {string} params.name - Full name of the user
 * @param {string} params.email - User email address
 * @param {string} params.password - User password
 * @returns {Object} errors - Object containing validation error messages keyed by field name
 */
export function validateRegister({ name, email, password }) {
  const errors = {};

  if (!name.trim()) errors.name = "Name is required";
  if (!email.trim()) errors.email = "Email is required";
  else if (!/^[\w.+-]+@stud\.noroff\.no$/.test(email)) {
    errors.email = "Email must be a valid @stud.noroff.no address";
  }
  if (!password) errors.password = "Password is required";
  else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }

  return errors;
}

/**
 * Validate login form fields and show toast errors on failure.
 *
 * @param {Object} params - Login form data
 * @param {string} params.email - User email address
 * @param {string} params.password - User password
 * @returns {boolean} True if validation passes, false otherwise
 */
export function validateLogin({ email, password }) {
  if (!email.trim() || !password.trim()) {
    toast.error("Please fill in both email and password");
    return false;
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
  if (!emailRegex.test(email)) {
    toast.error("Email must be a valid @stud.noroff.no address");
    return false;
  }

  if (password.length < 8) {
    toast.error("Password must be at least 8 characters");
    return false;
  }

  return true;
}

/**
 * Validate contact form fields and show toast errors on failure.
 *
 * @param {Object} params - Contact form data
 * @param {string} params.name - Name of the sender
 * @param {string} params.email - Email address of the sender
 * @param {string} params.message - Message content
 * @returns {boolean} True if validation passes, false otherwise
 */
export function validateContact({ name, email, message }) {
  if (!name.trim()) {
    toast.error("Name is required");
    return false;
  }

  const emailRegex = /^[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address");
    return false;
  }

  if (!message.trim()) {
    toast.error("Message is required");
    return false;
  }

  return true;
}
