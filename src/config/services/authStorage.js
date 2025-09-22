/**
 * Save user authentication data to localStorage.
 *
 * @param {Object} userData - The user data object to save
 */
export function saveAuthData(userData) {
  localStorage.setItem("auth", JSON.stringify(userData));
}

/**
 * Retrieve the access token from localStorage.
 *
 * @returns {string|null} The access token string if present, otherwise null
 */
export function getAccessToken() {
  const data = localStorage.getItem("auth");
  return data ? JSON.parse(data).accessToken : null;
}

/**
 * Check if a user is logged in based on the presence of an access token.
 *
 * @returns {boolean} True if logged in, false otherwise
 */
export function isLoggedIn() {
  return Boolean(getAccessToken());
}

/**
 * Clear the authentication data from localStorage.
 */
export function clearAuthData() {
  localStorage.removeItem("auth");
}

/**
 * Retrieve the full user data object from localStorage.
 *
 * @returns {Object|null} The parsed user data object if present, otherwise null
 */
export function getUserData() {
  const data = localStorage.getItem("auth");
  return data ? JSON.parse(data) : null;
}
