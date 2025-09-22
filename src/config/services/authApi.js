import { API_BASE_URL, API_KEY } from "../apiConfig";

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
      avatar: userData.avatarUrl
        ? { url: userData.avatarUrl, alt: userData.avatarAlt }
        : undefined,
      banner: userData.bannerUrl
        ? { url: userData.bannerUrl, alt: userData.bannerAlt }
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
