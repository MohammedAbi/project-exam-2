export const API_BASE_URL = "https://v2.api.noroff.dev";

// Bookings endpoints
export const BOOKINGS_ENDPOINTS = {
  BASE: `${API_BASE_URL}/holidaze/bookings`,
  SINGLE: (id) => `${API_BASE_URL}/holidaze/bookings/${id}`,
};

// Venues endpoints
export const VENUES_ENDPOINTS = {
  BASE: `${API_BASE_URL}/holidaze/venues`,
  SINGLE: (id) => `${API_BASE_URL}/holidaze/venues/${id}`,
};

// Profiles endpoints
export const PROFILES_ENDPOINTS = {
  BASE: `${API_BASE_URL}/holidaze/profiles`,
  SINGLE: (name) =>
    `${API_BASE_URL}/holidaze/profiles/${encodeURIComponent(name)}`,
  BOOKINGS: (name) =>
    `${API_BASE_URL}/holidaze/profiles/${encodeURIComponent(name)}/bookings`,
  // VENUES: (name) => `${API_BASE_URL}/holidaze/profiles/${encodeURIComponent(name)}/venues`,
  VENUES: (profileName) =>
    `${API_BASE_URL}/holidaze/profiles/${encodeURIComponent(profileName)}/venues`,
  SEARCH: (query) =>
    `${API_BASE_URL}/holidaze/profiles/search?q=${encodeURIComponent(query)}`,
};

export const API_KEY = "86390b60-fb20-4dfc-9869-751c01b0d7aa";
