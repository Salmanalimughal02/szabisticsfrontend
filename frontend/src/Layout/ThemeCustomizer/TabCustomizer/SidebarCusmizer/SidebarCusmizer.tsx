import ColorComponent from "./ColorComponent/ColorComponent";
import LayoutType from "./LayoutType";
import MixLayoutComponent from "./MixLayoutComponent/MixLayoutComponent";
import SidebarIconType from "./SidebarIconType/SidebarIconType";
import SidebarType from "./SidebarType/SidebarType";

const SidebarCusmizer = () => {
  return (
    <>
      <LayoutType />
      <SidebarType />
      <SidebarIconType />
      <ColorComponent />
      <MixLayoutComponent />
    </>
  );
};

export default SidebarCusmizer;
