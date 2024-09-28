import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Col, Form, Input, Label, Row } from "reactstrap";
import { H3, P } from "../../../AbstractElements";
import { useState } from "react";
import { create, patch, update } from "../../../Utilities/api";
import Swal from "sweetalert2";
import {
  UPDATE_PASSWORD,
  VALIDATE_CURRENT_PASSWORD,
} from "../../../Utilities/api/apiEndpoints";
type propsType = {
  toggle: () => void;
  isVisible: any;
  setIsVisible: any;
  isValidatedPassword: any;
  setIsvalidtedpasswoird: any;
};

const ChangePasswordModal = ({
  toggle,
  isVisible,
  setIsVisible,
  isValidatedPassword,
  setIsvalidtedpasswoird,
}: propsType) => {
  const [loading, setLoading] = useState(false);

  const addToggle = () => {
    if (!loading) {
      setIsVisible(!isVisible);
      setIsvalidtedpasswoird(false);
    }
  };

  const [curentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const validatePassword = async (e: any) => {
    e.preventDefault();

    if (curentPassword !== "" ) {
      var valiadteData = {
        currentPassword: curentPassword,
      };

      setLoading(true);

      // console.log(loginData);
      try {
        await create(valiadteData, {
          url: VALIDATE_CURRENT_PASSWORD,
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
            setCurrentPassword("");
          }

          if (data.success) {
            Swal.fire({
              text: `${data.message}`,
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
            setCurrentPassword("");
            setIsvalidtedpasswoird(true);
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
        setCurrentPassword("");
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
  const changePassword = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (
      newPassword !== "" &&
      confirmNewPassword !== "" &&
      newPassword === confirmNewPassword
    ) {
      if (newPassword === confirmNewPassword) {
        var valiadteData = {
          updatedPassword: newPassword,
          updatedConfirmPassword: confirmNewPassword,
        };

        // console.log(loginData);
        try {
          await patch(valiadteData, {
            url: UPDATE_PASSWORD,
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
              setNewPassword("");
              setConfirmNewPassword("");
              setIsvalidtedpasswoird(false);
              addToggle();
            }

            if (data.success) {
              Swal.fire({
                text: `${data.message}`,
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
              });
              setLoading(false);
              setNewPassword("");
              setConfirmNewPassword("");
              setIsvalidtedpasswoird(false);
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
          setNewPassword("");
          setConfirmNewPassword("");
          setIsvalidtedpasswoird(false);
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
          <H3 className="modal-title">Change Password</H3>
          <Button
            color="transprant"
            className="btn-close"
            onClick={addToggle}
          ></Button>
        </div>
        <ModalBody>
          <P>{!isValidatedPassword && "Please type your current password"}</P>
          <Form>
            <Row className="g-3">
              {!isValidatedPassword && (
                <Col md={12} style={{ position: "relative" }}>
                  {/* <Label htmlFor="inputPassword4">Change Password</Label> */}
                  <Input
                    id="password"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter Current Password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    value={curentPassword}
                  />

                  <span
                    style={{
                      position: "absolute",
                      right: "5%",
                      top: "20%",
                      color: "gray",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? "Hide" : "Show"}
                  </span>
                </Col>
              )}

              {isValidatedPassword && (
                <>
                  {" "}
                  <Col md={12} style={{ position: "relative" }}>
                    <Label htmlFor="inputPassword4">New Password</Label>
                    <Input
                      id="password"
                      type="text"
                      placeholder="Enter New Password"
                      onChange={(e) => setNewPassword(e.target.value)}
                      value={newPassword}
                    />
                    <span
                      style={{
                        position: "absolute",
                        right: "5%",
                        top: "50%",
                        color: "gray",
                        cursor: "pointer",
                      }}
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? "Hide" : "Show"}
                    </span>
                  </Col>
                  <Col md={12} style={{ position: "relative" }}>
                    <Label htmlFor="inputPassword4">Confirm New Password</Label>
                    <Input
                      id="password"
                      type="text"
                      placeholder="Enter Confirm New Password"
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      value={confirmNewPassword}
                    />
                    <span
                      style={{
                        position: "absolute",
                        right: "5%",
                        top: "50%",
                        color: "gray",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        setShowConfirmNewPassword(!showConfirmNewPassword)
                      }
                    >
                      {showConfirmNewPassword ? "Hide" : "Show"}
                    </span>
                  </Col>
                </>
              )}

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
                    if (isValidatedPassword) {
                      changePassword(e);
                    } else {
                      validatePassword(e);
                    }
                  }}
                >
                  {loading
                    ? "Loading..."
                    : isValidatedPassword
                    ? "Change Password"
                    : "Validate Password"}
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ChangePasswordModal;
