import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { Checkmeout, Email, Password, Signin } from "../../../../utils/Constant";
import { useState } from "react";
type propsType = {
  toggle: () => void;
};
const ChangePasswordForm = ({ toggle }: propsType) => {
  const [password, setPassword] = useState("");

  // Function to handle click event
  const handleClick = (event: any) => {
    event.preventDefault();
    // Extract the text content of the clicked element's child
    const clickedChildValue = event.target.firstChild.textContent;
    // Update the state with the value
    setPassword(clickedChildValue);
  };

  const handleChange = (e: any) => {
    setPassword(e.target.value);
  };
  const randomPasswordsCount = [1, 2, 3, 4, 5];
  const generateRandomPassword = (length = 24) => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specials = "!@#$%^&*()_-+=<>?/{}[]|";

    const allChars = uppercase + lowercase + numbers + specials;

    if (length < 24) {
      throw new Error("Password length must be at least 10 characters");
    }

    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      password += allChars.charAt(randomIndex);
    }

    return password;
  };
  return (
    <Form>
      <Row className="g-3">
        <Col md={12}>
          <Label htmlFor="inputPassword4">Change Password</Label>
          <Input
            id="password"
            type="text"
            placeholder="Enter Your Password"
            onChange={(e) => handleChange(e)}
            value={password}
          />
        </Col>
        <Col md={12}>
          {randomPasswordsCount.map((item, index) => {
            return (
              <span
                onClick={(e) => handleClick(e)}
                style={{
                  padding: "5px",
                  backgroundColor: "red",
                  margin: "5px",
                  color: "white",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {generateRandomPassword(24)}
              </span>
            );
          })}
        </Col>

        <Col md={12}>
          <Button
            style={{ display: "block", width: "100%", textAlign: "center" }}
            color="primary"
            type="submit"
            onClick={() => {
              toggle();
            }}
          >
            Change
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ChangePasswordForm;
