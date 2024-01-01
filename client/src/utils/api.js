import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = (axios.defaults.baseURL = `${import.meta.env.VITE_SERVER_BASE_URL}/api`);

export const getAllProperties = async () => {
  try {
    const res = await axios.get("/residency/allResidencies", {
      timeout: 10 * 1000,
    });

    if (res.status === 400 || res.status === 500) {
      throw res.data;
    }

    return res.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};
export const getProperty = async (rid) => {
  try {
    const res = await axios.get(`/residency/${rid}`, {
      timeout: 10 * 1000,
    });

    if (res.status === 400 || res.status === 500) {
      throw res.data;
    }

    return res.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};
export const registerUser = async (email, token) => {
  try {
    const res = await axios.post(
      `/user/register`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    if (error.response.status !== 400)
      toast.error("Something went wrong! Please try again later.");

    throw error;
  }
};

export const bookVisit = async (date, propertyId, email, token) => {
  try {
    await axios.post(
      `/user/bookVisit/${propertyId}`,
      {
        email,
        id: propertyId,
        date: dayjs(date).format("DD/MM/YYYY"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};
export const cancelBookedVisit = async (id, email, token) => {
  try {
    await axios.post(
      `/user/cancelBookedVisit/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};
export const toFavourit = async (id, email, token) => {
  try {
    await axios.post(
      `/user/toFavourit/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};
export const getAllFavourites = async (email, token) => {
  try {
    if (!token) return;

    const data = await axios.post(
      `/user/allFavourit`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.data.favouritResidencies;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};
export const getAllBookings = async (email, token) => {
  try {
    if (!token) return;

    const data = await axios.post(
      `/user/allBookedVisit`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.data.bookings;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};
export const createResidency = async (residencyData, token) => {
  try {
    if (!token) return;

    const data = await axios.post(
      `/residency/create`,
      {
        data: residencyData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
