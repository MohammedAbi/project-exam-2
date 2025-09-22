// // services/bookingsApi.js
// import { BOOKINGS_ENDPOINTS } from "../apiConfig";
// import { getHeaders } from "../apiHeaders";

// export const bookingsApi = {
//   async createBooking(bookingData, accessToken) {
//     const response = await fetch(BOOKINGS_ENDPOINTS.CREATE, {
//       method: "POST",
//       headers: getHeaders(accessToken),
//       body: JSON.stringify(bookingData),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to create booking");
//     }

//     const json = await response.json();
//     return json.data;
//   },
// };
import { BOOKINGS_ENDPOINTS } from "../apiConfig";
import { getHeaders } from "../apiHeaders";

export const bookingsApi = {
  async createBooking(bookingData, accessToken) {
    const response = await fetch(BOOKINGS_ENDPOINTS.BASE, { 
      method: "POST",
      headers: getHeaders(accessToken),
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      throw new Error("Failed to create booking");
    }

    const json = await response.json();
    return json.data;
  },
};
