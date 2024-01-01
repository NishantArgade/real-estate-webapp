import { useAuth0 } from "@auth0/auth0-react";
import { Container, Modal, Stepper } from "@mantine/core";
import React, { useState } from "react";
import AddLocation from "../AddLocation";
import BasicDetails from "../BasicDetails";
import Facilities from "../Facilities";
import UploadImage from "../UploadImage";

const AddPropertyModal = ({ modalOpen, setModalOpen }) => {
  const [active, setActive] = useState(0);
  const { user } = useAuth0();

  const [propertyDetails, setPropertyDetails] = useState({
    title: "",
    description: "",
    price: 0,
    country: "",
    city: "",
    address: "",
    image: null,
    facilities: {
      bedrooms: 0,
      parkings: 0,
      bathrooms: 0,
    },
    userEmail: user?.email,
  });

  function nextStep() {
    setActive((active) => (active < 4 ? active + 1 : active));
  }
  function prevStep() {
    setActive((active) => (active > 0 ? active - 1 : active));
  }
  return (
    <Modal
      opened={modalOpen}
      onClose={() => setModalOpen(false)}
      closeOnClickOutside
      size={"90rem"}
    >
      <Container w={"100%"} h={"40rem"}>
        <Stepper active={active}>
          <Stepper.Step
            label="Location"
            description="Address"
            // allowStepSelect={shouldAllowSelectStep(0)}
          >
            <AddLocation
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
              nextStep={nextStep}
            />
          </Stepper.Step>
          <Stepper.Step
            label="Images"
            description="Upload"
            // allowStepSelect={shouldAllowSelectStep(1)}
          >
            <UploadImage
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          </Stepper.Step>
          <Stepper.Step
            label="Basics"
            description="Details"
            // allowStepSelect={shouldAllowSelectStep(2)}
          >
            <BasicDetails
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          </Stepper.Step>

          <Stepper.Step
            label="Submit"
            // allowStepSelect={shouldAllowSelectStep(2)}
          >
            <Facilities
              prevStep={prevStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
              setOpened={setModalOpen}
              setActiveStep={setActive}
            />
          </Stepper.Step>

          <Stepper.Completed>complete</Stepper.Completed>
        </Stepper>
      </Container>
    </Modal>
  );
};

export default AddPropertyModal;
