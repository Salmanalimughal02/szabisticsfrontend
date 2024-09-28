import { Provider, useDispatch, useSelector } from "react-redux";
import Routers from "./Routes";
import Store from "./ReaduxToolkit/Store";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { getAll } from "./Utilities/api";

import { setUserData } from "./ReaduxToolkit/Reducer/UserSlice";
import { Button, Col, Form, Row } from "reactstrap";
import { H5 } from "./AbstractElements";

const App = () => {
  const { userPermissions } = useSelector(
    (state: any) => state.userPermissions
  );
  const dispatch = useDispatch();
  const [isOpenAboutUsPopupOpen, setIsAboutUsPopupOpen] = useState(false);

  useEffect(() => {
    getAll({
      url: "http://localhost:8080/api/v1/user/get-profile",
    }).then((parentData: any) => {
      // console.log(parentData);
      if (parentData !== undefined) {
        if (parentData.success) {
          dispatch(setUserData(parentData.data));
          // navigate(`${process.env.PUBLIC_URL}/dashboard`);
        } else {
          dispatch(setUserData(null));
        }
      }
    });
  });

  useEffect(() => {
    const hasViewedPopup = localStorage.getItem("hasViewedAboutUsPopup");

    if (!hasViewedPopup) {
      setIsAboutUsPopupOpen(true);
      // localStorage.setItem("hasViewedAboutUsPopupForLogin", "true");
    }
  }, []);

  return (
    <>
      <Provider store={Store}>
        <Routers />
        <ToastContainer />
        {isOpenAboutUsPopupOpen && (
          <div
            style={{
              position: "fixed",
              bottom: "0",
              width: "99%",
              padding: "20px",
              backgroundColor: "white",
              margin: "5px",
              right: "10px",
              left: "10px",
              borderRadius: "5px",
              border: "1px solid black",
            }}
          >
            <Form>
              <Row className="g-3">
                <>
                  <Col md={11}>
                    <H5>
                      We are proud partners with Royal Cubics <br />
                      {/* <a href="www.royalcubics.com"> www.royalcubics.com </a> */}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={"www.royalcubics.com"}
                        style={{ color: "blue", textDecoration: "underline" }}
                      >
                        {"www.royalcubics.com"}
                      </a>
                      <br />
                      St.Petersburg Florida
                    </H5>
                  </Col>
                  <Col md={1}>
                    <Button
                      color="transprant"
                      className="btn-close"
                      onClick={() => {
                        localStorage.setItem("hasViewedAboutUsPopup", "true");
                        setIsAboutUsPopupOpen(false);
                      }}
                    ></Button>
                  </Col>
                </>

                {/* <Col md={12}>
                  <Button
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "center",
                    }}
                    color="primary"
                    type="submit"
                    onClick={(e) => {}}
                  >
                    Ok
                  </Button>
                </Col> */}
              </Row>
            </Form>
          </div>
        )}
      </Provider>
    </>
  );
};

export default App;
// setting up production environment
