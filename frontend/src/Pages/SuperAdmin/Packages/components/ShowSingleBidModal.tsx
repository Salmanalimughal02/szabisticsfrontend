import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Col, Form, Input, Label, Row } from "reactstrap";
import { InputGroup, InputGroupText } from "reactstrap";

import { useState } from "react";
import Swal from "sweetalert2";
import { create } from "../../../../Utilities/api";
import { H3 } from "../../../../AbstractElements";
type propsType = {
  isVisible: any;
  setIsVisible: any;
  data: any;
};

const SingleBidModal = ({ isVisible, setIsVisible, data }: propsType) => {
  const [loading, setLoading] = useState(false);

  const addToggle = () => {
    if (!loading) {
      setIsVisible(!isVisible);
    }
  };

  return (
    <div className="modal-toggle-wrapper">
      <Modal isOpen={isVisible} toggle={addToggle} size="md" centered>
        <div className="modal-header">
          <H3 className="modal-title">View Bid</H3>
          <Button
            color="transprant"
            className="btn-close"
            onClick={addToggle}
          ></Button>
        </div>
        <ModalBody>
          <Form>
            <Row className="g-3">
              <>
                {/* <Col md={12}>
                  <Label htmlFor="inputPassword4">Bid Fare ($)</Label>
                  <Input
                    id="password"
                    type="text"
                    placeholder="Enter Bid Fare"
                    disabled
                    defaultValue={data?.bidFare}
                  />
                </Col> */}
                <Col md={12}>
                  <Label htmlFor="inputBidFare">Bid Fare</Label>
                  <InputGroup>
                    <InputGroupText>$</InputGroupText>
                    <Input
                      id="password"
                      type="text"
                      placeholder="Enter Bid Fare"
                      disabled
                      defaultValue={data?.bidFare}
                    />
                  </InputGroup>
                </Col>
                <Col md={12}>
                  <Label htmlFor="inputPassword4">Instruction Notes</Label>

                  <textarea
                    placeholder="Enter Instructions"
                    name="instructionsOrNotes"
                    rows={4}
                    style={{
                      width: "100%",
                      borderRadius: "5px",
                      padding: "10px",
                    }}
                    disabled
                    defaultValue={data?.notesOrInstruction}
                  />
                </Col>
              </>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default SingleBidModal;
