import { Button, Col, Container, Form, Row } from "reactstrap";
import CommonForm from "./Form";
import Szabistics from "../../../assets/Szabistics.png";
import LogisticsBackground from "../../../assets/Logistics-background.png";
import { useEffect, useState } from "react";

const LoginForm = () => {
  return (
    <Container fluid>
      <Row
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
          <CommonForm alignLogo="text-start" />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
