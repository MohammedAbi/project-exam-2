// import { useEffect, useState } from "react";
// import { fetchBookings } from "../config/services/bookingsApi";

// export function useBookings(accessToken) {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function loadBookings() {
//       try {
//         const data = await fetchBookings(accessToken);
//         setBookings(data.data);
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (accessToken) {
//       loadBookings();
//     }
//   }, [accessToken]);

//   return { bookings, loading };
// }
import { useEffect, useState } from "react";
import { fetchBookings } from "../config/services/bookingsApi";

export function useBookings(accessToken) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBookings() {
      try {
        const data = await fetchBookings(accessToken);
        setBookings(data); // setBookings with the actual array, no extra .data
      } finally {
        setLoading(false);
      }
    }

    if (accessToken) {
      loadBookings();
    } else {
      setLoading(false);
      setBookings([]);
    }
  }, [accessToken]);

  return { bookings, loading };
}
