import { Col, Media, Row } from "reactstrap";
import { WilliamJennings } from "../../utils/Constant";
import { dynamicImage } from "../../Service";
import Image from "../Media";
import H5 from "../Headings/H5Element";
import UL from "../ListGroup/UnorderedList";
import { tourProfileData } from "../../Data/BonusUi/TourData";
import LI from "../ListGroup/ListItem";
import { Link } from "react-router-dom";
type PropsType = {
  month: string;
  time: string;
  activeTime: string;
};
const CommonProfileHead = ({ month, time, activeTime }: PropsType) => {
  return (
    <Row className="g-2 align-items-center">
      <Col sm={8}>
        <div className="d-flex">
          <Image
            className="img-thumbnail rounded-circle me-3"
            src={dynamicImage("user/7.jpg")}
            alt="Generic placeholder image"
          />
          <Media body className="align-self-center">
            <H5 className="mt-0 user-name">{WilliamJennings}</H5>
            <div className="tour-wrapper">
              <span>{month}</span>
              <i className="tour-dot fa fa-circle"></i>
              <span className="txt-danger">{time}</span>
            </div>
          </Media>
        </div>
      </Col>
      <Col sm={4} className="text-end align-self-center mt-0">
        <div
          className="social-media social-tour"
          data-intro="This is your social details"
        >
          <UL className="list-inline simple-list flex-row">
            {tourProfileData.map((data,index) => (
              <LI className="list-inline-item" key={index}>
                <Link to={data.link} target="_blank">
                  <i className={data.icon}></i>
                </Link>
              </LI>
            ))}
          </UL>
          <div className="float-sm-end">
            <small>{activeTime}</small>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default CommonProfileHead;
