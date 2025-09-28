import { useEffect, useState, useCallback } from "react";
import { venuesApi } from "../config/services/venuesApi";

/**
 * Custom hook to fetch venues with pagination, sorting, optional owner filter, and search.
 *
 * @param {Object} initialParams - Initial parameters for fetching venues.
 * @param {number} initialParams.limit - Number of venues per page (default 10).
 * @param {number} initialParams.page - Current page number (default 1).
 * @param {string|null} initialParams.owner - Optional owner ID to filter venues.
 * @param {string} initialParams.sort - Field to sort by (default "name").
 * @param {"asc"|"desc"} initialParams.sortOrder - Sort order (default "asc").
 * @param {string} initialParams.search - Search term (default empty string).
 * @param {string|null} accessToken - Optional access token for authenticated requests.
 *
 * @returns {Object} An object containing:
 *   @property {Array} venues - Array of venue objects.
 *   @property {boolean} loading - Loading state.
 *   @property {string|null} error - Error message if fetching fails.
 *   @property {number} totalPages - Total number of pages available.
 *   @property {number} currentPage - Current page number.
 *   @property {Object} params - Current parameters for the query.
 *   @property {Function} setParams - Function to update query parameters.
 *   @property {Function} refetch - Function to refetch venues manually.
 */
export function useVenues(
  initialParams = {
    limit: 10,
    page: 1,
    owner: null,
    sort: "name",
    sortOrder: "asc",
    search: "",
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
      let data = [];
      let pageCount = 1;

      if (params.search) {
        // Call the search endpoint if there is a search term
        data = await venuesApi.searchVenues(
          params.search,
          params.limit,
          params.page,
          accessToken
        );
        // Search API returns an array directly
      } else if (params.owner) {
        response = await venuesApi.getVenuesByOwner(
          params.owner,
          params.limit,
          params.page,
          accessToken,
          params.sort,
          params.sortOrder
        );
        data = response.data || [];
        pageCount = response.meta?.pageCount || 1;
      } else {
        response = await venuesApi.getAllVenues(
          params.limit,
          params.page,
          accessToken,
          params.sort,
          params.sortOrder
        );
        data = response.data || [];
        pageCount = response.meta?.pageCount || 1;
      }

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
