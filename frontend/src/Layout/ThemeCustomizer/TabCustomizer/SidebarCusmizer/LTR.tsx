import { Badge } from "reactstrap";
import { LI, UL } from "../../../../AbstractElements";
import CommonUL from "./CommonUL/CommonUL";
import { LtrDataType } from "../../../../Types/ThemeCustomizerTypes";

const LTR = ({ handleLayout, layout_type }: LtrDataType) => {
  return (
    <LI
      className={`border-0 ${layout_type === "ltr" ? "active" : ""}`}
      data-attr="ltr"
      onClick={() => {
        handleLayout("ltr");
      }}
    >
      <div className="header bg-light">
        <CommonUL />
      </div>
      <div className="body">
        <UL className="simle-list flex-row">
          <LI className="bg-light sidebar"></LI>
          <LI className="bg-light body">
            <Badge color="primary">{"LTR"}</Badge>
          </LI>
        </UL>
      </div>
    </LI>
  );
};

export default LTR;
