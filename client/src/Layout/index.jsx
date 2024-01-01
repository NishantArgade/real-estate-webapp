import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect } from "react";
import { useMutation } from "react-query";
import { Outlet } from "react-router-dom";
import { UserDetailContext } from "../App";
import useFavourites from "../Hooks/useFavourites";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { registerUser } from "../utils/api";
import useBookings from "../Hooks/useBookings";

const Layout = () => {
  const { setUserDetails } = useContext(UserDetailContext);
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => registerUser(user?.email, token),
  });

  useFavourites();
  useBookings();

  useEffect(() => {
    const getTokenAndRegister = async () => {
      try {
        const res = await getAccessTokenSilently();

        localStorage.setItem("access_token", res);
        setUserDetails((state) => ({ ...state, token: res }));
        mutate(res);
      } catch (error) {
        console.log("error ", error);
      }
    };
    isAuthenticated && getTokenAndRegister();
  }, [isAuthenticated]);

  return (
    <>
      <div style={{ background: "var(--black)" }}>
        <Header />
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
