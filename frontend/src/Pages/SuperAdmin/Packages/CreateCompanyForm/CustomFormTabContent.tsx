import { TabContent, TabPane } from "reactstrap";
import { BusinessFormCommonProps } from "../../../../Types/Forms/FormLayout/FormWizardTypes";
import PackageInfoForm from "./PackageInfoForm";
import Attachements from "./Attachements";
import SuccessfullyFormSubmitted from "./SuccessfullyFormSubmitted";
import LocationsForm from "./LocationsForm";
import DimensionsForm from "./DimensionsForm";
import InstructionsForm from "./InstructionsForm";

const CustomFormTabContent = ({
  activeTab,
  callbackActive,
}: BusinessFormCommonProps) => {
  return (
    <TabContent className="dark-field" activeTab={activeTab}>
      <TabPane tabId={1}>
        <PackageInfoForm callbackActive={callbackActive} />
      </TabPane>
      <TabPane tabId={2}>
        <DimensionsForm callbackActive={callbackActive} />
      </TabPane>
      <TabPane tabId={3}>
        <LocationsForm callbackActive={callbackActive} />
        {/* <ServerCredentials callbackActive={callbackActive} /> */}
      </TabPane>
      <TabPane tabId={4}>
        <InstructionsForm callbackActive={callbackActive} />
        {/* <CRMModules callbackActive={callbackActive} /> */}
      </TabPane>
      <TabPane tabId={5}>
        <Attachements callbackActive={callbackActive} />
      </TabPane>
      <TabPane tabId={6}>
        <SuccessfullyFormSubmitted callbackActive={callbackActive} />
      </TabPane>
    </TabContent>
  );
};

export default CustomFormTabContent;
