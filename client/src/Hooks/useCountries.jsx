import React from "react";
import countries from "world-countries";

const useCountries = () => {
  const formatedCountries = countries.map((country) => ({
    label: `${country.name.common} ${country.flag}`,
    value: country.name.common,
    latlng: country.latlng,
    region: country.region,
  }));

  const getAll = formatedCountries;

  return { getAll };
};

export default useCountries;
