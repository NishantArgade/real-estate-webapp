import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { UserDetailContext } from "../App";
import { getAllFavourites } from "../utils/api";

const useFavourites = () => {
  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailContext);

  const { user } = useAuth0();
  const ref = useRef();

  const { data, isSuccess, isError, refetch } = useQuery({
    queryKey: ["allFavourites"],
    queryFn: () => getAllFavourites(user?.email, token),
    onSuccess: (data) => {
      setUserDetails((prev) => ({
        ...prev,
        favourites: data,
      }));
    },
    enabled: user !== undefined,
    staleTime: 30000,
  });

  ref.current = refetch;

  useEffect(() => {
    user?.email && ref.current && ref.current();
  }, [token, user]);

  return { data, isSuccess, isError };
};

export default useFavourites;
