import { useEffect, useState, useCallback } from "react";
import { venuesApi } from "../config/services/venuesApi";

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
