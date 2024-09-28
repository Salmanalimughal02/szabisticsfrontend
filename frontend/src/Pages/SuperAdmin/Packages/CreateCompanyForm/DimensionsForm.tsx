import { ChangeEvent, useState } from "react";
import { BusinessFormCommonProps } from "../../../../Types/Forms/FormLayout/FormWizardTypes";
import ShowError from "./ShowError";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Continue } from "../../../../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { setCreatePackage } from "../../../../ReaduxToolkit/Reducer/CompanySlice";
import { P } from "../../../../AbstractElements";

const DimensionsForm = ({ callbackActive }: BusinessFormCommonProps) => {
  const dispatch = useDispatch();
  const { createPackage } = useSelector((state: any) => state.companies);

  const [dimensionsForm, setDimensionsInfoForm] = useState({
    height: 0,
    width: 0,
    weight: 0,
    length: 0,
  });
  const { height, width, weight, length } = dimensionsForm;
  const getUserData = (event: ChangeEvent<HTMLInputElement>) => {
    let name = event.target.name;
    let value = event.target.value;
    setDimensionsInfoForm({ ...dimensionsForm, [name]: value });
  };

  const handleNextButton = () => {
    if (height !== 0 && width !== 0 && weight !== 0 && length !== 0) {
      dispatch(
        setCreatePackage({
          ...createPackage,
          dimensions: {
            ...dimensionsForm,
          },
        })
      );

      callbackActive(3);
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
            Height (ft)
            <span className="txt-danger">*</span>
          </P>
          <Input
            type="number"
            placeholder="Enter Height"
            value={height}
            name="height"
            onChange={getUserData}
          />
        </Col>
        <Col xl={6} xs={12}>
          <P>
            Width (ft)
            <span className="txt-danger">*</span>
          </P>
          <Input
            type="number"
            placeholder="Enter Width"
            value={width}
            name="width"
            onChange={getUserData}
          />
        </Col>
        <Col xl={6} xs={12}>
          <P>
            Weight (pounds)
            <span className="txt-danger">*</span>
          </P>
          <Input
            type="number"
            placeholder="Enter Weight"
            value={weight}
            name="weight"
            onChange={getUserData}
          />
        </Col>
        <Col xl={6} xs={12}>
          <P>
            Length (ft)
            <span className="txt-danger">*</span>
          </P>
          <Input
            type="number"
            placeholder="Enter Length"
            value={length}
            name="length"
            onChange={getUserData}
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

export default DimensionsForm;
