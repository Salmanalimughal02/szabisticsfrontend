import { useEffect, useState } from "react";
import { H1, H4 } from "../../../AbstractElements";
import { Button, Form, FormGroup } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { create } from "../../../Utilities/api";

import OTPInput from "react-otp-input";
import "./otpstyles.css";
import Swal from "sweetalert2";

import { useDispatch } from "react-redux";
import {
  SEND_OTP_EMAIL,
  SEND_VERIFICATION_OTP,
  VERIFY_OTP,
  VERIFY_REGISTRATION_OTP,
} from "../../../Utilities/api/apiEndpoints";

export interface CommonFormPropsType {
  alignLogo?: string;
  emailAddress?: string;
}
const VerifyOTPFormForRegistration = ({
  alignLogo,
  emailAddress,
}: CommonFormPropsType) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [timer, setTimer] = useState(120); // Initial timer value in seconds
  const [isActive, setIsActive] = useState(true);

  // Function to start the timer
  useEffect(() => {
    let interval: any;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else if (timer === 0) {
      // Here you can add actions to perform when the timer reaches zero
      // For example, disable submit button or show a message
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  // Function to handle resend button click
  const handleResend = () => {
    setTimer(120); // Reset the timer
    setIsActive(true); // Start the timer again
  };

  // Format timer for display
  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleChange = (e: any) => {
    // console.log(e);
    setOtp(e);
  };

  const verifyOTP = async (e: any) => {
    e.preventDefault();
    if (otp !== "") {
      const otpData = {
        emailAddress: emailAddress,
        otpCode: otp,
      };
      setLoading(true);
      // console.log(otpData);
      try {
        await create(otpData, {
          url: VERIFY_REGISTRATION_OTP,
        }).then((data: any) => {
          console.log("response: ", data);
          setLoading(false);
          if (!data.success) {
            Swal.fire({
              text: `${data.message}`,
              icon: "error",
              timer: 2000,
              showConfirmButton: false,
            });
          }

          if (data.success) {
            Swal.fire({
              text: `${data.message}`,
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
            navigate(`${process.env.PUBLIC_URL}/login`);
          }
        });
      } catch (error: any) {
        // console.error("Error creating post:", error);
        setLoading(false);
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

  const resendOTPCode = async () => {
    try {
      const emailData = {
        emailAddress: emailAddress,
      };
      create(emailData, {
        url: SEND_VERIFICATION_OTP,
      }).then(async (data: any) => {
        console.log("response: ", data);

        if (!data.success) {
          setLoading(false);
          Swal.fire({
            text: `${data.message}`,
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          });
        }

        if (data.success) {
          Swal.fire({
            text: `${data.message}`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          handleResend();
        }
      });

      // Handle successful post creation (e.g., show a success message, redirect, etc.)
    } catch (error: any) {
      // Handle error (e.g., show an error message)
      // console.error("Error creating post:", error);
    }
  };
  return (
    <div className="login-card login-dark">
      <div>
        <div className="login-main">
          <Form
            onSubmit={(e) => {
              verifyOTP(e);
            }}
          >
            <H1>Verify OTP</H1>
            <div style={{ margin: "15px 0px" }}>
              <H4>{"Enter your OTP Verification Code"}</H4>
            </div>

            <div style={{ margin: "35px 0px" }}>
              <OTPInput
                containerStyle={{ display: "flex", justifyContent: "center" }} // Add container styles if needed
                value={otp}
                onChange={(e) => handleChange(e)}
                numInputs={4}
                renderSeparator={<span>-</span>}
                inputStyle="otp-input"
                renderInput={(props) => <input {...props} />}
                shouldAutoFocus={true}
              />
            </div>

            <FormGroup className="mb-0 form-group">
              <div className="text-end mt-3">
                <Button
                  disabled={loading}
                  color="primary"
                  className="btn-block w-100"
                >
                  {loading ? "Loading..." : "Verify"}
                </Button>
              </div>
            </FormGroup>
          </Form>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <H4> This OTP will expire after </H4>
              <H4>
                <span
                  style={{
                    color: "#33BFBF",
                    marginLeft: "3px",
                    marginRight: "3px",
                  }}
                >
                  {" "}
                  {formatTime(timer)}{" "}
                </span>
              </H4>
            </div>
            {timer === 0 && (
              <H4>
                <span
                  style={{
                    color: "#33BFBF",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={resendOTPCode}
                >
                  Resend
                </span>
              </H4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTPFormForRegistration;
