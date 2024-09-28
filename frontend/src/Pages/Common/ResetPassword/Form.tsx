import { useState } from "react";
import { H3, P } from "../../../AbstractElements";
import { Button, Form, FormGroup, Label } from "reactstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { create } from "../../../Utilities/api";
import { RESET_PASSWORD } from "../../../Utilities/api/apiEndpoints";

interface PropTypes {
  password: string; // Change 'boolean' to the actual type of isVisible
  confirmpassword: string;
}

export interface CommonFormPropsType {
  alignLogo?: string;
  emailAddress?: string;
  userId?: string;
}
const CommonForm = ({
  alignLogo,
  emailAddress,
  userId,
}: CommonFormPropsType) => {
  const [showPassWord, setShowPassWord] = useState(false);
  const [showConfirmPassWord, setShowConfirmPassWord] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PropTypes>();

  const resetPassword: SubmitHandler<PropTypes> = async (data, e: any) => {
    setLoading(true);
    e.preventDefault();
    if (data.password !== "" && data.confirmpassword !== "") {
      if (data.password == data.confirmpassword) {
        var resetData = {
          userId: userId,
          updatedPassword: data.password,
          updatedConfirmPassword: data.confirmpassword,
        };

        // console.log(loginData);
        try {
          await create(resetData, {
            url: RESET_PASSWORD,
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

            reset({
              confirmpassword: "",
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
            confirmpassword: "",
            password: "",
          });
        }
      } else {
        Swal.fire({
          text: `Password Not Matched`,
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
    <div className="login-card login-dark">
      <div>
        {/* <div>
          <Logo alignLogo={alignLogo} />
        </div> */}
        <div className="login-main">
          <Form className="theme-form" onSubmit={handleSubmit(resetPassword)}>
            <H3>Reset Password</H3>
            <P>{"Enter your New Password"}</P>
            <FormGroup>
              <Label className="col-form-label">New Password</Label>
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
              style={{
                marginTop: "-20px",
              }}
            >
              <Label className="col-form-label">Confirm New Password</Label>
              <div className="form-input position-relative">
                <input
                  className="form-control"
                  type={showConfirmPassWord ? "text" : "password"}
                  placeholder="*********"
                  required
                  {...register("confirmpassword", {
                    required: true,
                    pattern: {
                      value: /^(?=.*[@])(?=.*[A])(?=.*[a])(?=.*\d).+$/,
                      message: "Password contain special Char, Uppercase, lowercase and digit",
                    },
                  })}
                />

                <div className="show-hide">
                  <span
                    onClick={() => setShowConfirmPassWord(!showConfirmPassWord)}
                    className={!showConfirmPassWord ? "show" : ""}
                  />
                </div>
              </div>
              <span style={{ color: "red" }}>
                {errors.confirmpassword && errors.confirmpassword.message}
              </span>
            </FormGroup>

            <div className="text-end mt-2">
              <Button
                disabled={loading}
                color="primary"
                className="btn-block w-100"
              >
                {loading ? "Loading..." : "Reset"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CommonForm;
