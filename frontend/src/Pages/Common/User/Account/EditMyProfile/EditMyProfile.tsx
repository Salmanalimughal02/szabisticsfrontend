import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Row,
} from "reactstrap";

import { H5, Image, P, H4 } from "../../../../../AbstractElements";
import { dynamicImage } from "../../../../../Service";
import { useDispatch, useSelector } from "react-redux";
import { formatUnderscoredString } from "../../../../../Utilities/globals/globals";
import { useState } from "react";
import ChangePasswordModal from "../../../ChangeNewPasswordModal/ChangePasswordModal";
import { getAll, patch } from "../../../../../Utilities/api";
import Swal from "sweetalert2";
import { setUserData } from "../../../../../ReaduxToolkit/Reducer/UserSlice";
import {
  GET_PROFILE,
  UPDATE_PROFILE_IMAGE,
} from "../../../../../Utilities/api/apiEndpoints";

const EditMyProfile = () => {
  const { userData } = useSelector((state: any) => state.user);

  const [isValidatedPassword, setIsvalidtedpasswoird] = useState(false);

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const editUserProfileImage = (e: any) => {
    e.preventDefault();
    if (selectedImage !== null) {
      setLoading(true);

      const formData = {
        imageBase64: selectedImage,
      };

      patch(formData, {
        url: UPDATE_PROFILE_IMAGE,
      })
        .then((data: any) => {
          // // console.log("api call --- >", data);
          if (data !== undefined) {
            if (!data.success) {
              Swal.fire({
                text: `${data.message}`,
                icon: "error",
                timer: 2000,
                showConfirmButton: false,
              });
              setLoading(false);
            }
            if (data.success) {
              setLoading(false);
              setSelectedImage(null);

              Swal.fire({
                text: `${data.message}`,
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
              });
              getAll({
                url: GET_PROFILE,
              }).then((parentData: any) => {
                console.log(parentData);
                if (parentData !== undefined) {
                  if (parentData.success) {
                    dispatch(setUserData(parentData.data));
                    // navigate(`${process.env.PUBLIC_URL}/dashboard`);
                  } else {
                    dispatch(setUserData(null));
                  }
                }
              });
            }
          }
        })
        .catch((err: any) => {
          // // console.log("catch data", err);
          setLoading(false);
        });
    } else {
      Swal.fire({
        text: `Please Select the Image`,
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <Col xl={4}>
      <Card>
        <CardHeader className="pb-0">
          <H4 className="card-title mb-0">My Profile</H4>
        </CardHeader>
        <CardBody>
          <Form onSubmit={(event) => event.preventDefault()}>
            <Row className="mb-3">
              <div className="col-auto position-relative">
                <Image
                  width={70}
                  height={70}
                  className="img-70 rounded-circle"
                  alt="edit-user"
                  style={{
                    border: "1px solid gray",
                  }}
                  src={
                    selectedImage
                      ? selectedImage
                      : userData?.profileImage?.url
                      ? userData.profileImage.url
                      : dynamicImage("user/7.jpg")
                  }
                />
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="imageUpload"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    backgroundColor: "white",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <span style={{ fontSize: "18px", lineHeight: 1 }}>+</span>
                </label>
              </div>
              <Col>
                <H5 className="mb-1">
                  {userData.firstName} {userData.lastName}
                </H5>
                <P className="mb-4">
                  {formatUnderscoredString(
                    userData.role == "DRIVER" ? "LOGISTIC" : "USER"
                  )}
                </P>
              </Col>
              <div className="form-footer">
                <Button
                  color="primary"
                  className="d-block"
                  onClick={(e) => editUserProfileImage(e)}
                >
                  {loading ? "Loading..." : "Update profile Pic"}
                </Button>
              </div>
            </Row>

            <FormGroup>
              <H5 className="mb-1">Email Address</H5>
              <P>{userData.emailAddress}</P>
            </FormGroup>
            <FormGroup>
              <H5 className="mb-1">Phone Number</H5>
              <P>{userData.phoneNo}</P>
            </FormGroup>

            <div className="form-footer">
              <Button
                color="primary"
                className="d-block"
                onClick={() => toggle()}
              >
                Change Password
              </Button>
            </div>
          </Form>

          <ChangePasswordModal
            toggle={toggle}
            isVisible={modal}
            setIsVisible={setModal}
            isValidatedPassword={isValidatedPassword}
            setIsvalidtedpasswoird={setIsvalidtedpasswoird}
          />
        </CardBody>
      </Card>
    </Col>
  );
};

export default EditMyProfile;
