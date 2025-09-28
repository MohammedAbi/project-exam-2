import { API_BASE_URL, API_KEY } from "../apiConfig";

/**
 * @typedef {Object} ImageData
 * @property {string} url - The URL of the image.
 * @property {string} [alt] - Optional alt text for the image.
 */

/**
 * @typedef {Object} RegisterUserData
 * @property {string} name - Full name of the user.
 * @property {string} email - Email address of the user (stud.noroff.no required for registration).
 * @property {string} password - Password for the account.
 * @property {string} [bio] - Short bio for the user profile.
 * @property {ImageData} [avatarUrl] - Avatar image object with url and optional alt text.
 * @property {ImageData} [bannerUrl] - Banner image object with url and optional alt text.
 * @property {boolean} [venueManager=false] - Whether the user should be registered as a venue manager.
 */

/**
 * Registers a new user in the Holidaze system.
 *
 * @async
 * @param {RegisterUserData} userData - User registration data.
 * @throws {Error} Throws an error if registration fails (e.g., missing required fields, invalid email).
 * @returns {Promise<Object>} Resolves with the registered user data from the API.
 */
export async function registerUser(userData) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      bio: userData.bio,
      avatar: userData.avatarUrl?.url
        ? { url: userData.avatarUrl.url, alt: userData.avatarUrl.alt }
        : undefined,
      banner: userData.bannerUrl?.url
        ? { url: userData.bannerUrl.url, alt: userData.bannerUrl.alt }
        : undefined,

      venueManager: userData.venueManager,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors?.[0]?.message || "Registration failed");
  }

  return response.json();
}

/**
 * Logs in a user with their email and password.
 *
 * @async
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @throws {Error} Throws an error if login fails (e.g., invalid credentials).
 * @returns {Promise<Object>} Resolves with the user authentication data, including access token.
 */
export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors?.[0]?.message || "Login failed");
  }

  return response.json();
}
