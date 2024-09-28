import { TabContent, TabPane } from "reactstrap";
import { TabCustomizerType } from "../../../Types/ThemeCustomizerTypes";
import TabHeader from "./TabHeader";
import SidebarCusmizer from "./SidebarCusmizer/SidebarCusmizer";

const TabCustomizer = ({ callbackNav, selected }: TabCustomizerType) => {
  return (
    <TabContent activeTab={selected}>
      <TabHeader callbackNav={callbackNav} />
      <div className="customizer-body custom-scrollbar">
        <TabPane tabId="sidebar-type">
          <SidebarCusmizer />
        </TabPane>
      </div>
    </TabContent>
  );
};

export default TabCustomizer;
