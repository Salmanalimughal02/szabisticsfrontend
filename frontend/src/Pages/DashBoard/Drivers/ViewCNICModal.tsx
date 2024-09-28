import { Button, Modal, ModalBody } from "reactstrap";
import { Form, Row } from "reactstrap";
import { useState } from "react";
import { H3 } from "../../../AbstractElements";

type propsType = {
  isVisible: any;
  setIsVisible: any;
  data: any;
};

const ViewCNICModal = ({ isVisible, setIsVisible, data }: propsType) => {
  const [loading, setLoading] = useState(false);

  const addToggle = () => {
    if (!loading) {
      setIsVisible(!isVisible);
    }
  };

  return (
    <Modal isOpen={isVisible} toggle={addToggle} size="md" centered>
      <div className="modal-header">
        <H3 className="modal-title">View CNIC</H3>
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
              <img
                src={data?.cnicImage?.url}
                alt=""
                style={{
                  width: "100%",
                  height: "400px",
                }}
              />
            </>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ViewCNICModal;
