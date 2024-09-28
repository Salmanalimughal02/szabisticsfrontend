import { ChangeEvent, useEffect, useRef, useState } from "react";
import { BusinessFormCommonProps } from "../../../../Types/Forms/FormLayout/FormWizardTypes";
import ShowError from "./ShowError";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Continue } from "../../../../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { setCreatePackage } from "../../../../ReaduxToolkit/Reducer/CompanySlice";
import { P } from "../../../../AbstractElements";
import { GoogleApiWrapper, IProvidedProps } from "google-maps-react";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

type LocationsFormProps = BusinessFormCommonProps & IProvidedProps;

const LocationsForm = ({ callbackActive, google }: LocationsFormProps) => {
  const dispatch = useDispatch();
  const { createPackage } = useSelector((state: any) => state.companies);

  const [locationForm, setLocationInfoForm] = useState({
    pickupContactNo: "",
    pickupAvailableTimings: "",
    dropoffContactNo: "",
  });
  const { pickupContactNo, pickupAvailableTimings, dropoffContactNo } =
    locationForm;
  const [pickup, setPickup] = useState("");
  const [dropOff, setDropOff] = useState("");
  
  const [distance, setDistance] = useState("");

  const getUserData = (event: ChangeEvent<HTMLInputElement>) => {
    let name = event.target.name;
    let value = event.target.value;
    setLocationInfoForm({ ...locationForm, [name]: value });
  };

  const pickUpInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (window.google && window.google.maps) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        pickUpInputRef.current as HTMLInputElement,
        {
          types: ["geocode"], // Change this if you want to filter types of places
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log("place", place);
        setPickup(place.formatted_address || "");
        console.log("locationForm", locationForm);
      });
    }
  }, []);

  const dropOffInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (window.google && window.google.maps) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        dropOffInputRef.current as HTMLInputElement,
        {
          types: ["geocode"], // Change this if you want to filter types of places
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log("place", place);
        setDropOff(place.formatted_address || "");

        console.log("locationForm", locationForm);
      });
    }
  }, []);

  useEffect(() => {
    if (pickup && dropOff) {
      calculateDistance(pickup, dropOff);
    }
  }, [pickup, dropOff]);

  const calculateDistance = (pickup: string, dropOff: string) => {
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [pickup],
        destinations: [dropOff],
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === "OK") {
          const distanceInMeters = response.rows[0].elements[0].distance.value;
          const distanceInKm = (distanceInMeters / 1000).toFixed(2);
          setDistance(distanceInKm);
        } else {
          console.error(`Error calculating distance: ${status}`);
        }
      }
    );
  };

  useEffect(() => {
    const inputElement = document.querySelector(".custom-phone-input input");
    if (inputElement) {
      inputElement.setAttribute("maxLength", "10"); // Adjust the length as needed
    }
  }, []);
  useEffect(() => {
    const inputElement = document.querySelector(".custom-phone-input2 input");
    if (inputElement) {
      inputElement.setAttribute("maxLength", "10"); // Adjust the length as needed
    }
  }, []);

  const handleNextButton = () => {
    if (
      pickup !== "" &&
      pickupContactNo !== "" &&
      pickupAvailableTimings !== "" &&
      dropOff !== "" &&
      dropoffContactNo !== ""
    ) {
      dispatch(
        setCreatePackage({
          ...createPackage,
          location: {
            ...locationForm,
            pickup: pickup,
            dropoff: dropOff,
            distance: distance,
          },
        })
      );

      callbackActive(4);
    } else {
      ShowError();
    }
  };
  return (
    <Form
      onSubmit={(event) => event.preventDefault()}
      className="needs-validation"
      noValidate
    >
      <Row className="g-3">
        <Col xl={6} xs={12}>
          <P>
            Pickup
            <span className="txt-danger">*</span>
          </P>
          <input
            type="text"
            className="form-control"
            placeholder="Select Pick Up"
            ref={pickUpInputRef}
          />
          {/* <Input
            type="text"
            placeholder="Enter Pickup"
            value={pickup}
            name="pickup"
            onChange={getUserData}
          /> */}
        </Col>
        <Col xl={6} xs={12}>
          <P>
            Pickup Contact Number
            <span className="txt-danger">*</span>
          </P>
          {/* <Input
            // id="pickupContactNo"
            className="form-control"
            type="number"
            placeholder="Enter Pickup Contact Number"
            value={pickupContactNo}
            name="pickupContactNo"
            onChange={getUserData}
          /> */}

          <div
            style={{
              border: "1px solid lightgray",
              paddingLeft: "8px",
              paddingTop: "8px",
              height: "38px",
              borderRadius: "5px",
            }}
          >
            <PhoneInput
              // type="number"
              placeholder="Enter Pickup Contact Number"
              value={pickupContactNo}
              name="pickupContactNo"
              onChange={(e) =>
                setLocationInfoForm({
                  ...locationForm,
                  pickupContactNo: e || "",
                })
              }
              className="custom-phone-input"
            />
          </div>
        </Col>
        <Col xl={6} xs={12}>
          <P>
            Pickup Available Timings
            <span className="txt-danger">*</span>
          </P>
          <Input
            type="time"
            placeholder="Enter Pickup Available Timings"
            value={pickupAvailableTimings}
            name="pickupAvailableTimings"
            onChange={getUserData}
          />
        </Col>
        <Col xl={6} xs={12}>
          <P>
            Drop Off
            <span className="txt-danger">*</span>
          </P>
          <input
            type="text"
            className="form-control"
            placeholder="Select Drop Off"
            ref={dropOffInputRef}
          />
        </Col>
        <Col xl={6} xs={12}>
          <P>
            Drop Off Contact number
            <span className="txt-danger">*</span>
          </P>
          {/* <Input
            // id="dropoffContactNo"
            className="form-control"
            type="number"
            placeholder="Enter Drop Off Contact number"
            value={dropoffContactNo}
            name="dropoffContactNo"
            onChange={getUserData}
          /> */}
          <div
            style={{
              border: "1px solid lightgray",
              paddingLeft: "8px",
              paddingTop: "8px",
              height: "38px",
              borderRadius: "5px",
            }}
          >
            <PhoneInput
              // type="number"
              placeholder="Enter Drop Off Contact number"
              value={dropoffContactNo}
              name="dropoffContactNo"

              onChange={(e) =>
                setLocationInfoForm({
                  ...locationForm,
                  dropoffContactNo: e || "",
                })
              }
              // onChange={getUserData}
              className="custom-phone-input custom-phone-input2"
            />
          </div>
        </Col>
        <Col xl={6} xs={12}>
          <P>
            Distance (km)
            <span className="txt-danger">*</span>
          </P>
          <Input
            type="text"
            placeholder="Select Distance"
            value={distance}
            name="distance"
            disabled
            // onChange={getUserData}
          />
        </Col>

        <Col xs={12} className="text-end">
          <Button color="primary" onClick={handleNextButton}>
            {Continue}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDI3fB-ItM1LpMOyMg_P8UxTUuxHCyQS34", // replace with your Google Maps API key
})(LocationsForm);
