import React, { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import useProperty from "../../Hooks/useProperty";
import "./Property.css";

// import { Button } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mantine/core";
import { AiTwotoneCar } from "react-icons/ai";
import { FaShower } from "react-icons/fa";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { UserDetailContext } from "../../App";
import useAuthCheck from "../../Hooks/useAuthCheck";
import BookingModal from "../../components/BookingModal";
import Heart from "../../components/Heart";
import Map from "../../components/Map";
import { cancelBookedVisit } from "../../utils/api";

const Property = () => {
  const { pathname } = useLocation();
  const { user } = useAuth0();

  const id = pathname.split("/").slice(-1)[0];

  const { data, isLoading, isError, refetch } = useProperty(id);

  const residency = data ? data.residency : null;
  const [modalOpen, setModalOpened] = useState();
  const { validateLogin } = useAuthCheck();

  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(UserDetailContext);

  // cancelBookedVisit
  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => cancelBookedVisit(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id),
      }));

      toast.success("Booking Cancelled", { position: "bottom-right" });
    },
  });

  if (isError)
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          hight="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* like button  */}
        <div className="like">
          <Heart id={id} />
        </div>

        {/* image */}
        <img src={residency?.image} alt="home image" />

        {/* property details */}
        <div className="flexCenter property-details">
          {/* left */}
          <div className="flexColStart left">
            {/* head */}
            <div className="flexStart head">
              <span className="primaryText">{residency?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                $ {residency?.price}
              </span>
            </div>
            {/* facilities */}
            <div className="flexStart facilities">
              {/* bathrooms */}
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{residency?.facilities?.bathrooms} Bathrooms</span>
              </div>

              {/* parkings */}
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{residency?.facilities?.parkings} Parking</span>
              </div>

              {/* rooms */}
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{residency?.facilities?.bedrooms} Room/s</span>
              </div>
            </div>
            {/* description */}
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {residency?.description}
            </span>
            {/* address */}
            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {residency?.address} {residency?.city} {residency?.country}
              </span>
            </div>
            booking button
            {bookings?.map((booking) => booking.id).includes(id) ? (
              <>
                <Button
                  variant="outline"
                  w={"100%"}
                  color="red"
                  onClick={() => cancelBooking()}
                  disabled={cancelling}
                >
                  <span>Cancel booking</span>
                </Button>
                <span>
                  Your visit already booked for date{" "}
                  {bookings?.filter((booking) => booking?.id === id)[0]?.date}
                </span>
              </>
            ) : (
              <button
                className="button"
                onClick={() => {
                  validateLogin() && setModalOpened(true);
                }}
              >
                Book your visit
              </button>
            )}
            <BookingModal
              opened={modalOpen}
              setOpened={setModalOpened}
              propertyId={id}
              email={user?.email}
            />
          </div>

          {/* right side */}
          <div className="map">
            <Map
              address={residency?.address}
              city={residency?.city}
              country={residency?.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
