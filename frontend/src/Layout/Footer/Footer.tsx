import { Col, Container, Row } from "reactstrap";
import SVG from "../../utils/CommonSvgIcon/SVG";
import { P } from "../../AbstractElements";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();
  const darkFooter =
    pathname === `${process.env.PUBLIC_URL}/pagelayout/footerdark`
      ? "footer-dark"
      : "";
  const fixedFooter =
    pathname === `${process.env.PUBLIC_URL}/pagelayout/footerfixed`
      ? "footer-fix"
      : "";
  return (
    <div
    //   style={{
    //     marginLeft: "0px !important",
    //     backgroundColor: "blue",
    //   }}
    >
      <footer
        className={`footer ${darkFooter} ${fixedFooter}`}
        // style={{
        //   marginLeft: "0px !important",
        //   backgroundColor: "red",
        // }}
      >
        <Container fluid>
          <Row>
            <Col md="6" className="footer-copyright">
              <P className="mb-0">Copyright 2023 © Cion theme by pixelstrap.</P>
            </Col>
            <Col md="6">
              <P className="float-end mb-0">
                Hand crafted &amp; made with
                <SVG iconId="heart" className="footer-icon" />
              </P>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
