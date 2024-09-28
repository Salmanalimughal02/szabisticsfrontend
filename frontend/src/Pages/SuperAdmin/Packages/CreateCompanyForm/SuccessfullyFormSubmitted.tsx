import { H4, Image, P } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service/index";
import { SuccessfullyCompleted } from "../../../../utils/Constant";
import { BusinessFormCommonProps } from "../../../../Types/Forms/FormLayout/FormWizardTypes";
import ShowError from "./ShowError";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { setNoDataFound } from "../../../../ReaduxToolkit/Reducer/NoDataFoundSlice";
import { create, createCom, getAll } from "../../../../Utilities/api";
import { useNavigate } from "react-router-dom";
import CommonHeader from "../../../../Common/CommonHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import PDFViewer from "./PDFViewer";
import Swal from "sweetalert2";

import { ERROR_MESSAGE } from "../../../../Utilities/constants/constants";
import {
  setCreatePackage,
  setFilterPackages,
  setPackageImage,
  setPackages,
  setPackagesEnd,
  setPackagesStart,
  setReleaseDocumentOne,
  setReleaseDocumentTwo,
} from "../../../../ReaduxToolkit/Reducer/CompanySlice";
import { Select } from "antd";
import { distance } from "framer-motion";
// import pdfFile from "../../../assets/";
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const SuccessfullyFormSubmitted = ({
  callbackActive,
}: BusinessFormCommonProps) => {
  const {
    createPackage,
    packageImageBase64,
    releaseDocument1Base64,
    releaseDocument2Base64,
  } = useSelector((state: any) => state.companies);
  // console.log("createPackage", createPackage);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = (e: any) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  function checkFileTypeByExtension(fileName: any, file: any) {
    // console.log("filename", fileName);
    // console.log("file", file);

    const imageExtensions = ["jpg", "jpeg", "png", "gif"];
    const pdfExtension = "pdf";

    const extension = fileName.split(".").pop().toLowerCase();

    if (imageExtensions.includes(extension)) {
      return "image";
    } else if (extension === pdfExtension) {
      return "pdf";
    } else {
      return "unknown";
    }
  }
  const [numPages, setNumPages]: any = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const convertToBase64 = (file: any, setBase64: any) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // const convertToBase64 = (file: Blob | File, setBase64: (result: string | ArrayBuffer | null) => void) => {
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setBase64(reader.result);
  //   };
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   } else {
  //     console.error("File is not of type Blob or File");
  //   }
  // };
  const [packageImagee, setPackageImagee] = useState("");
  const [releaseDoc1, setReleaseDoc1] = useState("");
  const [releaseDoc2, setReleaseDoc2] = useState("");

  useEffect(() => {
    if (
      packageImageBase64 !== null &&
      releaseDocument1Base64 !== null &&
      releaseDocument2Base64 !== null
    ) {
      convertToBase64(packageImageBase64, setPackageImagee);
      convertToBase64(releaseDocument1Base64, setReleaseDoc1);
      convertToBase64(releaseDocument2Base64, setReleaseDoc2);
    }
  }, [packageImageBase64, releaseDocument1Base64, releaseDocument2Base64]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = {
      name: createPackage.name,
      modelNo: createPackage.modelNo,
      category: createPackage.category,
      dimensions: createPackage.dimensions,
      distance: createPackage.location.distance,
      location: createPackage.location,
      instructionsOrNotes: createPackage.instructionsOrNotes,
      isLoadingDockAvailable: false,
      packageImageBase64: packageImagee,
      releaseDocument1Base64: releaseDoc1,
      releaseDocument2Base64: releaseDoc2,
    };

    try {
      setLoading(true);
      await create(formData, {
        url: "http://localhost:8080/api/v1/package/create-package",
      }).then((data: any) => {
        if (!data.success && data.message === ERROR_MESSAGE) {
          setLoading(false);
        }
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
          // console.log(data);
          setLoading(false);
          dispatch(setPackagesStart());
          getAll({
            url: "http://localhost:8080/api/v1/package/get-all-packages",
          }).then((data: any) => {
            // console.log("api call --- >", data);
            if (data == undefined) {
              Swal.fire({
                text: "Failed to fetch due to connection refused",
                icon: "error",
                timer: 2000,
                showConfirmButton: false,
              });
              dispatch(setPackagesEnd());
              dispatch(setPackages([]));
              dispatch(setFilterPackages([]));
              return;
            }

            // ----------------------
            dispatch(setPackagesEnd());
            if (data !== undefined) {
              dispatch(setNoDataFound(data.message));
              if (!data.success) {
                // console.log("hhg");
                dispatch(setPackagesEnd());
                dispatch(setPackages([]));
                dispatch(setFilterPackages([]));
              }
              if (data.success) {
                dispatch(setCreatePackage({}));
                // console.log("hhg");
                dispatch(setPackages(data.data));
                dispatch(setFilterPackages(data.data));
                dispatch(setPackageImage(null));
                dispatch(setReleaseDocumentOne(null));
                dispatch(setReleaseDocumentTwo(null));
                navigate(`${process.env.PUBLIC_URL}/packages`);
              }
            }
          });
        }
      });
    } catch (error: any) {
      // console.error("Error creating post:", error);
      setLoading(false);
    }
  };

  return (
    <div className="form-completed">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <H4>Package Info</H4>
        <Row>
          <Col
            xs={9}
            className="text-end d-flex justify-content-end gap-2 align-center"
          >
            <Button color="primary" onClick={() => callbackActive(1)}>
              Edit
            </Button>
          </Col>
        </Row>
      </div>

      <Form style={{ marginBottom: "65px", marginTop: "20px" }}>
        <Row className="g-3">
          <Col xl={6} xs={12}>
            <P>
              Package Name
              <span className="txt-danger">*</span>
            </P>
            <Input
              type="text"
              placeholder="Enter Company Name"
              defaultValue={createPackage?.name}
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
              defaultValue={createPackage?.modelNo}
              name="modelNo"
              disabled
            />
          </Col>
          <Col xl={6} xs={12}>
            <P>
              Select Category
              <span className="txt-danger">*</span>
            </P>
            <Select
              value={createPackage?.category !== "" ? createPackage?.category?.toLowerCase() : null}
              showSearch
              style={{ width: "100%", height: 36 }}
              placeholder="Select Category"
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA: any, optionB: any) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              disabled

            />

          </Col>
        </Row>
      </Form>
      {/*  */}

      <H4>Dimensions</H4>

      <Form style={{ marginBottom: "65px", marginTop: "20px" }}>
        <Row className="g-3">
          <Col xl={6} xs={12}>
            <P>
              Height (ft)
              <span className="txt-danger">*</span>
            </P>
            <Input
              type="text"
              placeholder="Enter Height"
              defaultValue={createPackage?.dimensions?.height}
              name="height"
              disabled
            />
          </Col>
          <Col xl={6} xs={12}>
            <P>
              Width (ft)
              <span className="txt-danger">*</span>
            </P>
            <Input
              type="text"
              placeholder="Enter Width"
              defaultValue={createPackage?.dimensions?.width}
              name="width"
              disabled
            />
          </Col>
          <Col xl={6} xs={12}>
            <P>
              Weight (pounds)
              <span className="txt-danger">*</span>
            </P>
            <Input
              type="text"
              placeholder="Enter Weight"
              defaultValue={createPackage?.dimensions?.weight}
              name="weight"
              disabled
            />
          </Col>
          <Col xl={6} xs={12}>
            <P>
              Length (ft)
              <span className="txt-danger">*</span>
            </P>
            <Input
              type="text"
              placeholder="Enter Length"
              defaultValue={createPackage?.dimensions?.length}
              name="length"
              disabled
            />
          </Col>
        </Row>
      </Form>

      <H4>Locations</H4>
      <Form style={{ marginBottom: "65px", marginTop: "20px" }}>
        <Row className="g-3">
          <Col xl={6} xs={12}>
            <P>
              Pickup
              <span className="txt-danger">*</span>
            </P>
            <Input
              type="text"
              placeholder="Enter Pickup"
              defaultValue={createPackage?.location?.pickup}
              name="pickup"
              disabled
            />
          </Col>
          <Col xl={6} xs={12}>
            <P>
              Pickup Contact Number
              <span className="txt-danger">*</span>
            </P>
            <Input
              type="text"
              placeholder="Enter Pickup Contact Number"
              defaultValue={createPackage?.location?.pickupContactNo}
              name="pickupContactNo"
              disabled
            />
          </Col>
          <Col xl={6} xs={12}>
            <P>
              Pickup Available Timings
              <span className="txt-danger">*</span>
            </P>
            <Input
              type="time"
              placeholder="Enter Pickup Available Timings"
              defaultValue={createPackage?.location?.pickupAvailableTimings}
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
              defaultValue={createPackage?.location?.dropoff}
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
              defaultValue={createPackage?.location?.dropoffContactNo}
              name="dropoffContactNo"
              disabled
            />
          </Col>

          <Col xl={6} xs={12}>
            <P>
              Distance
              <span className="txt-danger">*</span>
            </P>
            <Input
              type="text"
              placeholder="Select Distance"
              defaultValue={createPackage?.location?.distance}
              name="distance"
              disabled
            />
          </Col>
        </Row>
      </Form>
      <H4>Instructions Notes</H4>
      <Form style={{ marginBottom: "65px", marginTop: "20px" }}>
        <Row className="g-3">
          <Col xl={12} xs={12}>
            <P>
              Instruction Notes
              <span className="txt-danger">*</span>
            </P>
            <textarea
              placeholder="Enter Instructions"
              defaultValue={createPackage?.instructionsOrNotes}
              name="instructionsOrNotes"
              rows={4}
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

      <Form style={{ marginBottom: "65px", marginTop: "20px" }}>
        <Row className="g-3">
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              flexWrap: "wrap",
            }}
          >
            {packageImageBase64 !== null &&
              checkFileTypeByExtension(
                packageImageBase64.name,
                packageImageBase64
              ) === "image" ? (
              <div style={{ marginRight: "10px" }}>
                <P style={{ fontSize: "18px", fontWeight: "bold" }}>
                  Package Image
                  <span className="txt-danger">*</span>
                </P>
                <img
                  src={URL.createObjectURL(packageImageBase64)}
                  alt=""
                  style={{
                    width: "300px",
                    height: "220px",
                    border: "1px solid lightgray",
                  }}
                />
              </div>
            ) : (
              packageImageBase64 !== null &&
              checkFileTypeByExtension(
                packageImageBase64.name,
                packageImageBase64
              ) === "pdf" && (
                <div style={{ marginRight: "10px" }}>
                  <P style={{ fontSize: "18px", fontWeight: "bold" }}>
                    Package Image
                    <span className="txt-danger">*</span>
                  </P>
                  <PDFViewer
                    file={packageImageBase64}
                    name={packageImageBase64.name.toString().slice(0, 20)}
                  />
                </div>
              )
            )}
            {releaseDocument1Base64 !== null &&
              checkFileTypeByExtension(
                releaseDocument1Base64.name,
                releaseDocument1Base64
              ) === "image" ? (
              <div style={{ marginRight: "10px" }}>
                <P style={{ fontSize: "18px", fontWeight: "bold" }}>
                  Release Document 1<span className="txt-danger">*</span>
                </P>
                <img
                  src={URL.createObjectURL(releaseDocument1Base64)}
                  alt=""
                  style={{
                    width: "300px",
                    height: "220px",
                    border: "1px solid lightgray",
                  }}
                />
              </div>
            ) : (
              releaseDocument1Base64 !== null &&
              checkFileTypeByExtension(
                releaseDocument1Base64.name,
                releaseDocument1Base64
              ) === "pdf" && (
                <div style={{ marginRight: "10px" }}>
                  <P style={{ fontSize: "18px", fontWeight: "bold" }}>
                    Release Document 1<span className="txt-danger">*</span>
                  </P>
                  <PDFViewer
                    file={releaseDocument1Base64}
                    name={releaseDocument1Base64.name.toString().slice(0, 20)}
                  />
                </div>
              )
            )}
            {releaseDocument2Base64 !== null &&
              checkFileTypeByExtension(
                releaseDocument2Base64.name,
                releaseDocument2Base64
              ) === "image" ? (
              <div style={{ marginRight: "10px" }}>
                <P style={{ fontSize: "18px", fontWeight: "bold" }}>
                  Release Document 2<span className="txt-danger">*</span>
                </P>
                <img
                  src={URL.createObjectURL(releaseDocument2Base64)}
                  alt=""
                  style={{
                    width: "300px",
                    height: "220px",
                    border: "1px solid lightgray",
                  }}
                />
              </div>
            ) : (
              releaseDocument2Base64 !== null &&
              checkFileTypeByExtension(
                releaseDocument2Base64.name,
                releaseDocument2Base64
              ) === "pdf" && (
                <div style={{ marginRight: "10px" }}>
                  <P style={{ fontSize: "18px", fontWeight: "bold" }}>
                    Release Document 2<span className="txt-danger">*</span>
                  </P>
                  <PDFViewer
                    file={releaseDocument2Base64}
                    name={releaseDocument2Base64.name.toString().slice(0, 20)}
                  />
                </div>
              )
            )}
          </div>
        </Row>
      </Form>
      <Row>
        <Col
          xs={12}
          className="text-end d-flex justify-content-end gap-2 align-center"
        >
          {/* <Button color="primary">Print</Button> */}
          <Button
            disabled={loading ? true : false}
            color="primary"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            {loading ? "Loading..." : "Create"}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SuccessfullyFormSubmitted;
