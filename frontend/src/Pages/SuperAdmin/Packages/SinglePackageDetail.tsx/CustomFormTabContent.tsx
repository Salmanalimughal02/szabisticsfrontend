import { TabContent, TabPane } from "reactstrap";
import { BusinessFormCommonProps } from "../../../../Types/Forms/FormLayout/FormWizardTypes";
import SinglePackageDetail from "./SinglePackageDetail";
import Reviews from "./Reviews";
import Milestones from "./Milestones";
import { useSelector } from "react-redux";
import Conversations from "./Conversations";

const CustomFormTabContent = ({
  activeTab,
  callbackActive,
}: BusinessFormCommonProps) => {
  return (
    <TabContent className="dark-field" activeTab={activeTab}>
      <TabPane tabId={1}>
        <SinglePackageDetail callbackActive={callbackActive} />
      </TabPane>
      <TabPane tabId={2}>
        <Milestones />
      </TabPane>
      <TabPane tabId={3}>
        <Reviews />
        {/* <ServerCredentials callbackActive={callbackActive} /> */}
      </TabPane>
      <TabPane tabId={4}>
        <Conversations />
        {/* <ServerCredentials callbackActive={callbackActive} /> */}
      </TabPane>
    </TabContent>
  );
};

export default CustomFormTabContent;
