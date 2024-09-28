import { useEffect, useState } from "react";
import { P, UL } from "../../../AbstractElements";
import UserProfile from "../UserProfile/UserProfile";
import { useSelector } from "react-redux";

const RightHeader = () => {
  return (
    <div className="nav-right col-auto pull-right right-header p-0 ms-auto">
      <UL className="nav-menus flex-row simple-list">
        {/* <SearchInput /> */}
        {/* <div
          style={{ paddingRight: "10px", borderRight: "1px solid lightGray" }}
        >

          <p style={{ marginBottom: "4px", fontSize: "13px" }}>
            {displaytimeZone(userData?.timezone)}
          </p>
        </div>
        <Notifications /> */}
        {/* <Bookmark /> */}
        {/* <Message /> */}
        {/* <Cart /> */}
        {/* <DarkMode /> */}
        {/* <Language /> */}

        <UserProfile />
      </UL>
    </div>
  );
};

export default RightHeader;
