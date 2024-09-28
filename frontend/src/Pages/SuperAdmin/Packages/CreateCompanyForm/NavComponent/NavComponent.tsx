import { Nav, NavItem, NavLink } from "reactstrap";
import { BusinessFormCommonProps } from "../../../../../Types/Forms/FormLayout/FormWizardTypes";
import { H3, H4 } from "../../../../../AbstractElements";
import { NavData } from "./NavData";
import { useSelector } from "react-redux";

const NavComponent = ({
  callbackActive,
  activeTab,
}: BusinessFormCommonProps) => {
  const { userPersonalizationData } = useSelector(
    (state: any) => state.personalization
  );
  const handleTab = (id: number | undefined) => {
    if (id !== undefined) {
      callbackActive(id);
    }
  };
  return (
    <Nav className="nav-pills horizontal-options shipping-options">
      {NavData.map((data, index) => (
        <NavItem key={index}>
          <NavLink
            style={{
              color: "white",
              // backgroundColor: `${
              //   userPersonalizationData && activeTab === index + 1
              //     ? userPersonalizationData?.buttonsAndBarsColor
              //     : "white"
              // }`,
            }}
            className={`b-r-0 ${activeTab === index + 1 ? "active" : ""}`}
            onClick={() => handleTab(data.activeTab)}
          >
            <div
              className="horizontal-wizard"
              style={{
                color: `${
                  userPersonalizationData !== null && activeTab === index + 1
                    ? "white"
                    : "black"
                }`,
              }}
            >
              <div className="stroke-icon-wizard">
                <i
                  className={`fa ${data.iconName}`}
                  style={{
                    color: `${
                      userPersonalizationData !== null &&
                      activeTab === index + 1
                        ? "white"
                        : "black"
                    }`,
                  }}
                />
              </div>
              <div className="horizontal-wizard-content">
                <H4>{data.tittle}</H4>
              </div>
            </div>
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
};

export default NavComponent;
