import { ChangeEvent, useState } from "react";
import { BusinessFormCommonProps } from "../../../../Types/Forms/FormLayout/FormWizardTypes";
import ShowError from "./ShowError";
import { Card, CardBody } from "reactstrap";
import CommonHeader from "../../../../Common/CommonHeader";
import Dropzone from "react-dropzone-uploader";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

import FileAttachementComponent from "./FileAttachementComponent";
import { setCreatePackage } from "../../../../ReaduxToolkit/Reducer/CompanySlice";
import { useDispatch, useSelector } from "react-redux";
import { create } from "../../../../Utilities/api";
import { H4 } from "../../../../AbstractElements";

const Attachements = ({ callbackActive }: BusinessFormCommonProps) => {

  const [personalDetailsForm, setPersonalDetailsForm] = useState({
    imageTitle: "",
    companyTitle: "",
  });
  const {
    createPackage,
    packageImageBase64,
    releaseDocument1Base64,
    releaseDocument2Base64,
  } = useSelector((state: any) => state.companies);
  const dispatch = useDispatch();



  const handleNextButton = (e: any) => {
    e.preventDefault();

    if (packageImageBase64 !== null && releaseDocument1Base64 !== null && releaseDocument2Base64 !== null) {
      callbackActive(6);
      dispatch(
        setCreatePackage({
          ...createPackage,
        })
      );

    } else {
      ShowError()
    }

  }

  interface type {
    file: any;
    meta: any;
    remove: any;
  }

  return (
    <Form
      onSubmit={(event) => event.preventDefault()}
      className="needs-validation"
      noValidate
    >
      <div>
        <Row className="g-3">
          <Col xs={12}>
            <H4>
              Legal Attachements
              <span className="txt-danger">*</span>
            </H4>
          </Col>
        </Row>
        <Row
          className="g-3"
          style={{
            padding: "10px",
            border: "1px solid gray",
            borderRadius: "10px",
            marginTop: "15px",
            marginBottom: "40px",
            marginLeft: "5px",
            marginRight: "5px",
          }}
        >
          <FileAttachementComponent
            heading="Attach Package Image"
            category="packageImage"
          />
          <FileAttachementComponent
            heading="Attach Release Document One"
            category="releaseDocumentOne"
          />
          <FileAttachementComponent
            heading="Attach Release Document Two"
            category="releaseDocumentTwo"
          />




        </Row>
      </div>


      <Row>
        <Col xs={12} className="text-end">
          <Button color="primary" onClick={handleNextButton}>
            Next
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Attachements;
