import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { UserDetailContext } from "../App";
import { getAllBookings, getAllFavourites } from "../utils/api";

const useBookings = () => {
  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailContext);

  const { user } = useAuth0();
  const ref = useRef();

  const { data, isSuccess, isError, refetch } = useQuery({
    queryKey: ["allBookings"],
    queryFn: () => getAllBookings(user?.email, token),
    onSuccess: (data) => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: data,
      }));
    },
    enabled: user !== undefined,
    staleTime: 30000,
  });

  ref.current = refetch;

  useEffect(() => {
    ref.current && ref.current();
  }, [token]);

  return { data, isSuccess, isError };
};

export default useBookings;
