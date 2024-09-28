import { Col, Nav, NavItem, NavLink, Row } from "reactstrap";
import { Target } from "react-feather";
import { all } from "../../../utils/Constant";
import { useAppDispatch, useAppSelector } from "../../../ReaduxToolkit/Hooks";
import { useSelector } from "react-redux";
import CreateNewPackage from "./CreateNewPackages";
import { getUserRole } from "../../../Utilities/globals/globals";
const PackagesListNav = () => {
  const dispatch = useAppDispatch();
  var tempList: any = [];
  const { filterCompanies } = useSelector((state: any) => state.companies);
  return (
    <Row>
      <Col md={6}>
        <Nav tabs className="border-tab">
          <NavItem style={{ cursor: "pointer" }}>
            <NavLink
              className="active"
              onClick={() => {
                // // console.log(filterCompanies);
              }}
            >
              <Target />
              {all}
            </NavLink>
          </NavItem>
        </Nav>
      </Col>
      {getUserRole() === "OWNER" && <CreateNewPackage />}
    </Row>
  );
};

export default PackagesListNav;
