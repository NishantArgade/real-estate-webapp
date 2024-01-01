import { toast } from "react-toastify";

export const sliderSettings = {
  slidesPerView: 1,
  spaceBetween: 50,
  breakpoints: {
    480: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2,
    },
    750: {
      slidesPerView: 3,
    },
    1100: {
      slidesPerView: 4,
    },
  },
};

export const updateFavourites = (id, favourites) => {
  if (favourites?.includes(id)) {
    toast.success("Removed from favourites", { position: "bottom-right" });
    return favourites?.filter((fav) => fav !== id);
  } else {
    toast.success("Added to favourites", { position: "bottom-right" });
    favourites?.push(id);
    return favourites;
  }
};

export const checkFavourit = (id, favourites) => {
  return favourites?.includes(id) ? "#fa3ef5" : "white";
};

export const validateString = (value) => {
  return value.length < 3 || value === null
    ? "field cannot be less than three characters long"
    : null;
};
