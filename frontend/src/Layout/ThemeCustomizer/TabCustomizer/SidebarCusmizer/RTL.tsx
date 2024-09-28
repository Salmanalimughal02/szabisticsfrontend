import CommonUL from "./CommonUL/CommonUL";
import { LI, UL } from "../../../../AbstractElements";
import { Badge } from "reactstrap";
import { LtrDataType } from "../../../../Types/ThemeCustomizerTypes";

const RTL = ({ handleLayout, layout_type }: LtrDataType) => {
  return (
    <LI className={`${layout_type === "rtl" ? "active" : ""}`} onClick={() => handleLayout("rtl")}>
      <div className="header bg-light">
        <CommonUL />
      </div>
      <div className="body">
        <UL className="simple-list flex-row">
          <LI className="bg-light body">
            <Badge color="primary">{'RTL'}</Badge>
          </LI>
          <LI className="bg-light sidebar"></LI>
        </UL>
      </div>
    </LI>
  );
};

export default RTL;
