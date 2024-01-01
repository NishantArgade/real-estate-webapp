import React from "react";
import { useQuery } from "react-query";
import { getProperty } from "../utils/api";

const useProperty = (id) => {
  const { data, isLoading, isError, refetch } = useQuery(
    ["property", id],
    () => getProperty(id),
    {
      refetchOnWindowFocus: false,
    }
  );

  return { data, isLoading, isError, refetch };
};

export default useProperty;
