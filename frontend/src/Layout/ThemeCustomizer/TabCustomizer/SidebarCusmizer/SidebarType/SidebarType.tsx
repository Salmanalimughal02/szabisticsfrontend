import { H6, UL } from "../../../../../AbstractElements";
import { useAppDispatch, useAppSelector } from "../../../../../ReaduxToolkit/Hooks";
import { addSidebarLayouts } from "../../../../../ReaduxToolkit/Reducer/ThemeCustomizerSlice";
import { Sidebar_Type } from "../../../../../utils/Constant";
import Horizontal from "./Horizontal";
import Vertical from "./Vertical";

const SidebarType = () => {
  const dispatch = useAppDispatch();
  const { layout } = useAppSelector((state) => state.themeCustomizer);

  const handleSidebarType = (type: string) => {
    dispatch(addSidebarLayouts(type));
  };
  return (
    <div>
      <H6>{Sidebar_Type}</H6>
      <UL className="sidebar-type layout-grid simple-list flex-row">
        <Vertical handleSidebarType={handleSidebarType} layout={layout}/>
        <Horizontal handleSidebarType={handleSidebarType} layout={layout}  />
      </UL>
    </div>
  );
};

export default SidebarType;
