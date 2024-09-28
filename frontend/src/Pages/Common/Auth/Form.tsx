import { useState } from "react";

import { H3, P } from "../../../AbstractElements";
import { Button, Form, FormGroup, Label } from "reactstrap";
import { EmailAddress, Password } from "../../../utils/Constant";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";

import { setUserData } from "../../../ReaduxToolkit/Reducer/UserSlice";
import { create, getAll, login } from "../../../Utilities/api";
import { getUserRole } from "../../../Utilities/globals/globals";
import {
  GET_PROFILE,
  LOGIN,
  SEND_VERIFICATION_OTP,
} from "../../../Utilities/api/apiEndpoints";

interface PropTypes {
  emailAddress: string; // Change 'boolean' to the actual type of isVisible
  password: string;
}

export interface CommonFormPropsType {
  alignLogo?: string;
}
const CommonForm = ({ alignLogo }: CommonFormPropsType) => {
  const [showPassWord, setShowPassWord] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const header = "Sign In ";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PropTypes>();

  const loginUser: SubmitHandler<PropTypes> = async (data, e: any) => {
    e.preventDefault();
    if (data.emailAddress !== "" && data.password !== "") {
      var loginData = {
        emailAddress: data.emailAddress,
        password: data.password,
      };

      setLoading(true);
      // console.log(loginData);
      try {
        await create(loginData, {
          url: LOGIN,
        }).then(async (data: any) => {
          console.log("response: ", data);

          setLoading(false);
          if (!data.success) {
            if (data?.error && !data?.error.isVerified) {
              Swal.fire({
                text: `${data.message} So that first Verify by using OTP `,
                icon: "error",
                timer: 2000,
                showConfirmButton: false,
              });

              create(
                { emailAddress: loginData.emailAddress },
                {
                  url: SEND_VERIFICATION_OTP,
                }
              ).then(async (data: any) => {
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
                    timer: 1500,
                    showConfirmButton: false,
                  });
                  navigate(
                    `${process.env.PUBLIC_URL}/verify-registration-OTP`,
                    {
                      state: {
                        emailAddress: loginData.emailAddress,
                      },
                    }
                  );
                }
              });
            } else {
              Swal.fire({
                text: `${data.message}`,
                icon: "error",
                timer: 2000,
                showConfirmButton: false,
              });
            }
          }

          if (data.success) {
            Swal.fire({
              text: `${data.message}`,
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });

            const token = data.data.authToken;

            localStorage.setItem("token", token);
            dispatch(setUserData(null));
            getAll({
              url: GET_PROFILE,
            }).then((parentData: any) => {
              console.log(parentData);
              if (parentData !== undefined) {
                if (parentData.success) {
                  dispatch(setUserData(parentData.data));
                  if (getUserRole() == "SUPER_ADMIN") {
                    navigate(`${process.env.PUBLIC_URL}/drivers`);
                  } else {
                    navigate(`${process.env.PUBLIC_URL}/packages`);
                  }
                }
              }
            });
          }

          reset({
            emailAddress: "",
            password: "",
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
          password: "",
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
          <Form className="theme-form" onSubmit={handleSubmit(loginUser)}>
            <H3>{header}</H3>
            <P>{"Enter your email & password to login"}</P>
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
            <FormGroup
              style={{
                marginTop: "-20px",
              }}
            >
              <Label className="col-form-label">{Password}</Label>
              <div className="form-input position-relative">
                <input
                  className="form-control"
                  type={showPassWord ? "text" : "password"}
                  placeholder="*********"
                  required
                  {...register("password", {
                    required: true,
                    pattern: {
                      value: /^(?=.*[@|!|#|$|%|^|&|*|.|,|?||-|_])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
                      message: "Password contain special Char, Uppercase, lowercase and digit",
                    },
                  })}
                />

                <div className="show-hide">
                  <span
                    onClick={() => setShowPassWord(!showPassWord)}
                    className={!showPassWord ? "show" : ""}
                  />
                </div>
              </div>
              <span style={{ color: "red" }}>
                {errors.password && errors.password.message}
              </span>
            </FormGroup>
            <FormGroup
              className="mb-0 form-group"
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "start",
                marginTop: "-30px",
              }}
            >
              <Link
                // className="link"
                to={`${process.env.PUBLIC_URL}/forgot-password`}
              >
                Forgot Password
              </Link>
            </FormGroup>
            <div className="text-end mt-2">
              <Button
                disabled={loading}
                color="primary"
                className="btn-block w-100"
              >
                {loading ? "Loading..." : "Sign In"}
              </Button>
            </div>
            <div
              style={{
                margin: "5px 0px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Don't Have an Account? &nbsp;
              <span>
                <Link
                  // className="link"
                  to={`${process.env.PUBLIC_URL}/register`}
                >
                  Register
                </Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CommonForm;
