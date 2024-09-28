import { PopoverBody, PopoverHeader, UncontrolledPopover } from "reactstrap";
import { H6, LI } from "../../../AbstractElements";
import SVG from "../../../utils/CommonSvgIcon/SVG";
import { Notification } from "../../../utils/Constant";
import NotificationBox from "./NotificationBox";

const Notifications = () => {
  return (
    <LI className="onhover-dropdown">
      <div className="notification-box" id="Popover">
        <SVG iconId={"Bell"} />
      </div>
      <UncontrolledPopover placement="top" trigger="hover" target="Popover">
        <PopoverHeader>Development Mode</PopoverHeader>
        <PopoverBody>This feature is under development</PopoverBody>
      </UncontrolledPopover>
      {/* <div className="onhover-show-div notification-dropdown">
        <H6 className="f-18 mb-0 dropdown-title">{Notification}</H6>
        <NotificationBox />
      </div> */}
    </LI>
  );
};

export default Notifications;
