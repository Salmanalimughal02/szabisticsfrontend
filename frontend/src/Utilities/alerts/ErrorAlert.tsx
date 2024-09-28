import { Button, Card, CardBody, Col } from "reactstrap";
import Swal from "sweetalert2";
import alertTypes from "./AlertType";
const errorAlert = (alertData:alertTypes ) => {
    // console.log("alertData: 2 ", alertData)

  return Swal.fire({
    title: alertData.title,
    text: alertData.text,
    icon: "warning",
    timer: 2000,
    showConfirmButton: false,
  });
};

export default errorAlert;
