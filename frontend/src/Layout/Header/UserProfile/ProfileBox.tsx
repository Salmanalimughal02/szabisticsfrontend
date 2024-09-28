import { Link, useNavigate } from "react-router-dom";
import { LI, UL } from "../../../AbstractElements";
import { profilesMessage } from "../../../Data/Layout/Header/ProfilesData";
import FeatherIcons from "../../../utils/CommonSvgIcon/FeatherIcons";
import { getUserId, getUserRole } from "../../../Utilities/globals/globals";
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from "../../../constants/roles";
import { setErrorData } from "../../../ReaduxToolkit/Reducer/UserSlice";

const ProfileBox = () => {
  const dispatch = useDispatch();
  const { userPermissions } = useSelector(
    (state: any) => state.userPermissions
  );
  var profile = userPermissions.find((item: any) => item.title === "Profile");
  var profileMenu = profilesMessage.filter((item, index) => {
    if (item.name !== "Settings") {
      return item;
    }
    // if (
    //   profile == undefined &&
    //   index === 0 &&
    //   getUserRole() !== ROLES.SUPER_ADMIN
    // ) {
    //   return false;
    // } else if (profile !== undefined && item.name === "Account") {
    //   return profile.read;
    // } else if (item.name === "Settings") {
    //   return getUserRole() === ROLES.OPERATOR ? false : true;
    // } else {
    //   return true;
    // }
  });

  // // console.log("profile", profile);
  const navigate = useNavigate();
  const handleClick = (name: string) => {
    if (name == "Account") {
      dispatch(setErrorData(false));
    }
    if (name == "Log Out") {
      localStorage.removeItem("token");
      navigate(`${process.env.PUBLIC_URL}/login`);
    }
  };
  return (
    <UL className="profile-dropdown onhover-show-div">
      {profileMenu.map((data, index) => (
        <LI key={index}>
          <Link to={data.link} onClick={() => handleClick(data.name)}>
            <FeatherIcons iconName={data.icon} />
            <span>{data.name} </span>
          </Link>
        </LI>
      ))}
    </UL>
  );
};

export default ProfileBox;
