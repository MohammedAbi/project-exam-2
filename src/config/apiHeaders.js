import { API_KEY } from "./apiConfig";

export function getHeaders(accessToken) {
  return {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    "X-Noroff-API-Key": API_KEY,
    "Content-Type": "application/json",
  };
}
