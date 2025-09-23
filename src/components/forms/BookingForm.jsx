import React, { useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  parseISO,
  eachDayOfInterval,
  format,
  isWithinInterval,
} from "date-fns";
import { bookingsApi } from "../../config/services/bookingsApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

/**
 * BookingForm component allows users to select check-in/check-out dates,
 * specify number of guests, and submit a booking for a venue.
 *
 * @param {Object} props
 * @param {string|number} props.venueId - ID of the venue to book.
 * @param {string} props.accessToken - User access token for authentication.
 * @param {number} [props.maxGuests=1] - Maximum allowed guests for the venue.
 * @param {number} [props.defaultGuests=1] - Default number of guests in the form.
 * @param {Array<Object>} [props.existingBookings=[]] - Array of existing bookings to block dates.
 */

export default function BookingForm({
  venueId,
  accessToken,
  maxGuests = 1,
  defaultGuests = 1,
  existingBookings = [],
}) {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(defaultGuests);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const blockedDates = useMemo(() => {
    return existingBookings.flatMap((b) =>
      eachDayOfInterval({
        start: parseISO(b.dateFrom),
        end: parseISO(b.dateTo),
      })
    );
  }, [existingBookings]);

  const dayClassName = (date) => {
    const isBlocked = blockedDates.some(
      (d) => d.toDateString() === date.toDateString()
    );
    if (isBlocked) return "bg-gray-200 text-gray-800 cursor-not-allowed";
    if (
      checkIn &&
      checkOut &&
      isWithinInterval(date, { start: checkIn, end: checkOut })
    ) {
      return "bg-blue-200 text-blue-900";
    }
    return "bg-white text-gray-800";
  };

  const isRangeBlocked = (start, end) => {
    if (!start || !end) return false;
    return eachDayOfInterval({ start, end }).some((day) =>
      blockedDates.some(
        (blocked) => blocked.toDateString() === day.toDateString()
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkIn || !checkOut)
      return toast.error("Please select check-in and check-out dates.");
    if (isRangeBlocked(checkIn, checkOut))
      return toast.error("Selected dates overlap with existing bookings.");
    if (!guests || guests < 1 || guests > maxGuests)
      return toast.error(`Guests must be between 1 and ${maxGuests}.`);
    if (!venueId || !accessToken)
      return toast.error("Invalid venue or user not logged in.");

    const bookingData = {
      venueId,
      dateFrom: format(checkIn, "yyyy-MM-dd"),
      dateTo: format(checkOut, "yyyy-MM-dd"),
      guests: parseInt(guests, 10),
    };

    setLoading(true);
    try {
      await bookingsApi.createBooking(bookingData, accessToken);
      toast.success("Booking successful! Redirecting to Profile...");
      setCheckIn(null);
      setCheckOut(null);
      setGuests(defaultGuests);
      setTimeout(() => {
        navigate("/profile");
      }, 3000);
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.message || "Booking failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-full max-w-full bg-white/90 backdrop-blur-sm p-4 shadow-lg rounded-lg gap-4"
      noValidate
    >
      <DatePicker
        selected={checkIn}
        onChange={setCheckIn}
        selectsStart
        startDate={checkIn}
        endDate={checkOut}
        excludeDates={blockedDates}
        placeholderText="Check-in"
        className="w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
        dayClassName={dayClassName}
        wrapperClassName="w-full"
      />
      <DatePicker
        selected={checkOut}
        onChange={setCheckOut}
        selectsEnd
        startDate={checkIn}
        endDate={checkOut}
        minDate={checkIn}
        excludeDates={blockedDates}
        placeholderText="Check-out"
        className="w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
        dayClassName={dayClassName}
        wrapperClassName="w-full"
      />
      <input
        type="number"
        min={1}
        max={maxGuests}
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
        placeholder={`Guests (max ${maxGuests})`}
        className="w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition w-full md:w-auto mt-4 md:mt-0"
      >
        {loading ? "Booking..." : "Book Now"}
      </button>
    </form>
  );
}
