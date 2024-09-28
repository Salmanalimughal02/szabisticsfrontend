import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import { H4, P } from "../../../../../AbstractElements";
import { useDispatch, useSelector } from "react-redux";
import { getAll, update } from "../../../../../Utilities/api";
import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import { setUserData } from "../../../../../ReaduxToolkit/Reducer/UserSlice";
import {
  GET_PROFILE,
  UPDATE_PROFILE,
} from "../../../../../Utilities/api/apiEndpoints";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const EditProfileForm = () => {
  const { userData } = useSelector((state: any) => state.user);
  const [firstName, setFirstName] = useState<string>(userData.firstName);
  const [lastName, setLastName] = useState<string>(userData.lastName);
  const [emailAddress, setEmailAddress] = useState<string>(
    userData.emailAddress
  );
  const [phoneNo, setPhoneNo] = useState<string>(userData.phoneNo);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const phoneInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const inputElement = document.querySelector(".custom-phone-input input");
    if (inputElement) {
      inputElement.setAttribute("maxLength", "10"); // Adjust the length as needed
    }
  }, []);

  const editUserProfile = (e: any) => {
    e.preventDefault();
    if (isEdit) {
      if (
        emailAddress.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ) {
        setLoading(true);
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("phoneNo", phoneNo);
        formData.append("emailAddress", emailAddress);

        update(formData, {
          url: UPDATE_PROFILE,
        })
          .then((data: any) => {
            if (data !== undefined) {
              if (!data.success) {
                Swal.fire({
                  text: `${data.message}`,
                  icon: "error",
                  timer: 2000,
                  showConfirmButton: false,
                });
                setLoading(false);
                setIsEdit(!isEdit);
              }
              if (data.success) {
                setLoading(false);
                setIsEdit(!isEdit);
                Swal.fire({
                  text: `${data.message}`,
                  icon: "success",
                  timer: 2000,
                  showConfirmButton: false,
                });
                getAll({
                  url: GET_PROFILE,
                }).then((parentData: any) => {
                  if (parentData !== undefined) {
                    if (parentData.success) {
                      dispatch(setUserData(parentData.data));
                    } else {
                      dispatch(setUserData(null));
                    }
                  }
                });
              }
            }
          })
          .catch((err: any) => {
            setLoading(false);
            setIsEdit(!isEdit);
          });
      } else {
        Swal.fire({
          text: `Invalid email address`,
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    }
  };

  return (
    <Col xl={8}>
      <Form className="card" onSubmit={editUserProfile}>
        <CardHeader className="pb-0">
          <H4>Edit Profile</H4>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md={12}>
              <FormGroup>
                <P>First Name</P>
                <Input
                  type="text"
                  placeholder="Enter First Name"
                  disabled={!isEdit}
                  defaultValue={firstName}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <P>Last Name</P>
                <Input
                  type="text"
                  placeholder="Enter Last Name"
                  disabled={!isEdit}
                  defaultValue={lastName}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={12} style={{ width: "100%" }}>
              <FormGroup style={{ width: "100%" }}>
                <P>Phone Number</P>
                <div
                  style={{
                    border: "1px solid lightgray",
                    paddingLeft: "8px",
                    paddingTop:"8px",
                    height:"38px",
                    borderRadius: "5px",
                  }}
                >
                  <PhoneInput
                    placeholder="Enter phone number"
                    defaultCountry="PK" 
                    value={phoneNo}
                    onChange={(value) => setPhoneNo(value || "")}
                    className="custom-phone-input"
                    disabled={!isEdit}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <P>Email Address</P>
                <Input
                  type="text"
                  placeholder="Enter Email Address"
                  disabled={!isEdit}
                  defaultValue={emailAddress}
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
        <CardFooter className="text-end">
          {isEdit && (
            <Button
              style={{ marginRight: "15px" }}
              color="primary"
              type="submit"
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                setIsEdit(!isEdit);
              }}
            >
              Cancel
            </Button>
          )}

          <Button
            color="primary"
            type="submit"
            disabled={loading}
            onClick={(e) => {
              if (!isEdit) {
                e.preventDefault();
                setIsEdit(!isEdit);
              }
            }}
          >
            {loading ? "Loading..." : isEdit ? "Save" : "Edit"}
          </Button>
        </CardFooter>
      </Form>
    </Col>
  );
};

export default EditProfileForm;
