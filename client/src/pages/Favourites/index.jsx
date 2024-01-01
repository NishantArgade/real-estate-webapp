import React, { useContext, useState } from "react";
import { PuffLoader } from "react-spinners";
import { UserDetailContext } from "../../App";
import useProperties from "../../Hooks/useProperties";
import PropertyCard from "../../components/PropertyCard";
import SearchBar from "../../components/SearchBar";
import "../Properties/Properties.css";

const Favourites = () => {
  const { data, isLoading, isError, refetch } = useProperties();
  const [filter, setFilter] = useState("");

  const {
    userDetails: { favourites },
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
  const favouritResidencies = favourites || [];

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />
        <div className="flexCenter paddings properties">
          {data?.residency
            ?.filter(({ id }) => favouritResidencies?.includes(id))
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

export default Favourites;
