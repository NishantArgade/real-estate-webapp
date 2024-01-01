import React, { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Layout from "./Layout";
import Bookings from "./pages/Bookings";
import Favourites from "./pages/Favourites";
import Properties from "./pages/Properties";
import Property from "./pages/Property";
import Root from "./pages/Root";

export const UserDetailContext = createContext();

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Root />} />
        <Route path="/properties">
          <Route index element={<Properties />} />
          <Route path=":propertyId" element={<Property />} />
        </Route>
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="*" element={<div>Page Not Found ! Go Back</div>} />
      </Route>
    )
  );

  const queryClient = new QueryClient();

  const [userDetails, setUserDetails] = useState({
    favourites: [],
    bookings: [],
    token: null,
  });

  return (
    <>
      <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools />
          <ToastContainer />
        </QueryClientProvider>
      </UserDetailContext.Provider>
    </>
  );
};

export default App;
