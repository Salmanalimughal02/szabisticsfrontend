import CommonUL from "../CommonUL/CommonUL";
import { LI } from "../../../../../AbstractElements";
import { Badge } from "reactstrap";
import { SidebarIconProp } from "../../../../../Types/ThemeCustomizerTypes";

const FillIcon = ({ handleSideBarIconType, sideBarIconType }: SidebarIconProp) => {
  return (
    <LI data-attr="fill-svg" className={`border-0 ${sideBarIconType === "fill" ? "active" : ""}`} onClick={() => handleSideBarIconType("fill")} >
      <div className="header bg-light">
        <CommonUL />
      </div>
      <div className="body bg-light">
        <Badge color="primary">{'Fill'}</Badge>
      </div>
    </LI>
  );
};

export default FillIcon;
