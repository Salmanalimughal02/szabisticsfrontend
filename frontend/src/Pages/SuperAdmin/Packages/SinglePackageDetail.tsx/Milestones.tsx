import React, { useEffect, useRef, useState } from "react";
// import { Stepper, Step } from 'react-form-stepper';
import { BusinessFormCommonProps } from "../../../../Types/Forms/FormLayout/FormWizardTypes";
import { create, getAll } from "../../../../Utilities/api";
import { Flex, Progress } from "antd";
import {
  CREATE_MILESTONE,
  GET_ALL_PACKAGE_MILESTONES,
} from "../../../../Utilities/api/apiEndpoints";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Button, Col, Form, Input, Row } from "reactstrap";
import { H4, P } from "../../../../AbstractElements";
import { Select } from "antd";
import "./styles.css"; // Import your CSS file

import { GoogleApiWrapper } from "google-maps-react";
import { getUserRole } from "../../../../Utilities/globals/globals";
import { Steps } from "antd";
import CompletePackageModal from "../components/CompletePackageModal";
import ShareLiveLocationPackageModal from "../components/ShareLiveLocationPackageModal";
import TruckProgressImage from "../../../../assets/truck-progress.png";

const Milestones = () => {
  const [activeStep, setActiveStep] = useState(3);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [url, setUrl] = useState("");
  const [milestones, setMilestones]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [getMilestonesLoading, setgetMilestonesLoading] = useState(true);
  const { packagee } = useSelector((state: any) => state.companies);
  const [isCompletePackageModalOpen, setIsCompletePackageModalOpen] =
    useState(false);

  const [isShareLiveLocationModalOpen, setIsShareLiveLocationModalOpen] =
    useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (window.google && window.google.maps) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current as HTMLInputElement,
        {
          types: ["geocode"], // Change this if you want to filter types of places
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log("place", place);
        setLocation(place.formatted_address || "");
        setUrl(place.url || "");
      });
    }
  }, []);

  const createMilestone = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (title !== "" && location !== "" && url !== "") {
      var milestoneData = {
        title: title,
        location: location,
        url: url,
      };

      // console.log(loginData);
      try {
        await create(milestoneData, {
          url: `${CREATE_MILESTONE}/${packagee?._id}`,
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
            setTitle("");
            setLocation("");
            setUrl("");
            getAllMilestones();
            // Clear the input field using the ref
            if (inputRef.current) {
              inputRef.current.value = "";
            }
            setLoading(false);
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
        setTitle("");
        setLocation("");
        setLoading(false);
      }
    } else {
      Swal.fire({
        text: `Required Fileds are empty`,
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const getAllMilestones = () => {
    console.log("packagee", packagee);
    setgetMilestonesLoading(true);
    getAll({
      url: `${GET_ALL_PACKAGE_MILESTONES}/${packagee?._id}`,
    }).then((data: any) => {
      // console.log("api call --- >", data);
      if (data !== undefined) {
        if (data.success) {
          // console.log("hhg");
          setMilestones(data.data);
          calculateDistance(data.data);
          setgetMilestonesLoading(false);
        }
      }
    });
  };

  useEffect(() => {
    if (packagee !== null) {
      getAllMilestones();
    }
  }, [packagee, isCompletePackageModalOpen]);

  const [distan, setDistan] = useState("");
  const calculateDistance = (data: any) => {
    const service = new window.google.maps.DistanceMatrixService();
    console.log("milestones[milestones.length - 1]", data);

    service.getDistanceMatrix(
      {
        origins: [data.length > 0 ?  data[data.length - 1]?.location : packagee?.location?.pickup],
        destinations: [packagee?.location?.dropoff],
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === "OK") {
          const distanceInMeters = response.rows[0].elements[0].distance.value;
          const distanceInKm = (distanceInMeters / 1000).toFixed(2);
          console.log("distant",distanceInKm);
          
          setDistan(distanceInKm);
        } else {
          console.error(`Error calculating distance: ${status}`);
        }
      }
    );
  };

  return (
    <div>
      <Row
        className="g-3"
        style={{
          display: "flex",
          justifyContent: "start",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <Col xs={12}>
          <H4>Total Distance: {packagee?.distance} km</H4>
          <H4>Remaining Distance: {distan} km</H4>
          <div style={{ marginTop: "20px" }}>
            <div style={{ position: "relative" }}>
              <Progress
                percent={Number(
                  (
                    ((Number(packagee?.distance) - Number(distan)) /
                      Number(packagee?.distance)) *
                    100
                  ).toFixed(2)
                )}
                strokeColor="#35bfbf"
                strokeWidth={35}
                showInfo={false} // Hides the default percentage text inside the bar
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: `${Number(
                    (
                      ((Number(packagee?.distance) - Number(distan)) /
                        Number(packagee?.distance)) *
                      100
                    ).toFixed(2)
                  )}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <img
                  src={TruckProgressImage}
                  alt=""
                  style={{ height: "18px", width: "30px" }}
                />
              </div>
            </div>
            <div
              style={{
                position: "relative",
                left: "0",
                width: "100%",
                height: "30%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 10px",
                color: "black",
                fontWeight: "bold",
              }}
            >
              <span>
                {(Number(packagee?.distance) - Number(distan)).toFixed(2)} km
                <div
                  style={{
                    fontSize: "12px",
                  }}
                >
                  Covered
                </div>
              </span>
              <span>
                {distan} km
                <div
                  style={{
                    fontSize: "12px",
                  }}
                >
                  Remaining
                </div>
              </span>
            </div>
          </div>
        </Col>
      </Row>
      <hr />
      {packagee?.liveLocationUrl !== "" && !packagee?.isCompleted && (
        <Row
          className="g-3"
          style={{
            display: "flex",
            justifyContent: "start",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          <Col xs={12}>
            <H4>Live Location:</H4>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={packagee?.liveLocationUrl}
              style={{ color: "blue", textDecoration: "underline" }}
            >
              {packagee?.liveLocationUrl}
            </a>
          </Col>
        </Row>
      )}
      {getUserRole() == "DRIVER" && !packagee?.isCompleted && (
        <Form style={{ marginBottom: "30px", marginTop: "10px" }}>
          <Row className="g-3" style={{ display: "flex", alignItems: "end" }}>
            <Col xl={6} xs={12}>
              <P>
                Select title
                <span className="txt-danger">*</span>
              </P>
              <Select
                value={title !== "" ? title : null}
                showSearch
                style={{
                  width: "100%",
                  height: 36,
                  outline: "none !important",
                  boxShadow: "none !important",
                }}
                placeholder="Select title"
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA: any, optionB: any) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                onChange={(e) => {
                  setTitle(e);
                }}
                options={[
                  { label: "Pick Up", value: "Pick Up" },
                  { label: "Intransit", value: "Intransit" },
                  { label: "Update Location", value: "Update Location" },
                  { label: "Drop Off", value: "Drop Off" },
                ]}
              />
            </Col>
            <Col xl={5} xs={12}>
              <P>
                Location
                <span className="txt-danger">*</span>
              </P>
              <input
                type="text"
                className="form-control"
                placeholder="Enter location"
                ref={inputRef}
              />
            </Col>
            <Col xl={1} xs={12}>
              <Button
                disabled={loading ? true : false}
                color="primary"
                onClick={(e) => {
                  createMilestone(e);
                }}
              >
                {loading ? "Loading..." : "Create"}
              </Button>
            </Col>
          </Row>
        </Form>
      )}
      <div style={{ height: "20px" }}></div>

      <Steps
        onChange={(currentStep) => {
          const currentMilestone: any = milestones[currentStep];
          window.open(currentMilestone?.url, "_blank");
          console.log(currentMilestone?.url);
        }}
        current={milestones.length - 1} // Adjusted to display the correct current step
        items={[
          ...milestones.map((milestone: any) => {
            return {
              title: milestone?.title,
              description: (
                <div>
                  <div>{milestone?.location}</div>
                  <div style={{ color: "lightblue" }}>
                    {milestone?.createdAt.slice(0, 10)}
                  </div>
                  <div style={{ color: "lightblue" }}>
                    {new Date(milestone?.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    })}
                  </div>
                </div>
              ),
              url: milestone?.url,
            };
          }),
        ]}
      />
      {(getUserRole() === "DRIVER" ||
        (getUserRole() === "OWNER" && packagee?.isCompleted)) && (
        <Row className="g-3" style={{ marginTop: "20px" }}>
          <Col xl={12} xs={12}>
            <Button
              disabled={packagee?.isCompleted}
              color="primary"
              onClick={(e) => {
                setIsCompletePackageModalOpen(true);
                // createFeedback(e);
              }}
              style={{
                width: "100%",
              }}
            >
              {packagee?.isCompleted ? "Completed" : "Complete Package"}
            </Button>
          </Col>
        </Row>
      )}

      {getUserRole() === "DRIVER" && !packagee?.isCompleted && (
        <Row className="g-3" style={{ marginTop: "10px" }}>
          <Col xl={12} xs={12}>
            <Button
              disabled={packagee?.isCompleted}
              color="primary"
              onClick={(e) => {
                setIsShareLiveLocationModalOpen(true);
                // createFeedback(e);
              }}
              style={{
                width: "100%",
              }}
            >
              Share Live Location
            </Button>
          </Col>
        </Row>
      )}
      {isCompletePackageModalOpen && (
        <CompletePackageModal
          isVisible={isCompletePackageModalOpen}
          setIsVisible={setIsCompletePackageModalOpen}
        />
      )}
      {isShareLiveLocationModalOpen && (
        <ShareLiveLocationPackageModal
          isVisible={isShareLiveLocationModalOpen}
          setIsVisible={setIsShareLiveLocationModalOpen}
        />
      )}
    </div>
  );
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyDI3fB-ItM1LpMOyMg_P8UxTUuxHCyQS34", // replace with your Google Maps API key
})(Milestones);
