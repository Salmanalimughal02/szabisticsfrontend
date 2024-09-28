import { Nav, NavItem, NavLink } from "reactstrap";
import { BusinessFormCommonProps } from "../../../../../Types/Forms/FormLayout/FormWizardTypes";
import { H3, H4 } from "../../../../../AbstractElements";
import { NavData } from "./NavData";
import { useSelector } from "react-redux";
import {
  getUserId,
  getUserRole,
} from "../../../../../Utilities/globals/globals";

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
  const { packagee } = useSelector((state: any) => state.companies);

  return (
    <Nav className="nav-pills horizontal-options shipping-options">
      {NavData.map((data, index) => {
        // Condition to check if the title is "Feedback"
        if (
          data.tittle === "Feedback" &&
          (!packagee?.isCompleted || packagee?.isCompleted === false)
        ) {
          return null;
        }

        // Existing conditions for displaying other tabs
        if (
          packagee?.acceptedOffer !== null &&
          packagee?.paymentEvidence !== null &&
          packagee?.paymentEvidence?.status === "APPROVED" &&
          (packagee?.acceptedOffer.user === getUserId() ||
            getUserId() === packagee?.user?._id)
        ) {
          return (
            <NavItem key={index}>
              <NavLink
                style={{
                  color: "white",
                }}
                className={`b-r-0 ${activeTab === index + 1 ? "active" : ""}`}
                onClick={() => handleTab(data.activeTab)}
              >
                <div
                  className="horizontal-wizard"
                  style={{
                    color: `${activeTab === index + 1 ? "white" : "black"}`,
                  }}
                >
                  <div className="stroke-icon-wizard">
                    <i
                      className={`fa ${data.iconName}`}
                      style={{
                        color: `${activeTab === index + 1 ? "white" : "black"}`,
                      }}
                    />
                  </div>
                  <div className="horizontal-wizard-content">
                    <H4>{data.tittle}</H4>
                  </div>
                </div>
              </NavLink>
            </NavItem>
          );
        }
        return null;
      })}
    </Nav>
  );
};

export default NavComponent;
