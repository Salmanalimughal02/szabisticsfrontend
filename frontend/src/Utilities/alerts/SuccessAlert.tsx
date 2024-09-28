import { Button, Card, CardBody, Col } from "reactstrap";
import Swal from "sweetalert2";

const successAlert = () => {
  return Swal.fire({
    title: "Successful",
    text: "login Successful",
    icon: "success",
    timer: 3000,
    showConfirmButton: false,
  });
};

export default successAlert;
