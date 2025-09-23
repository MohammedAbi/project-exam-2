import { useEffect, useState, useCallback } from "react";
import { venuesApi } from "../config/services/venuesApi";

/**
 * Custom hook to fetch venues with pagination, sorting, and optional owner filter.
 *
 * @param {Object} initialParams - Initial query parameters.
 * @param {number} [initialParams.limit=10] - Items per page.
 * @param {number} [initialParams.page=1] - Current page.
 * @param {string|null} [initialParams.owner=null] - Filter by owner ID.
 * @param {string} [initialParams.sort="name"] - Sort field.
 * @param {"asc"|"desc"} [initialParams.sortOrder="asc"] - Sort order.
 * @param {string|null} [accessToken=null] - Optional authentication token.
 *
 * @returns {Object} Hook return values
 * @returns {Array} venues - Array of venue objects
 * @returns {boolean} loading - Loading state
 * @returns {string|null} error - Error message if fetching fails
 * @returns {number} totalPages - Total number of pages
 * @returns {number} currentPage - Current page number
 * @returns {Object} params - Current query parameters
 * @returns {Function} setParams - Function to update query parameters
 * @returns {Function} refetch - Function to manually refetch venues
 */
export function useVenues(
  initialParams = {
    limit: 10,
    page: 1,
    owner: null,
    sort: "name",
    sortOrder: "asc",
  },
  accessToken = null
) {
  const [params, setParams] = useState(initialParams);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchVenues = useCallback(async () => {
    try {
      setLoading(true);

      let response;
      if (params.owner) {
        response = await venuesApi.getVenuesByOwner(
          params.owner,
          params.limit,
          params.page,
          accessToken,
          params.sort,
          params.sortOrder
        );
      } else {
        response = await venuesApi.getAllVenues(
          params.limit,
          params.page,
          accessToken,
          params.sort,
          params.sortOrder
        );
      }

      const data = response.data || [];
      const pageCount = response.meta?.pageCount || 1;

      setVenues(data);
      setTotalPages(pageCount);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch venues");
    } finally {
      setLoading(false);
    }
  }, [params, accessToken]);

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  return {
    venues,
    loading,
    error,
    totalPages,
    currentPage: params.page,
    params,
    setParams,
    refetch: fetchVenues,
  };
}
