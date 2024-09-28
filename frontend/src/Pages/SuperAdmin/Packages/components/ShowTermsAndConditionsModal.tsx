import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Col, Form, Input, Label, Row } from "reactstrap";
import { useState } from "react";
import Swal from "sweetalert2";
import { create, patch } from "../../../../Utilities/api";
import { H3 } from "../../../../AbstractElements";
import { UPDATE_AGREEMENT_STATUS } from "../../../../Utilities/api/apiEndpoints";
type propsType = {
  isVisible: any;
  setIsVisible: any;
  id: any;
  acceptBid: any;
  packageId: any;
  driverId: any;
};

const ShowTermsAndConditionsModal = ({
  isVisible,
  setIsVisible,
  id,
  acceptBid,
  packageId,
  driverId
}: propsType) => {
  const [loading, setLoading] = useState(false);

  const addToggle = () => {
    if (!loading) {
      setIsVisible(!isVisible);
    }
  };

  const agreeTermsAndConditions = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    var bodyData = {
      hasUserAgreedWithContract: true,
    };
    // console.log(loginData);
    try {
      await patch(bodyData, {
        url: `${UPDATE_AGREEMENT_STATUS}/${packageId}`,
      }).then(async (data: any) => {
        console.log("response: ", data);

        setLoading(false);

        if (!data.success) {
          Swal.fire({
            text: `${data.message}`,
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          });

          addToggle();
        }
        if (data.success) {
          acceptBid(e, packageId, id, "ACCEPTED", driverId);
          addToggle();
        }
      });

      // Handle successful post creation (e.g., show a success message, redirect, etc.)
    } catch (error: any) {
      Swal.fire({
        text: `${error?.message}`,
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
      setLoading(false);

      addToggle();
    }
  };

  return (
    <div className="modal-toggle-wrapper">
      <Modal
        isOpen={isVisible}
        toggle={addToggle}
        size="md"
        centered
      // style={{
      //   height: "80vh",
      // }}
      >
        <div className="modal-header">
          <H3 className="modal-title">Terms And Conditions</H3>
          <Button
            color="transprant"
            className="btn-close"
            onClick={addToggle}
          ></Button>
        </div>
        <ModalBody
        // style={{
        //   height: "80vh",
        // }}
        >
          <Form>
            <Row className="g-3">
              <ol style={{ fontSize: "17px", padding: "25px" }}>
                <li>
                  The driver agrees to pick up the goods from the designated
                  location and deliver them to the specified drop-off location
                  in a timely and safe manner.
                </li>
                <li>
                  The driver is responsible for ensuring that the goods are
                  handled with care and are not damaged during transit.
                </li>
                <li>
                  The driver must arrive at the pickup location at the
                  agreed-upon time and follow any instructions provided by the
                  sender regarding the handling and transportation of the goods.
                </li>
                <li>
                  The driver must ensure that the goods are securely loaded and
                  properly protected during transit.
                </li>
                <li>
                  The driver must not open, tamper with, or use the goods being
                  transported.
                </li>
                <li>
                  The driver agrees to keep all information related to the
                  goods, sender, and recipient confidential.
                </li>
                <li>
                  The driver must submit proof of delivery, such as a signed
                  delivery receipt, to receive payment.
                </li>
              </ol>

              <Col md={12}>
                <Button
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                  }}
                  color="primary"
                  type="submit"
                  onClick={(e) => {
                    agreeTermsAndConditions(e);
                  }}
                >
                  {loading ? "Loading..." : "Agree"}
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ShowTermsAndConditionsModal;
