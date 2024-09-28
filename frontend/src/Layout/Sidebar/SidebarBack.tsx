import { LI } from "../../AbstractElements";
import { Link } from "react-router-dom";
import { Back } from "../../utils/Constant";

const SidebarBack = () => {
  return (
    <LI className="back-btn">
      <Link to={`${process.env.PUBLIC_URL}/dashboards/shoppingplace`}></Link>
      <div className="mobile-back text-end">
        <span>{Back}</span>
        <i className="fa fa-angle-right ps-2" aria-hidden="true"></i>
      </div>
    </LI>
  );
};

export default SidebarBack;
