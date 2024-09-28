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

const InstructionsForm = ({ callbackActive }: BusinessFormCommonProps) => {

    const dispatch = useDispatch();
    const { createPackage } = useSelector((state: any) => state.companies);

    const [instructionsForm, setInstructionsInfoForm] = useState({
        instructionsOrNotes: "",


    });
    const {
        instructionsOrNotes

    } = instructionsForm;
    const getUserData = (event: any) => {
        let name = event.target.name;
        let value = event.target.value;
        setInstructionsInfoForm({ ...instructionsForm, [name]: value });
    };

    const handleNextButton = () => {
        if (
            instructionsOrNotes !== ""

        ) {

            dispatch(
                setCreatePackage({
                    ...createPackage,
                    ...instructionsForm

                })
            );

            callbackActive(5);
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
                <Col xl={12} xs={12}>
                    <P>
                        Instruction Notes
                        <span className="txt-danger">*</span>
                    </P>
                    <textarea
                        placeholder="Enter Instructions"
                        value={instructionsOrNotes}
                        name="instructionsOrNotes"
                        rows={4}
                        style={{
                            width: "100%",
                            borderRadius: "5px",
                            padding:"10px"
                        }}
                        onChange={(e) => getUserData(e)}
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

export default InstructionsForm;
