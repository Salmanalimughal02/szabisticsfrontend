import { useEffect, useRef, useState } from "react";
import { H3, P } from "../../../AbstractElements";
import { Button, Col, Form, FormGroup, Label, Row } from "reactstrap";
import { EmailAddress, Password } from "../../../utils/Constant";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { create, getAll } from "../../../Utilities/api";

import { Select } from "antd";
import "./register.css";
import {
  REGISTER,
  SEND_VERIFICATION_OTP,
} from "../../../Utilities/api/apiEndpoints";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

interface PropTypes {
  firstName: string;
  lastName: string;
  username: string;
  phoneNo: string;
  emailAddress: string; // Change 'boolean' to the actual type of isVisible
  password: string;
  confirmPassword: string;
}

export interface CommonFormPropsType {
  alignLogo?: string;
}
const CommonForm = ({ alignLogo }: CommonFormPropsType) => {
  const [showPassWord, setShowPassWord] = useState(false);
  const [showConfirmPassWord, setShowConfirmPassWord] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    // setValue, // To programmatically set the value in react-hook-form
  } = useForm<PropTypes>();

  const [phoneNo, setPhoneNo] = useState("");

  const registerUser: SubmitHandler<PropTypes> = async (data, e: any) => {
    e.preventDefault();
    if (
      data.emailAddress !== "" &&
      data.password !== "" &&
      data.confirmPassword !== "" &&
      data.firstName !== "" &&
      data.lastName !== "" &&
      role
    ) {
      var registerData: any;
      if (role == "DRIVER") {
        registerData = {
          emailAddress: data.emailAddress,
          password: data.password,
          phoneNo: phoneNo,
          firstName: data.firstName,
          lastName: data.lastName,
          role: role,
          country: country,
          isCnicImageSelected: true,
          cnicImageBase64: cnicImageBase64,
        };
      } else {
        registerData = {
          emailAddress: data.emailAddress,
          password: data.password,
          phoneNo: phoneNo,
          firstName: data.firstName,
          lastName: data.lastName,
          role: role,
          country: country,
          isCnicImageSelected: false,
        };
      }

      setLoading(true);
      // console.log(loginData);
      try {
        await create(registerData, {
          url: REGISTER,
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
              text: `${data.message}. Wait For OTP Verification`,
              icon: "success",
              showConfirmButton: false,
            });
            if (data?.data?.isVerified) {
              navigate(`${process.env.PUBLIC_URL}/login`);
            } else {
              create(
                { emailAddress: registerData.emailAddress },
                {
                  url: SEND_VERIFICATION_OTP,
                }
              ).then(async (data: any) => {
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
                        emailAddress: registerData.emailAddress,
                      },
                    }
                  );
                }
              });
            }
          }

          reset({
            emailAddress: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNo: "",
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
          firstName: "",
          lastName: "",
          phoneNo: "",
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

  const [countries, setCountries]: any = useState([]);
  const [country, setCountry]: any = useState("");

  useEffect(() => {
    getAll({
      url: `https://restcountries.com/v3.1/all`,
    }).then((data: any) => {
      // console.log("api call --- >", data);
      if (data !== undefined) {
        // console.log("hhg");
        setCountries([...data.map((item: any) => item.name.common)]);
        console.log(
          "countries",
          data.map((item: any) => item.name?.common)
        );
      }
    });
  }, []);

  useEffect(() => {
    const inputElement = document.querySelector(".custom-phone-input input");
    if (inputElement) {
      inputElement.setAttribute("maxLength", "10"); // Adjust the length as needed
    }
  }, []);

  const rolesList = [
    { label: "Logistic", value: "DRIVER" },
    { label: "User", value: "OWNER" },
  ];
  const [role, setRole] = useState("");

  const [isDriver, setIsDriver] = useState(false);
  const [cnicImageText, setCnicImageText] = useState("Select ID Image");
  const [cnicImageBase64, setCnicImageBase64] = useState("");

  const handleCnicImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setCnicImageText("Image Uploaded");
      convertToBase64(file, setCnicImageBase64);
    }
  };

  const convertToBase64 = (file: any, setBase64: any) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="login-card login-dark"
      // style={{
      //   padding: "10px",
      // }}
    >
      <div>
        {/* <div>
          <Logo alignLogo={alignLogo} />
        </div> */}
        <div
          className="login-main"
          style={{
            width: "550px",
            padding: "20px",
          }}
        >
          <Form className="theme-form" onSubmit={handleSubmit(registerUser)}>
            <H3>Sign Up</H3>
            <P>{"Enter your email & password to Sign Up"}</P>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label className="col-form-label">First Name</Label>
                  <input
                    className="form-control"
                    style={{
                      backgroundColor: "white",
                    }}
                    type="text"
                    required
                    placeholder="First Name"
                    {...register("firstName", { required: true })}
                  />

                  <span style={{ color: "red" }}>
                    {errors.firstName && "First Name is required"}
                  </span>
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label className="col-form-label">Last Name</Label>
                  <input
                    className="form-control"
                    type="text"
                    style={{
                      backgroundColor: "white",
                    }}
                    required
                    placeholder="Last Name"
                    {...register("lastName", { required: true })}
                  />

                  <span style={{ color: "red" }}>
                    {errors.lastName && "Last Name is required"}
                  </span>
                </FormGroup>
              </Col>
            </Row>
            <Row
              style={{
                marginTop: "-30px",
              }}
            >
              <Col md={6}>
                <FormGroup>
                  <Label className="col-form-label">{EmailAddress}</Label>
                  <input
                    className="form-control"
                    type="email"
                    style={{
                      backgroundColor: "white",
                    }}
                    required
                    placeholder="Test@gmail.com"
                    {...register("emailAddress", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                      },
                    })}
                  />

                  <span style={{ color: "red" }}>
                    {errors.emailAddress && errors.emailAddress.message}
                  </span>
                </FormGroup>
              </Col>
              <Col md={6}>
                <Label className="col-form-label">Select Country</Label>
                <Select
                  showSearch
                  style={{
                    width: "100%",
                    height: 45,
                    outline: "none !important",
                    boxShadow: "none !important",
                  }}
                  placeholder="Select Country"
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA: any, optionB: any) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  onChange={(e) => {
                    setCountry(e);
                  }}
                  options={[
                    ...countries.map((item: any) => {
                      return {
                        label: item,
                        value: item,
                      };
                    }),
                  ]}
                />
              </Col>
            </Row>
            <Row
              style={{
                marginTop: "-30px",
              }}
            >
              <Col md={6}>
                <FormGroup>
                  <Label className="col-form-label">{Password}</Label>
                  <div className="form-input position-relative">
                    <input
                      className="form-control"
                      type={showPassWord ? "text" : "password"}
                      placeholder="*********"
                      style={{
                        backgroundColor: "white",
                      }}
                      required
                      {...register("password", {
                        required: true,
                        pattern: {
                          value: /^(?=.*[@|!|#|$|%|^|&|*|.|,|?||-|_])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
                          message:
                            "Password contain special Char, Uppercase, lowercase and digit",
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
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label className="col-form-label">Confirm {Password}</Label>
                  <div className="form-input position-relative">
                    <input
                      className="form-control"
                      type={showConfirmPassWord ? "text" : "password"}
                      placeholder="*********"
                      style={{
                        backgroundColor: "white",
                      }}
                      required
                      {...register("confirmPassword", {
                        required: true,
                        pattern: {
                          value: /^(?=.*[@|!|#|$|%|^|&|*|.|,|?||-|_])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
                          message:
                            "Password contain special Char, Uppercase, lowercase and digit",
                        },
                      })}
                    />

                    <div className="show-hide">
                      <span
                        onClick={() =>
                          setShowConfirmPassWord(!showConfirmPassWord)
                        }
                        className={!showConfirmPassWord ? "show" : ""}
                      />
                    </div>
                  </div>
                  <span style={{ color: "red" }}>
                    {errors.confirmPassword && errors.confirmPassword.message}
                  </span>
                </FormGroup>
              </Col>
            </Row>

            <Row
              style={{
                marginTop: "-30px",
              }}
            >
              <Col md={6}>
                <FormGroup>
                  <Label className="col-form-label">Phone Number</Label>
                  <div
                    style={{
                      border: "1px solid lightgray",
                      padding: "0px 8px",
                      // height:"px50",
                      borderRadius: "5px",
                    }}
                  >
                    <PhoneInput
                      placeholder="Enter phone number"
                      value={phoneNo}
                      onChange={(value) => setPhoneNo(value || "")}
                      className="custom-phone-input"
                    />
                  </div>
                  {/* <input
                    id="phoneNo"
                    className="form-control"
                    type="tel"
                    required
                    placeholder="Phone Number"
                    {...register("phoneNo", { required: true })}
                  />
                  <span style={{ color: "red" }}>
                    {errors.phoneNo && "Phone Number is required"}
                  </span> */}
                </FormGroup>
              </Col>
              <Col md={6}>
                <Label className="col-form-label">Select Role</Label>
                <Select
                  showSearch
                  style={{
                    width: "100%",
                    height: 45,
                    outline: "none !important",
                    boxShadow: "none !important",
                  }}
                  placeholder="Select Role"
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA: any, optionB: any) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  onChange={(e) => {
                    setRole(e);
                    if (e == "DRIVER") {
                      setIsDriver(true);
                    } else {
                      setIsDriver(false);
                    }
                    // console.log(e);
                    // dispatch(setCountryId(e));
                  }}
                  options={rolesList}
                />
              </Col>
            </Row>

            <Row
              style={{
                marginTop: "-10px",
              }}
            >
              {isDriver && (
                <Col md={12}>
                  <FormGroup>
                    <div
                      className="custom-file-upload"
                      onClick={() =>
                        document.getElementById("cnicImageInput")?.click()
                      }
                    >
                      {cnicImageText}
                    </div>
                    <input
                      id="cnicImageInput"
                      className="form-control"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleCnicImageChange}
                      required
                    />
                  </FormGroup>
                </Col>
              )}
            </Row>

            <div className="text-end mt-3">
              <Button
                disabled={loading}
                color="primary"
                className="btn-block w-100"
                style={{
                  height: "45px",
                }}
              >
                {loading ? "Loading..." : "Sign Up"}
              </Button>
            </div>
          </Form>

          <div
            style={{
              margin: "5px 0px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Already Have an Account? &nbsp;
            <span>
              <Link
                // className="link"
                to={`${process.env.PUBLIC_URL}/login`}
              >
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonForm;
