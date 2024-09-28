import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Col, Form, Input, Label, Row } from "reactstrap";
import { InputGroup, InputGroupText } from "reactstrap";

import { useState } from "react";
import Swal from "sweetalert2";
import { create, getAll } from "../../../../Utilities/api";
import { H3 } from "../../../../AbstractElements";
import ShowTermsAndConditionsModal from "./ShowTermsAndConditionsModal";
import {
  GET_ALL_PACKAGES,
  MAKE_A_BID,
} from "../../../../Utilities/api/apiEndpoints";
import {
  setFilterPackages,
  setPackages,
} from "../../../../ReaduxToolkit/Reducer/CompanySlice";
import { useDispatch } from "react-redux";
type propsType = {
  isVisible: any;
  setIsVisible: any;
  id: any;
};

const MakeBidModal = ({ isVisible, setIsVisible, id }: propsType) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const addToggle = () => {
    if (!loading) {
      setIsVisible(!isVisible);
    }
  };

  const [bidFare, setBidFare] = useState("");
  const [notesOrInstruction, setNotesOrInstruction] = useState("");

  const makeBid = async (e: any) => {
    e.preventDefault();
    if (bidFare !== "" && notesOrInstruction !== "") {
      var valiadteData = {
        bidFare: bidFare,
        notesOrInstruction: notesOrInstruction,
      };

      setLoading(true);
      // console.log(loginData);
      try {
        await create(valiadteData, {
          url: `${MAKE_A_BID}/${id}`,
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
            setBidFare("");
            setNotesOrInstruction("");
            setLoading(false);
            addToggle();
          }

          if (data.success) {
            Swal.fire({
              text: `${data.message}`,
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
            setBidFare("");
            setNotesOrInstruction("");
            setLoading(false);
            getAll({
              url: GET_ALL_PACKAGES,
            }).then((data: any) => {
              // console.log("api call --- >", data);

              if (data !== undefined) {
                if (data.success) {
                  // console.log("hhg");
                  dispatch(setPackages(data.data));
                  dispatch(setFilterPackages(data.data));
                  setLoading(false);
                }
              }
            });
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
        setBidFare("");
        setNotesOrInstruction("");
        addToggle();
      }
    } else {
      Swal.fire({
        text: `Required Fileds are empty`,
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };
  return (
    <div className="modal-toggle-wrapper">
      <Modal isOpen={isVisible} toggle={addToggle} size="md" centered>
        <div className="modal-header">
          <H3 className="modal-title">Make Bid</H3>
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
                <Col md={12}>
                  <Label htmlFor="inputBidFare">Bid Fare</Label>
                  <InputGroup>
                    <InputGroupText>$</InputGroupText>
                    <Input
                      id="inputBidFare"
                      type="text"
                      placeholder="Enter Bid Fare"
                      onChange={(e) => setBidFare(e.target.value)}
                      value={bidFare}
                    />
                  </InputGroup>
                </Col>

                {/* <Col md={12}>
                  <Label htmlFor="inputPassword4">Bid Fare ($)</Label>
                  <Input
                    id="password"
                    type="text"
                    placeholder="Enter Bid Fare"
                    onChange={(e) => setBidFare(e.target.value)}
                    value={bidFare}
                  />
                </Col> */}
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
                    onChange={(e) => setNotesOrInstruction(e.target.value)}
                    value={notesOrInstruction}
                  />
                </Col>
              </>

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
                    // e.preventDefault();
                    // setIsOpenTermsModal(true);
                    makeBid(e);
                  }}
                >
                  {loading ? "Loading..." : " Make Bid"}
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default MakeBidModal;
