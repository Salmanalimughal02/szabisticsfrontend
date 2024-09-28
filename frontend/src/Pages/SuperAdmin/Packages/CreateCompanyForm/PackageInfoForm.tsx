import { ChangeEvent, useState } from "react";
import { BusinessFormCommonProps } from "../../../../Types/Forms/FormLayout/FormWizardTypes";
import ShowError from "./ShowError";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import {
  Continue,
} from "../../../../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { setCreatePackage } from "../../../../ReaduxToolkit/Reducer/CompanySlice";
import { P } from "../../../../AbstractElements";
import { Select } from "antd";

const PackageInfoForm = ({ callbackActive }: BusinessFormCommonProps) => {

  const dispatch = useDispatch();
  const { createPackage } = useSelector((state: any) => state.companies);
  // const [companyInfoForm, setCompanyInfoForm] = useState({
  //   fullName: "",
  //   phoneNo: "",
  //   address: "",
  //   contactPersonName: "",
  //   ntn: "",
  //   gstNo: "",
  //   contactPersonPhoneNo: "",
  //   cnicNumber: "",
  //   packageExpirationDate: "",
  // });
  const [packageInfoForm, setPackageInfoForm] = useState({
    name: "",
    modelNo: "",
    category: ""
  });
  const {
    name,
    modelNo,
    category
  } = packageInfoForm;
  const getUserData = (event: ChangeEvent<HTMLInputElement>) => {
    let name = event.target.name;
    let value =
      name === "rememberNextTime" ? event.target.checked : event.target.value;
    setPackageInfoForm({ ...packageInfoForm, [name]: value });
  };

  const handleNextButton = () => {
    if (
      name !== "" &&
      modelNo !== ""

    ) {

      dispatch(
        setCreatePackage({
          ...createPackage,
          ...packageInfoForm,
        })
      );

      callbackActive(2);
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
            Package Name
            <span className="txt-danger">*</span>
          </P>
          <Input
            type="text"
            placeholder="Enter Package Name"
            value={name}
            name="name"
            onChange={getUserData}
          />
        </Col>
        <Col xl={6} xs={12}>
          <P>
            Model No
            <span className="txt-danger">*</span>
          </P>
          <Input
            type="text"
            placeholder="Enter Model No"
            value={modelNo}
            name="modelNo"
            onChange={getUserData}
          />
        </Col>

        <Col xl={6} xs={12}>
          <P>
            Select Category
            <span className="txt-danger">*</span>
          </P>
          <Select
            value={category !== "" ? category : null}
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
            onChange={(e) => {
              setPackageInfoForm({ ...packageInfoForm, category: e });

            }}
            options={[
              {
                value: "APPLIANCES",
                label: "Appliances"
              },
              {
                value: "ELECTRONICS",
                label: "Electronics"
              },
              {
                value: "FURNITURE",
                label: "Furniture"
              },
              {
                value: "HEALTH",
                label: "Health"
              },
              {
                value: "FOOD",
                label: "Food"
              }
            ]}
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

export default PackageInfoForm;
