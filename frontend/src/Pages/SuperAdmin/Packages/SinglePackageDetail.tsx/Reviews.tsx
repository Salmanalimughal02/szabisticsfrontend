import React, { useEffect, useRef, useState } from "react";
// import { Stepper, Step } from 'react-form-stepper';
import { BusinessFormCommonProps } from "../../../../Types/Forms/FormLayout/FormWizardTypes";
import { create, getAll } from "../../../../Utilities/api";
import {
  GET_ALL_FEEDBACKS_BY_DRIVER_ID,
  GET_SINGLE_PACKAGE_BY_ID,
  SUBMIT_FEEDBACK,
} from "../../../../Utilities/api/apiEndpoints";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Button, Col, Form, Input, Row } from "reactstrap";

import "./styles.css"; // Import your CSS file

import { getUserRole } from "../../../../Utilities/globals/globals";
import { Rate } from "antd";
import Skeleton from "../../../Utilities/Skeleton/Skeleton";
import { H5, Image } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { setPackage } from "../../../../ReaduxToolkit/Reducer/CompanySlice";

const Reviews = () => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { packagee } = useSelector((state: any) => state.companies);
  const [getFeedbackLoading, setFeedbackLoading] = useState(true);

  const createFeedback = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (review !== "") {
      var feedbackData = {
        driverId: packagee?.acceptedOffer?.user,
        packageId: packagee?._id,
        review: review,
        rating: rating,
      };

      // console.log(loginData);
      try {
        await create(feedbackData, {
          url: `${SUBMIT_FEEDBACK}`,
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
            setReview("");
            setRating(0);
            getAllFeedbacksByDriverId();
            getSinglePackage();
            // Clear the input field using the ref
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
        setReview("");
        setRating(0);
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

  const getAllFeedbacksByDriverId = () => {
    // console.log("packagee", packagee);
    setFeedbackLoading(true);
    getAll({
      url: `${GET_ALL_FEEDBACKS_BY_DRIVER_ID}/${packagee?.acceptedOffer?.user}`,
    }).then((data: any) => {
      // console.log("api call --- >", data);
      if (data !== undefined) {
        if (data.success) {
          // console.log("hhg");
          setFeedbacks(data.data);
          setFeedbackLoading(false);
        }
        if (!data.success) {
          // console.log("hhg");
          setFeedbacks([]);
          setFeedbackLoading(false);
        }
      }
    });
  };

  const dispatch = useDispatch();
  const getSinglePackage = () => {
    // console.log("packagee", packagee);
    setLoading(true);
    getAll({
      url: `${GET_SINGLE_PACKAGE_BY_ID}/${packagee?._id}`,
    }).then((data: any) => {
      // console.log("api call --- >", data);
      if (data !== undefined) {
        if (data.success) {
          // console.log("hhg");
          dispatch(setPackage(data.data));
          setLoading(false);
        }
        if (!data.success) {
          // console.log("hhg");
          // dispatch(setPackage(data.data));
          setLoading(false);
        }
      }
    });
  };

  useEffect(() => {

    if (packagee !== null) {
      getAllFeedbacksByDriverId();
    }
  }, [packagee]);

  const [value, setValue] = useState(0);

  return (
    <div>
      {getFeedbackLoading ? (
        <>
          <Row>
            <Col md="12">
              <Skeleton
                height="80px"
                width="100%"
                marginTop="10px"
                marginBottom="10"
                borderRadius="10px"
              />
            </Col>
            <Col md="12">
              <Skeleton
                height="30px"
                width="100%"
                marginTop="10px"
                marginBottom="10"
                borderRadius="10px"
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Skeleton
                height="80px"
                width="100%"
                marginTop="10px"
                marginBottom="10"
                borderRadius="10px"
              />
            </Col>
            <Col md="12">
              <Skeleton
                height="30px"
                width="100%"
                marginTop="10px"
                marginBottom="10"
                borderRadius="10px"
              />
            </Col>
          </Row>
        </>
      ) : (
        <div
          style={{
            marginBottom: "50px",
          }}
        >
          {packagee?.feedBack !== null && <div
            style={{
              backgroundColor: "lightgray",
              padding: "10px",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          >
            <Row className="mb-3">
              <div className="col-auto position-relative">
                <img
                  width="60px"
                  height="60px"
                  alt="edit-user"
                  style={{
                    border: "1px solid gray",
                    borderRadius: "100px",
                  }}
                  src={
                    packagee?.feedBack?.user?.profileImage?.url !== "" || packagee?.feedBack?.user?.profileImage?.url !== null
                      ? packagee?.feedBack?.user?.profileImage?.url
                      : dynamicImage("user/7.jpg")
                  }
                />
              </div>
              <Col>
                <H5 className="mb-1">
                  {packagee?.feedBack?.user?.firstName} {packagee?.feedBack?.user?.lastName}
                </H5>
                <div>{packagee?.feedBack?.review}</div>
                <Rate value={packagee?.feedBack?.rating} />
              </Col>
            </Row>
          </div>}
          {/* {feedbacks?.map((item: any) => {
            return (
              
            );
          })} */}
        </div>
      )}
      {getUserRole() == "OWNER" && packagee?.feedBack == null && (
        <Form style={{ marginBottom: "30px", marginTop: "10px" }}>
          <Row className="g-3" style={{ display: "flex", alignItems: "end" }}>
            <Col xl={11} xs={12}>
              <textarea
                rows={2}
                className="form-control"
                placeholder="Enter Feedback"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </Col>
            <Col xl={1} xs={12}>
              <Button
                disabled={loading ? true : false}
                color="primary"
                onClick={(e) => {
                  createFeedback(e);
                }}
              >
                {loading ? "Loading..." : "Create"}
              </Button>
            </Col>
            <Rate onChange={setRating} value={rating} />
          </Row>
        </Form>
      )}
    </div>
  );
};

export default Reviews;
