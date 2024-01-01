import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { UserDetailContext } from "../../App";
import useAuthCheck from "../../Hooks/useAuthCheck";
import { toFavourit } from "../../utils/api";
import { checkFavourit, updateFavourites } from "../../utils/common";

const Heart = ({ id }) => {
  const [heartColor, setHeartColor] = useState("white");
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  const {
    userDetails: { token, favourites },
    setUserDetails,
  } = useContext(UserDetailContext);

  const { mutate } = useMutation({
    mutationFn: () => toFavourit(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        favourites: updateFavourites(id, prev?.favourites),
      }));
    },
  });

  const handleLike = () => {
    validateLogin() &&
      (mutate(),
      setHeartColor((prev) => (prev === "white" ? "#fa3ef5" : "white")));
  };

  useEffect(() => {
    setHeartColor(() => checkFavourit(id, favourites));
  }, [favourites]);

  return (
    <AiFillHeart
      size={24}
      color={heartColor}
      onClick={(e) => {
        e.stopPropagation();
        handleLike();
      }}
    />
  );
};

export default Heart;
