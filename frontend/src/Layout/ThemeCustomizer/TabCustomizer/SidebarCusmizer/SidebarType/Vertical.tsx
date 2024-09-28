import { LI, UL } from "../../../../../AbstractElements";
import { SidebarTypeProp } from "../../../../../Types/ThemeCustomizerTypes";
import CommonUL from "../CommonUL/CommonUL";

const Vertical = ({ handleSidebarType, layout }: SidebarTypeProp) => {
  return (
    <LI data-attr="normal-sidebar" className={`border-0 ${layout === "horizontal-wrapper" ? "active" : ""}`} onClick={() => handleSidebarType("horizontal-wrapper")} >
      <div className="header bg-light">
        <CommonUL />
      </div>
      <div className="body">
        <UL className="simple-list">
          <LI className="bg-dark sidebar"></LI>
          <LI className="bg-light body"></LI>
        </UL>
      </div>
    </LI>
  );
};

export default Vertical;
