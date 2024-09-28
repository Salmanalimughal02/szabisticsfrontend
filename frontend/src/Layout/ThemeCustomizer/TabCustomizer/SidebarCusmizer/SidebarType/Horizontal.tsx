import { LI, UL } from "../../../../../AbstractElements";
import { SidebarTypeProp } from "../../../../../Types/ThemeCustomizerTypes";
import CommonUL from "../CommonUL/CommonUL";

const Horizontal = ({ handleSidebarType, layout }: SidebarTypeProp) => {
  return (
    <LI
      data-attr="compact-sidebar"
      className={`border-0 ${layout === "material-icon" ? "active" : ""}`} onClick={() => handleSidebarType("material-icon")}
    >
      <div className="header bg-light">
        <CommonUL />
      </div>
      <div className="body">
        <UL className="flex-row">
          <LI className="bg-dark sidebar compact"></LI>
          <LI className="bg-light body"></LI>
        </UL>
      </div>
    </LI>
  );
};

export default Horizontal;
