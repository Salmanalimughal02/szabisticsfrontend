import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Col, Form, Input, Label, Row } from "reactstrap";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { create, getAll } from "../../../../Utilities/api";
import { H3, P } from "../../../../AbstractElements";
import { GoogleApiWrapper, IProvidedProps } from "google-maps-react";

import { useDispatch, useSelector } from "react-redux";
import {
  COMPLETE_PACKAGE,
  GET_ALL_PACKAGE_MILESTONES,
  GET_SINGLE_PACKAGE_BY_ID,
} from "../../../../Utilities/api/apiEndpoints";
import { setPackage } from "../../../../ReaduxToolkit/Reducer/CompanySlice";
type propsType = {
  isVisible: any;
  setIsVisible: any;
};

type CompletePackagProps = propsType & IProvidedProps;

const CompletePackageModal = ({
  isVisible,
  setIsVisible,
  google,
}: CompletePackagProps) => {
  const { packagee } = useSelector((state: any) => state.companies);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");
  const [url, setUrl] = useState("");

  const addToggle = () => {
    if (!loading) {
      setIsVisible(!isVisible);
    }
  };

  const completePackage = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (location !== "" && url !== "") {
      var completionData = {
        packageId: packagee?._id,
        location: location,
        url: url,
      };

      // console.log(loginData);
      try {
        await create(completionData, {
          url: `${COMPLETE_PACKAGE}`,
        }).then(async (data: any) => {
          console.log("response: ", data);

          if (!data.success) {
            Swal.fire({
              text: `${data.message}`,
              icon: "error",
              timer: 2000,
              showConfirmButton: false,
            });
            setLoading(false);
          }

          if (data.success) {
            Swal.fire({
              text: `${data.message}`,
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
            getSinglePackage();
            setLocation("");
            setUrl("");

            // Clear the input field using the ref
            if (inputRef.current) {
              inputRef.current.value = "";
            }
            setLoading(false);
            addToggle();
          }
        });

        // Handle successful post creation (e.g., show a success message, redirect, etc.)
      } catch (error: any) {
        Swal.fire({
          text: `${error?.message}`,
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
        setUrl("");
        setLocation("");

        // Clear the input field using the ref
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        setLoading(false);
        addToggle();
      }
    } else {
      Swal.fire({
        text: `Required Fileds are empty`,
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
      addToggle();
      setLoading(false);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const initializeAutocomplete = () => {
      if (google && google.maps && inputRef.current) {
        const autocomplete = new google.maps.places.Autocomplete(
          inputRef.current,
          {
            types: ["geocode"],
          }
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          setLocation(place.formatted_address || "");
          setUrl(place.url || "");
        });
      } else {
        console.error("Google Maps API or input element is not available.");
      }
    };

    if (isVisible) {
      setTimeout(initializeAutocomplete, 100); // Add a slight delay
    }
  }, [google, isVisible]);

  const getSinglePackage = () => {
    getAll({
      url: `${GET_SINGLE_PACKAGE_BY_ID}/${packagee?._id}`,
    }).then((data: any) => {
      // console.log("api call --- >", data);
      if (data !== undefined) {
        if (data.success) {
          // console.log("hhg");
          dispatch(setPackage(data.data));
        }
      }
    });
  };

  return (
    <div className="modal-toggle-wrapper">
      {/* Add custom CSS to ensure the dropdown is on top */}
      <style>
        {`
          .pac-container {
            z-index: 1051 !important; /* Bootstrap modals typically have z-index around 1050 */
          }
        `}
      </style>
      <Modal isOpen={isVisible} toggle={addToggle} size="md" centered>
        <div className="modal-header">
          <H3 className="modal-title">Complete Package</H3>
          <Button
            color="transprant"
            className="btn-close"
            onClick={addToggle}
          ></Button>
        </div>
        <ModalBody>
          <Form>
            <Row className="g-3">
              <>
                <Col md={12}>
                  <P>
                    Select Location
                    <span className="txt-danger">*</span>
                  </P>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter location"
                    ref={inputRef}
                  />
                </Col>
              </>

              <Col md={12}>
                <Button
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                  }}
                  color="primary"
                  type="submit"
                  onClick={(e) => {
                    completePackage(e);
                  }}
                >
                  {loading ? "Loading..." : "Complete"}
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDI3fB-ItM1LpMOyMg_P8UxTUuxHCyQS34", // replace with your Google Maps API key
})(CompletePackageModal);
