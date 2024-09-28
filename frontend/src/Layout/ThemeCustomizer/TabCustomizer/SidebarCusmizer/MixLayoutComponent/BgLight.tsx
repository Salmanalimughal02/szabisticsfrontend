import { LI, UL } from "../../../../../AbstractElements";
import { MixLayoutComponentProp } from "../../../../../Types/ThemeCustomizerTypes";
import CommonUL from "../CommonUL/CommonUL";

const BgLight = ({ handleCustomizerMix_Background, mixLayout }: MixLayoutComponentProp) => {
  return (
    <LI
    className={`color-layout border-0 ${mixLayout === "light" ? "active" : ""}`}
    data-attr="light"   
    onClick={() => handleCustomizerMix_Background("light")}
    >
      <div className="header bg-light">
        <CommonUL />
      </div>
      <div className="body">
        <UL className="simple-list flex-row">
          <LI className="bg-light sidebar"></LI>
          <LI className="bg-light body"> </LI>
        </UL>
      </div>
    </LI>
  );
};

export default BgLight;
