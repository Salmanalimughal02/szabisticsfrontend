import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Col, Row } from "reactstrap";
import SVG from "../../utils/CommonSvgIcon/SVG";
import H3 from "../Headings/H3Element";
import { useSelector } from "react-redux";
export interface propsTypes {
  mainTitle: string;
  parent: string;
  title: string;
}
const Breadcrumbs = ({ mainTitle, parent, title }: propsTypes) => {
  const { userPersonalizationData } = useSelector(
    (state: any) => state.personalization
  );
  const getBeforeStyles = () => {
    return {
      content: "/",
      width: "2px",
      backgroundColor:
        userPersonalizationData !== null &&
          userPersonalizationData?.buttonsAndBarsColor !== ""
          ? userPersonalizationData?.buttonsAndBarsColor
          : "#33BFBF",
    };
  };

  return (
    <Col xs="12">
      <div className="page-title">
        <Row>
          <Col sm="6" className="ps-0">
            <H3>{mainTitle}</H3>
          </Col>
          <Col sm="6" className="pe-0">
            <Breadcrumb>
              <BreadcrumbItem>
                {/* <Link to={`${process.env.PUBLIC_URL}/dashboards/shoppingplace`}> */}
                <Link to="#">
                  <SVG
                    iconId="stroke-home"
                    className="personalization"
                    color={`${userPersonalizationData !== null &&
                        userPersonalizationData?.buttonsAndBarsColor !== ""
                        ? userPersonalizationData?.buttonsAndBarsColor
                        : "#35bfbf"
                      }`}
                  />
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem
                style={{
                  fontWeight: "500",
                  color: `${userPersonalizationData !== null &&
                      userPersonalizationData?.buttonsAndBarsColor !== null
                      ? `${userPersonalizationData?.buttonsAndBarsColor}`
                      : "#33BFBF"
                    }`,
                }}
              >
                {/* Render the ::before pseudo-element inline */}
                {/* <span style={getBeforeStyles()}></span> */}
                {parent}
              </BreadcrumbItem>
              {/* <BreadcrumbItem>{parent}</BreadcrumbItem> */}
              {/* <BreadcrumbItem className="active">{title}</BreadcrumbItem> */}
              <BreadcrumbItem
                style={{
                  fontWeight: "normal",
                  color: `${userPersonalizationData !== null &&
                      userPersonalizationData?.buttonsAndBarsColor !== null
                      ? `${userPersonalizationData?.buttonsAndBarsColor}`
                      : "#33BFBF"
                    }`,
                }}
              >
                {/* Render the ::before pseudo-element inline */}
                {/* <span style={getBeforeStyles()}></span> */}
                {title}
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default Breadcrumbs;
