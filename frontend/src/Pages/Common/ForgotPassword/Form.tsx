import { useState } from "react";
import { H3, P } from "../../../AbstractElements";
import { Button, Form, FormGroup, Label } from "reactstrap";
import { EmailAddress } from "../../../utils/Constant";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { create } from "../../../Utilities/api";
import {
  CHECK_USER_EMAIL,
  SEND_OTP_EMAIL,
} from "../../../Utilities/api/apiEndpoints";

interface PropTypes {
  emailAddress: string; // Change 'boolean' to the actual type of isVisible
}

export interface CommonFormPropsType {
  alignLogo?: string;
}
const CommonForm = ({ alignLogo }: CommonFormPropsType) => {
  const [showPassWord, setShowPassWord] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PropTypes>();

  const forgotPassword: SubmitHandler<PropTypes> = async (data, e: any) => {
    e.preventDefault();
    if (data.emailAddress !== "") {
      var userData = {
        emailAddress: data.emailAddress,
      };

      setLoading(true);
      // console.log(loginData);
      try {
        await create(userData, {
          url: CHECK_USER_EMAIL,
        }).then(async (data: any) => {
          console.log("response: ", data);
          setLoading(false);

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
            setLoading(false);
            Swal.fire({
              text: `${data.message}`,
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
            const emailData = {
              userId: data.data._id,
              emailAddress: data.data.emailAddress,
            };
            create(emailData, {
              url: SEND_OTP_EMAIL,
            }).then(async (data: any) => {
              console.log("response: ", data);

              // setLoading(false);

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
                setLoading(false);
                Swal.fire({
                  text: `${data.message}`,
                  icon: "success",
                  timer: 2000,
                  showConfirmButton: false,
                });
                navigate(`${process.env.PUBLIC_URL}/verifyOTP`, {
                  state: {
                    emailAddress: emailData.emailAddress,
                    userId: emailData.userId,
                  },
                });
              }

              reset({
                emailAddress: "",
              });
            });
          }

          reset({
            emailAddress: "",
          });
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
        reset({
          emailAddress: "",
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
    <div className="login-card login-dark">
      <div>
        <div className="login-main">
          <Form className="theme-form" onSubmit={handleSubmit(forgotPassword)}>
            <H3>Forgot Password</H3>
            <P>{"Enter your email To Reset Your Password"}</P>
            <FormGroup>
              <Label className="col-form-label">{EmailAddress}</Label>
              <input
                className="form-control"
                type="email"
                required
                placeholder="Test@gmail.com"
                {...register("emailAddress", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />

              <span style={{ color: "red" }}>
              {errors.emailAddress && errors.emailAddress.message}
              </span>
            </FormGroup>

            <div className="text-end mt-2">
              <Button
                disabled={loading}
                color="primary"
                className="btn-block w-100"
              >
                {loading ? "Loading..." : "Send OTP"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CommonForm;
