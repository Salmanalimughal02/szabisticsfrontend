import { H6, UL } from "../../../../../AbstractElements";
import ConfigDB from "../../../../../Config/ThemeConfig";
import { useAppDispatch } from "../../../../../ReaduxToolkit/Hooks";
import { addSidebarIconType } from "../../../../../ReaduxToolkit/Reducer/ThemeCustomizerSlice";
import { Sidebar_Icon } from "../../../../../utils/Constant";
import FillIcon from "./FillIcon";
import StrokeIcon from "./StrokeIcon";

const SidebarIconType = () => {
  const dispatch = useAppDispatch();
  const sideBarIconType = ConfigDB.data.settings.sidebar.iconType;

  const handleSideBarIconType = (type: string) => {
    dispatch(addSidebarIconType(type));
  };
  return (
    <div>
      <H6>{Sidebar_Icon}</H6>
      <UL className="sidebar-type layout-grid flex-row simple-list">
        <StrokeIcon handleSideBarIconType={handleSideBarIconType} sideBarIconType={sideBarIconType}/>
        <FillIcon handleSideBarIconType={handleSideBarIconType} sideBarIconType={sideBarIconType}/>
      </UL>
    </div>
  );
};

export default SidebarIconType;
