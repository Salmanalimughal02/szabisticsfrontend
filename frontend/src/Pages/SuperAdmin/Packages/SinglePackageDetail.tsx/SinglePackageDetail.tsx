import { H4, P } from "../../../../AbstractElements";

import { BusinessFormCommonProps } from "../../../../Types/Forms/FormLayout/FormWizardTypes";
import { Col, Form, Input, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAll } from "../../../../Utilities/api";
import { GET_SINGLE_PACKAGE_BY_ID } from "../../../../Utilities/api/apiEndpoints";
import { setPackage } from "../../../../ReaduxToolkit/Reducer/CompanySlice";
import Skeleton from "../../../Utilities/Skeleton/Skeleton";

const SinglePackageDetail = ({ callbackActive }: BusinessFormCommonProps) => {
  const { packagee } = useSelector((state: any) => state.companies);
  console.log(packagee);
  const [loading, setLoading] = useState(true);
  const { packageId } = useParams();
  const dispatch = useDispatch();

  const getSinglePackage = () => {
    // console.log("packagee", packagee);
    setLoading(true);
    getAll({
      url: `${GET_SINGLE_PACKAGE_BY_ID}/${packageId}`,
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
    getSinglePackage();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Row>
            <Col md="4">
              <Skeleton
                height="40px"
                width="100%"
                marginTop="10px"
                marginBottom="10"
                borderRadius="10px"
              />
            </Col>
            <Col md="4">
              <Skeleton
                height="40px"
                width="100%"
                marginTop="10px"
                marginBottom="10"
                borderRadius="10px"
              />
            </Col>
            <Col md="4">
              <Skeleton
                height="40px"
                width="100%"
                marginTop="10px"
                marginBottom="10"
                borderRadius="10px"
              />
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <Skeleton
                height="40px"
                width="100%"
                marginTop="10px"
                marginBottom="10"
                borderRadius="10px"
              />
            </Col>
            <Col md="4">
              <Skeleton
                height="40px"
                width="100%"
                marginTop="10px"
                marginBottom="10"
                borderRadius="10px"
              />
            </Col>
            <Col md="4">
              <Skeleton
                height="40px"
                width="100%"
                marginTop="10px"
                marginBottom="10"
                borderRadius="10px"
              />
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <Skeleton
                height="40px"
                width="100%"
                marginTop="10px"
                marginBottom="10"
                borderRadius="10px"
              />
            </Col>
            <Col md="4">
              <Skeleton
                height="40px"
                width="100%"
                marginTop="10px"
                marginBottom="10"
                borderRadius="10px"
              />
            </Col>
            <Col md="4">
              <Skeleton
                height="40px"
                width="100%"
                marginTop="10px"
                marginBottom="10"
                borderRadius="10px"
              />
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <Skeleton
                height="40px"
                width="100%"
                marginTop="10px"
                marginBottom="10"
                borderRadius="10px"
              />
            </Col>
            <Col md="4">
              <Skeleton
                height="40px"
                width="100%"
                marginTop="10px"
                marginBottom="10"
                borderRadius="10px"
              />
            </Col>
            <Col md="4">
              <Skeleton
                height="40px"
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
          className="form-completed"
          style={{
            marginTop: "10px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <H4>Package Info</H4>
          </div>

          <Form style={{ marginBottom: "30px", marginTop: "10px" }}>
            <Row className="g-3">
              <Col xl={6} xs={12}>
                <P>
                  Package Name
                  <span className="txt-danger">*</span>
                </P>
                <Input
                  type="text"
                  placeholder="Enter Company Name"
                  defaultValue={packagee?.name}
                  name="name"
                  disabled
                // onChange={getUserData}
                />
              </Col>
              <Col xl={6} xs={12}>
                <P>
                  Model No
                  <span className="txt-danger">*</span>
                </P>
                <Input
                  type="text"
                  placeholder="Enter Phone No"
                  defaultValue={packagee?.modelNo}
                  name="modelNo"
                  disabled
                />
              </Col>
              <Col xl={6} xs={12}>
                <P>
                  Category
                  <span className="txt-danger">*</span>
                </P>
                <Input
                  type="text"
                  placeholder="Enter Category"
                  defaultValue={packagee?.category}
                  name="category"
                  disabled
                />
              </Col>
            </Row>
          </Form>
          {/*  */}

          <H4>Dimensions</H4>

          <Form style={{ marginBottom: "30px", marginTop: "10px" }}>
            <Row className="g-3">
              <Col xl={3} xs={12}>
                <P>
                  Height (ft)
                  <span className="txt-danger">*</span>
                </P>
                <Input
                  type="text"
                  placeholder="Enter Height"
                  defaultValue={packagee?.dimensions?.height}
                  name="height"
                  disabled
                />
              </Col>
              <Col xl={3} xs={12}>
                <P>
                  Width (ft)
                  <span className="txt-danger">*</span>
                </P>
                <Input
                  type="text"
                  placeholder="Enter Width"
                  defaultValue={packagee?.dimensions?.width}
                  name="width"
                  disabled
                />
              </Col>
              <Col xl={3} xs={12}>
                <P>
                  Weight (pounds)
                  <span className="txt-danger">*</span>
                </P>
                <Input
                  type="text"
                  placeholder="Enter Weight"
                  defaultValue={packagee?.dimensions?.weight}
                  name="weight"
                  disabled
                />
              </Col>
              <Col xl={3} xs={12}>
                <P>
                  Length (ft)
                  <span className="txt-danger">*</span>
                </P>
                <Input
                  type="text"
                  placeholder="Enter Length"
                  defaultValue={packagee?.dimensions?.length}
                  name="length"
                  disabled
                />
              </Col>
            </Row>
          </Form>

          <H4>Locations</H4>
          <Form style={{ marginBottom: "30px", marginTop: "10px" }}>
            <Row className="g-3">
              <Col xl={4} xs={12}>
                <P>
                  Pickup
                  <span className="txt-danger">*</span>
                </P>
                <Input
                  type="text"
                  placeholder="Enter Pickup"
                  defaultValue={packagee?.location?.pickup}
                  name="pickup"
                  disabled
                />
              </Col>
              <Col xl={4} xs={12}>
                <P>
                  Pickup Contact Number
                  <span className="txt-danger">*</span>
                </P>
                <Input
                  type="text"
                  placeholder="Enter Pickup Contact Number"
                  defaultValue={packagee?.location?.pickupContactNo}
                  name="pickupContactNo"
                  disabled
                />
              </Col>
              <Col xl={4} xs={12}>
                <P>
                  Pickup Available Timings
                  <span className="txt-danger">*</span>
                </P>
                <Input
                  type="text"
                  placeholder="Enter Pickup Available Timings"
                  defaultValue={packagee?.location?.pickupAvailableTimings}
                  name="pickupAvailableTimings"
                  disabled
                />
              </Col>
              <Col xl={6} xs={12}>
                <P>
                  Drop Off
                  <span className="txt-danger">*</span>
                </P>
                <Input
                  type="text"
                  placeholder="Enter  Drop Off"
                  defaultValue={packagee?.location?.dropoff}
                  name="dropoff"
                  disabled
                />
              </Col>
              <Col xl={6} xs={12}>
                <P>
                  Drop Off Contact number
                  <span className="txt-danger">*</span>
                </P>
                <Input
                  type="text"
                  placeholder="Enter  Drop Off Contact number"
                  defaultValue={packagee?.location?.dropoffContactNo}
                  name="dropoffContactNo"
                  disabled
                />
              </Col>
              <Col xl={6} xs={12}>
                <P>
                  Distance (km)
                  <span className="txt-danger">*</span>
                </P>
                <Input
                  type="text"
                  placeholder="Select Distance"
                  value={packagee?.distance}
                  name="distance"
                  disabled
                // onChange={getUserData}
                />
              </Col>
            </Row>
          </Form>
          <H4>Instructions Notes</H4>
          <Form style={{ marginBottom: "30px", marginTop: "10px" }}>
            <Row className="g-3">
              <Col xl={12} xs={12}>
                <P>
                  Instruction Notes
                  <span className="txt-danger">*</span>
                </P>
                <textarea
                  placeholder="Enter Instructions"
                  defaultValue={packagee?.instructionsOrNotes}
                  name="instructionsOrNotes"
                  rows={3}
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                    padding: "10px",
                  }}
                  disabled
                />
              </Col>
            </Row>
          </Form>

          <H4>Legal Attachements</H4>

          <Form style={{ marginBottom: "30px", marginTop: "10px" }}>
            <Row className="g-3">
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ marginRight: "10px" }}>
                  <P style={{ fontSize: "18px", fontWeight: "bold" }}>
                    Package Image
                    <span className="txt-danger">*</span>
                  </P>
                  <img
                    src={packagee?.packagePic?.url}
                    alt=""
                    style={{
                      width: "300px",
                      height: "220px",
                      border: "1px solid lightgray",
                    }}
                  />
                </div>
                <div style={{ marginRight: "10px" }}>
                  <P style={{ fontSize: "18px", fontWeight: "bold" }}>
                    Release Document 1<span className="txt-danger">*</span>
                  </P>
                  <img
                    src={packagee?.releaseDocument1?.url}
                    alt=""
                    style={{
                      width: "300px",
                      height: "220px",
                      border: "1px solid lightgray",
                    }}
                  />
                </div>
                <div style={{ marginRight: "10px" }}>
                  <P style={{ fontSize: "18px", fontWeight: "bold" }}>
                    Release Document 2<span className="txt-danger">*</span>
                  </P>
                  <img
                    src={packagee?.releaseDocument2?.url}
                    alt=""
                    style={{
                      width: "300px",
                      height: "220px",
                      border: "1px solid lightgray",
                    }}
                  />
                </div>
              </div>
            </Row>
          </Form>
        </div>
      )}
    </>
  );
};

export default SinglePackageDetail;
