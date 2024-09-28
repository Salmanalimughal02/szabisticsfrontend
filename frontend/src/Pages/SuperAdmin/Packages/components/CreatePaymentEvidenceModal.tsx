import {
  Button,
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import { useState } from "react";
import Swal from "sweetalert2";
import { create, getAll } from "../../../../Utilities/api";
import {
  GET_ALL_PACKAGES,
  SUBMIT_PAYMENT_EVIDENCE,
} from "../../../../Utilities/api/apiEndpoints";
import { H3 } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
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

const CreatePaymentEvidence = ({ isVisible, setIsVisible, id }: propsType) => {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");
  const dispatch = useDispatch();

  const addToggle = () => {
    if (!loading) {
      setIsVisible(!isVisible);
    }
  };

  const handleImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64String = e.target.result;
        setSelectedImage(base64String);
        console.log("Selected Image Base64:", selectedImage);
      };
      reader.readAsDataURL(event.target.files[0]); // This should include the correct MIME type
    }
  };

  const addPaymentEvidence = (e: any) => {
    e.preventDefault();
    if (selectedImage) {
      setLoading(true);

      const formData = {
        transactionId: transactionId,
        evidenceAttachmentBase64: selectedImage,
      };
      create(formData, {
        url: `${SUBMIT_PAYMENT_EVIDENCE}/${id}`,
      })
        .then((data: any) => {
          if (data?.success) {
            setLoading(false);
            setSelectedImage("");

            Swal.fire({
              text: `${data.message}`,
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
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
          } else {
            Swal.fire({
              text: `${data.message}`,
              icon: "error",
              timer: 2000,
              showConfirmButton: false,
            });
            setLoading(false);
          }
        })
        .catch((err: any) => {
          setLoading(false);
        });
    } else {
      Swal.fire({
        text: `Please Select an Image`,
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
          <H3 className="modal-title">Create Payment Evidence</H3>
          <Button
            color="transparent"
            className="btn-close"
            onClick={addToggle}
          ></Button>
        </div>
        <ModalBody>
          <Form>
            <Row className="g-3">
              <Col md={12}>
                <Label htmlFor="inputPassword4">Transaction Id</Label>
                <Input
                  id="password"
                  type="text"
                  placeholder="Enter transaction Id"
                  onChange={(e) => setTransactionId(e.target.value)}
                  value={transactionId}
                />
              </Col>
              <Col md={12}>
                <Label htmlFor="inputPassword4">Select Image</Label>

                <div className="col-auto position-relative">
                  <img
                    width="100%"
                    height="200px"
                    alt="edit-user"
                    style={{
                      border: "1px solid gray",
                      borderRadius: "10px",
                      marginBottom: "10px",
                    }}
                    src={
                      selectedImage ? selectedImage : dynamicImage("user/7.jpg")
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
                      backgroundColor: "white",
                      borderRadius: "100px",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    {selectedImage !== "" ? "Image Selected" : "Select Image"}
                  </label>
                </div>
              </Col>

              <Col md={12}>
                <Button
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                  }}
                  color="primary"
                  type="submit"
                  onClick={addPaymentEvidence}
                >
                  {loading ? "Loading..." : "Create Payment Evidence"}
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CreatePaymentEvidence;
