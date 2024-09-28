import CommonUL from "./CommonUL/CommonUL";
import { LI, UL } from "../../../../AbstractElements";
import { Badge } from "reactstrap";
import { LtrDataType } from "../../../../Types/ThemeCustomizerTypes";

const BoxLayout = ({ handleLayout, layout_type }: LtrDataType) => {
  return (
    <LI
      className={`${layout_type === "box-layout" ? "active" : ""}`}
      data-attr="box"
      onClick={() => handleLayout("box-layout")}
    >
      <div className="header bg-light">
        <CommonUL />
      </div>
      <div className="body">
        <UL className="simple-list flex-row">
          <LI className="bg-light sidebar"></LI>
          <LI className="bg-light body">
            <Badge color="primary">{"Box"}</Badge>
          </LI>
        </UL>
      </div>
    </LI>
  );
};

export default BoxLayout;
