import { Button, Group, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import useCountries from "../../Hooks/useCountries";
import { validateString } from "../../utils/common";
import Map from "../Map";
import "./AddLocation.css";

const AddLocation = ({ propertyDetails, setPropertyDetails, nextStep }) => {
  const { getAll } = useCountries();
  const form = useForm({
    initialValues: {
      country: propertyDetails?.country,
      city: propertyDetails?.city,
      address: propertyDetails?.address,
    },

    validate: {
      country: (value) => validateString(value),
      city: (value) => validateString(value),
      address: (value) => validateString(value),
    },
  });

  const { country, city, address } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();

    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        country,
        city,
        address,
      }));

      nextStep();
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="flexCenter location-container">
        {/* left side */}
        {/* inputs */}

        <div
          className="flexColStart"
          style={{ flex: 1, gap: "1rem", marginTop: "1rem" }}
        >
          <Select
            w={"100%"}
            withAsterisk
            label="Country"
            clearable
            searchable
            data={getAll}
            {...form.getInputProps("country", { type: "input" })}
          />

          <TextInput
            w={"100%"}
            withAsterisk
            label="City"
            {...form.getInputProps("city", { type: "input" })}
          />

          <TextInput
            w={"100%"}
            withAsterisk
            label="Address"
            {...form.getInputProps("address", { type: "input" })}
          />
        </div>

        {/* right side */}

        <div style={{ flex: 1 }}>
          <Map address={address} city={city} country={country} />
        </div>
      </div>

      <Group position="center" mt={"xl"} py={"md"}>
        <Button type="submit">Next</Button>
      </Group>
    </form>
  );
};

export default AddLocation;
