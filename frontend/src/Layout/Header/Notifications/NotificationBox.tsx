import { Link } from "react-router-dom";
import { LI, UL } from "../../../AbstractElements";
import { notification } from "../../../Data/Layout/Header/NotificationData";
import { CheckAll } from "../../../utils/Constant";

const NotificationBox = () => {
  return (
    <UL className="simple-list">
      {notification.map((data, index) => (
        <LI className={`b-l-${data.symbol} border-4 mt-3`} key={index}>
          <Link to={data.href}>
            <p>
              {data.notificationsTittle}
              <span className={`font-${data.fontColor}`}>
                {data.notificationsTime}
              </span>
            </p>
          </Link>
        </LI>
      ))}
      <LI>
        <Link className="f-w-700" to={`${process.env.PUBLIC_URL}/email/emailapp`}>
          {CheckAll}
        </Link>
      </LI>
    </UL>
  );
};

export default NotificationBox;
