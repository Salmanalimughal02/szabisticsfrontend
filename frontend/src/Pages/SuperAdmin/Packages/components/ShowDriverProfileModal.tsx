import { Button, FormGroup, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Col, Form, Input, Label, Row } from "reactstrap";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { create, getAll } from "../../../../Utilities/api";
import { H3, H4, H5, P } from "../../../../AbstractElements";
import ShowTermsAndConditionsModal from "./ShowTermsAndConditionsModal";
import {
  GET_ALL_FEEDBACKS_BY_DRIVER_ID,
  GET_ALL_PACKAGES,
  GET_DRIVER_BY_ID,
  MAKE_A_BID,
} from "../../../../Utilities/api/apiEndpoints";
import {
  setFilterPackages,
  setPackages,
} from "../../../../ReaduxToolkit/Reducer/CompanySlice";
import { useDispatch } from "react-redux";
import Skeleton from "../../../Utilities/Skeleton/Skeleton";
import { Rate } from "antd";
import { dynamicImage } from "../../../../Service";
import { getUserRole } from "../../../../Utilities/globals/globals";
type propsType = {
  isVisible: any;
  setIsVisible: any;
  id: any;
};

const ShowDriverProfileModal = ({ isVisible, setIsVisible, id }: propsType) => {
  const [loading, setLoading] = useState(true);
  const [feedbackLoading, setFeedbackLoading] = useState(true);
  const dispatch = useDispatch();
  const [profileData, setProfileData]: any = useState(null);
  const [feedbacks, setFeedbacks] = useState([null]);

  const addToggle = () => {
    if (!loading) {
      setIsVisible(!isVisible);
    }
  };

  const getDriverProfile = () => {
    setLoading(true);
    getAll({ url: `${GET_DRIVER_BY_ID}/${id}` }).then((parentData: any) => {
      if (parentData !== undefined) {
        if (!parentData.success) {
          Swal.fire({
            text: `${parentData.message}`,
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          });
          setLoading(false);
        }
        if (parentData.success) {
          setProfileData(parentData.data);
          setLoading(false);
        }
      }
    });
  };

  const getAllFeedbacksByDriverId = () => {
    // console.log("packagee", packagee);
    setFeedbackLoading(true);
    getAll({
      url: `${GET_ALL_FEEDBACKS_BY_DRIVER_ID}/${id}`,
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

  useEffect(() => {
    getDriverProfile();
    getAllFeedbacksByDriverId();
  }, []);

  return (
    <div className="modal-toggle-wrapper">
      <Modal isOpen={isVisible} toggle={addToggle} size="lg" centered>
        <div className="modal-header">
          <H3 className="modal-title">View Profile</H3>
          <Button
            color="transprant"
            className="btn-close"
            onClick={addToggle}
          ></Button>
        </div>
        <ModalBody>
          <Form>
            {loading ? (
              <Row>
                <Col md="12">
                  <Skeleton
                    height="40px"
                    width="20%"
                    marginTop="10px"
                    marginBottom="0"
                    borderRadius="10px"
                  />
                  <Skeleton
                    height="40px"
                    width="100%"
                    marginTop="10px"
                    marginBottom="10"
                    borderRadius="10px"
                  />
                </Col>
                <Col md="12">
                  <Skeleton
                    height="40px"
                    width="20%"
                    marginTop="10px"
                    marginBottom="0"
                    borderRadius="10px"
                  />
                  <Skeleton
                    height="40px"
                    width="100%"
                    marginTop="10px"
                    marginBottom="10"
                    borderRadius="10px"
                  />
                </Col>
                <Col md="12">
                  <Skeleton
                    height="40px"
                    width="20%"
                    marginTop="10px"
                    marginBottom="0"
                    borderRadius="10px"
                  />
                  <Skeleton
                    height="40px"
                    width="100%"
                    marginTop="10px"
                    marginBottom="10"
                    borderRadius="10px"
                  />
                </Col>
                <Col md="12">
                  <Skeleton
                    height="40px"
                    width="20%"
                    marginTop="10px"
                    marginBottom="0"
                    borderRadius="10px"
                  />
                  <Skeleton
                    height="40px"
                    width="100%"
                    marginTop="10px"
                    marginBottom="10"
                    borderRadius="10px"
                  />
                </Col>
              </Row>
            ) : (
              <Row className="g-3">
                <div
                  style={{
                    display: "flex",
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    width="90px"
                    height="90px"
                    alt="Driver"
                    style={{
                      border: "1px solid gray",
                      borderRadius: "100px",
                      marginBottom: "25px",
                    }}
                    src={
                      profileData?.profileImage?.url !== ""
                        ? profileData?.profileImage?.url
                        : dynamicImage("user/7.jpg")
                    }
                  />
                </div>
                <Col md={12}>
                  <FormGroup>
                    <P>First Name</P>
                    <Input
                      type="text"
                      placeholder="Enter First Name"
                      disabled={true}
                      defaultValue={profileData?.firstName}
                      value={profileData?.firstName}
                    />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <P>Last Name</P>
                    <Input
                      type="text"
                      placeholder="Enter Last Name"
                      disabled={true}
                      defaultValue={profileData?.lastName}
                      value={profileData?.lastName}
                    />
                  </FormGroup>
                </Col>
                {/* <Col md={12}>
                  <FormGroup>
                    <P>Phone Number</P>
                    <Input
                      type="text"
                      placeholder="Enter Phone Number here"
                      disabled={true}
                      defaultValue={profileData?.phoneNo}
                      value={profileData?.phoneNo}
                    />
                  </FormGroup>
                </Col> */}
                {/* <Col md={12}>
                  <FormGroup>
                    <P>Email Address</P>
                    <Input
                      type="text"
                      placeholder="Enter Email Address"
                      disabled={true}
                      defaultValue={profileData?.emailAddress}
                      value={profileData?.emailAddress}
                    />
                  </FormGroup>
                </Col> */}
              </Row>
            )}

            {feedbackLoading ? (
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
                  marginTop: "30px",
                }}
              >
                <H4 className="mb-1">Feedbacks</H4>
                <div style={{ height: "15px" }}></div>
                {feedbacks.length == 0 ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                    }}
                  >
                    <H4 className="mb-1">No Feedbacks found</H4>
                  </div>
                ) : (
                  feedbacks?.map((item: any) => {
                    return (
                      <div
                        style={{
                          backgroundColor: "lightgray",
                          padding: "10px",
                          borderRadius: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <Row className="mb-1">
                          <div className="col-auto position-relative">
                            <img
                              width="60px"
                              height="60px"
                              alt="edit2user"
                              style={{
                                border: "1px solid gray",
                                borderRadius: "100px",
                              }}
                              src={
                                item?.user?.profileImage?.url !== ""
                                  ? item?.user?.profileImage?.url
                                  : dynamicImage("user/7.jpg")
                              }
                            />
                          </div>
                          <Col>
                            <H5 className="mb-1">
                              {item?.user?.firstName} {item?.user?.lastName}
                            </H5>
                            {getUserRole() !== "OWNER" && <div>{item?.review}</div>}
                            <Rate value={item?.rating} />
                          </Col>
                        </Row>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ShowDriverProfileModal;
