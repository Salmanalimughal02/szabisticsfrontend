import { Col, Container, Row } from "reactstrap";
import CommonForm from "./Form";
import Szabistics from "../../../assets/Szabistics.png";
import { useLocation } from "react-router-dom";
import LogisticsBackground from "../../../assets/Logistics-background.png";

const ResetPassword = () => {
  const location = useLocation();
  console.log(location.state);

  return (
    <Container fluid>
      <Row
        // style={{
        //   backgroundImage: `linear-gradient(to right, #ffffff, #167a93)`,
        // }}

        style={{
          backgroundImage: `url(${LogisticsBackground})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Col
          xl={5}
          className="b-center bg-size p-0"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // height:"50vh"
          }}
        >
          <div
            style={{
              width: "80%",
              fontWeight: "bold",
              fontSize: "40px",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "black",
            }}
            className="lilita-one-regular"
          >
            Szabistics
          </div>
          <img
            src={Szabistics}
            alt=""
            style={{
              width: "400px",
              height: "300px",
            }}
          />
        </Col>
        <Col xl={7} className="p-0">
          <CommonForm
            alignLogo="text-start"
            emailAddress={location.state.emailAddress}
            userId={location.state.userId}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
