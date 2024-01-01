import React, { useContext, useState } from "react";
import { PuffLoader } from "react-spinners";
import { UserDetailContext } from "../../App";
import useProperties from "../../Hooks/useProperties";
import PropertyCard from "../../components/PropertyCard";
import SearchBar from "../../components/SearchBar";
import "../Properties/Properties.css";

const Bookings = () => {
  const { data, isLoading, isError, refetch } = useProperties();
  const [filter, setFilter] = useState("");

  const {
    userDetails: { bookings },
  } = useContext(UserDetailContext);

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
  const bookedResidencies = bookings?.map((item) => item.id) || [];

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />
        <div className="flexCenter paddings properties">
          {data?.residency
            ?.filter(({ id }) => bookedResidencies?.includes(id))
            ?.filter(
              (res) =>
                res?.title?.toLowerCase()?.includes(filter.toLowerCase()) ||
                res?.city?.toLowerCase()?.includes(filter.toLowerCase()) ||
                res?.country?.toLowerCase()?.includes(filter.toLowerCase())
            )
            .map((card, i) => (
              <PropertyCard card={card} key={i} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
