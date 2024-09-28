import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { Col, Form, Row } from "reactstrap";
import { useState } from "react";
import Swal from "sweetalert2";
import { create, getAll, patch } from "../../../../Utilities/api";
import { H3, P } from "../../../../AbstractElements";
import { GoogleApiWrapper, IProvidedProps } from "google-maps-react";

import { useDispatch, useSelector } from "react-redux";
import {
  ATTACH_LIVE_LOCATION,
  GET_SINGLE_PACKAGE_BY_ID,
} from "../../../../Utilities/api/apiEndpoints";
import { setPackage } from "../../../../ReaduxToolkit/Reducer/CompanySlice";

type propsType = {
  isVisible: any;
  setIsVisible: any;
};

type CompletePackagProps = propsType & IProvidedProps;

const ShareLiveLocationModal = ({
  isVisible,
  setIsVisible,
  google,
}: CompletePackagProps) => {
  const { packagee } = useSelector((state: any) => state.companies);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const addToggle = () => {
    if (!loading) {
      setIsVisible(!isVisible);
    }
  };

  //   const shareLiveLocation = async (e: any) => {
  //     e.preventDefault();
  //     setLoading(true);

  //     // Use the Geolocation API to get the current location
  //     navigator.geolocation.getCurrentPosition(
  //       async (position) => {
  //         const latitude = position.coords.latitude;
  //         const longitude = position.coords.longitude;
  //         const url = `https://maps.google.com/?q=${latitude},${longitude}`;

  //         const completionData = {
  //           liveLocationUrl: url,
  //         };

  //         try {
  //           await patch(completionData, {
  //             url: `${ATTACH_LIVE_LOCATION}/${packagee?._id}`,
  //           }).then(async (data: any) => {
  //             console.log("response: ", data);

  //             if (!data.success) {
  //               Swal.fire({
  //                 text: `${data.message}`,
  //                 icon: "error",
  //                 timer: 2000,
  //                 showConfirmButton: false,
  //               });
  //               setLoading(false);
  //             }

  //             if (data.success) {
  //               Swal.fire({
  //                 text: `${data.message}`,
  //                 icon: "success",
  //                 timer: 2000,
  //                 showConfirmButton: false,
  //               });
  //               getSinglePackage();
  //               setLoading(false);
  //               addToggle();
  //             }
  //           });
  //         } catch (error: any) {
  //           Swal.fire({
  //             text: `${error?.message}`,
  //             icon: "error",
  //             timer: 2000,
  //             showConfirmButton: false,
  //           });
  //           setLoading(false);
  //           addToggle();
  //         }
  //       },
  //       (error) => {
  //         console.error("Error getting location: ", error);
  //         Swal.fire({
  //           text: `Could not retrieve location. Please try again.`,
  //           icon: "error",
  //           timer: 2000,
  //           showConfirmButton: false,
  //         });
  //         setLoading(false);
  //         addToggle();
  //       }
  //     );
  //   };

  const [url, setUrl] = useState("");

  const shareLiveLocation = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const completionData = {
      liveLocationUrl: url,
    };

    try {
      await patch(completionData, {
        url: `${ATTACH_LIVE_LOCATION}/${packagee?._id}`,
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
          setLoading(false);
          addToggle();
        }
      });
    } catch (error: any) {
      Swal.fire({
        text: `${error?.message}`,
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
      setLoading(false);
      addToggle();
    }

    // Use the Geolocation API to get the current location
    // navigator.geolocation.getCurrentPosition(
    //   async (position) => {
    //     const latitude = position.coords.latitude;
    //     const longitude = position.coords.longitude;
    //     const url = `https://maps.google.com/?q=${latitude},${longitude}`;

    //   },
    //   (error) => {
    //     console.error("Error getting location: ", error);
    //     Swal.fire({
    //       text: `Could not retrieve location. Please try again.`,
    //       icon: "error",
    //       timer: 2000,
    //       showConfirmButton: false,
    //     });
    //     setLoading(false);
    //     addToggle();
    //   }
    // );
  };

  const getSinglePackage = () => {
    getAll({
      url: `${GET_SINGLE_PACKAGE_BY_ID}/${packagee?._id}`,
    }).then((data: any) => {
      if (data !== undefined) {
        if (data.success) {
          dispatch(setPackage(data.data));
        }
      }
    });
  };

  return (
    <div className="modal-toggle-wrapper">
      <style>
        {`
          .pac-container {
            z-index: 1051 !important; /* Bootstrap modals typically have z-index around 1050 */
          }
        `}
      </style>
      <Modal isOpen={isVisible} toggle={addToggle} size="md" centered>
        <div className="modal-header">
          <H3 className="modal-title">Share Live Location</H3>
          <Button
            color="transparent"
            className="btn-close"
            onClick={addToggle}
          ></Button>
        </div>
        <ModalBody>
          <Form>
            <Row className="g-3">
              <Col md={12}>
                <Label htmlFor="inputPassword4">Enter live Location</Label>
                <Input
                  id="password"
                  type="text"
                  placeholder="Enter Live Location"
                  onChange={(e) => setUrl(e.target.value)}
                  value={url}
                />
              </Col>
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
                    shareLiveLocation(e);
                  }}
                >
                  {loading ? "Loading..." : "Share Live Location"}
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
})(ShareLiveLocationModal);
