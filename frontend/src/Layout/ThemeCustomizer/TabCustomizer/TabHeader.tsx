import { H5, P } from "../../../AbstractElements";
import { PREVIEWSETTINGS } from "../../../utils/Constant";

const TabHeader = ({
  callbackNav,
}: {
  callbackNav: (test: string, open: boolean) => void;
}) => {
  return (
    <div className="customizer-header">
      <i className="icofont-close icon-close" onClick={() => callbackNav("", false)}></i>
      <H5>{PREVIEWSETTINGS}</H5>
      <P className="mb-0">
        {"Try It Real Time"} <i className="fa fa-thumbs-o-up txt-primary"></i>
      </P>
    </div>
  );
};

export default TabHeader;
