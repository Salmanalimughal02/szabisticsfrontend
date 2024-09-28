import {
  Button,
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";

import { H3 } from "../../../../AbstractElements";

type propsType = {
  isVisible: any;
  setIsVisible: any;
  evidenceData: any;
};

const ShowSinglePaymentEvidenceModal = ({
  isVisible,
  setIsVisible,
  evidenceData,
}: propsType) => {
  const addToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="modal-toggle-wrapper">
      <Modal isOpen={isVisible} toggle={addToggle} size="md" centered>
        <div className="modal-header">
          <H3 className="modal-title">View Payment Evidence</H3>
          <Button
            color="transparent"
            className="btn-close"
            onClick={addToggle}
          ></Button>
        </div>
        <ModalBody>
          <Form>
            <Row className="g-3">
              <Col md={12}>
                <Label htmlFor="inputPassword4">Transaction Id</Label>
                <Input
                  id="password"
                  type="text"
                  placeholder="Enter Bid Fare"
                  //   onChange={(e) => setTransactionId(e.target.value)}
                  value={evidenceData?.transactionId}
                  disabled
                />
              </Col>
              <Col md={12}>
                <Label htmlFor="inputPassword4">Payment Evidence</Label>

                <div className="col-auto position-relative">
                  <img
                    width="100%"
                    height="200px"
                    alt="edit-user"
                    style={{
                      border: "1px solid gray",
                      borderRadius: "10px",
                      marginBottom: "10px",
                    }}
                    src={evidenceData?.evidenceAttachment?.url}
                  />
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ShowSinglePaymentEvidenceModal;
