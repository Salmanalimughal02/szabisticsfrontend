import { Badge } from "reactstrap";
import { LI } from "../../../../../AbstractElements";
import CommonUL from "../CommonUL/CommonUL";
import { SidebarIconProp } from "../../../../../Types/ThemeCustomizerTypes";

const StrokeIcon = ({ handleSideBarIconType, sideBarIconType }: SidebarIconProp) => {
  return (
    <LI data-attr="stroke-svg" className={`normal-sidebar border-0 ${sideBarIconType === "stroke" ? "active" : ""}`} onClick={() => handleSideBarIconType("stroke")}>
      <div className="header bg-light">
        <CommonUL />
      </div>
      <div className="body bg-light">
        <Badge color="primary">{'Stroke'}</Badge>
      </div>
    </LI>
  );
};

export default StrokeIcon;
