import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../ReaduxToolkit/Hooks";
import Footer from "./Footer/Footer";
import Header from "./Header";
import TapTop from "./TapTop/TapTop";

import Sidebar from "./Sidebar/Sidebar";
import ThemeCustomizer from "./ThemeCustomizer/ThemeCustomizer";
import { setToggleSidebar } from "../ReaduxToolkit/Reducer/LayoutSlice";
import { addSidebarLayouts } from "../ReaduxToolkit/Reducer/ThemeCustomizerSlice";
import { useSelector } from "react-redux";
import { getUserRole } from "../Utilities/globals/globals";
import Loader from "../Pages/Utilities/Loader/Loader";
import Loaderr, { LoaderForPermissions } from "./Loader/Loader";
import { ROLES } from "../constants/roles";
import RightHeader from "./Header/RightHeader/RightHeader";

const Layout = () => {
  const { userPermissions } = useSelector(
    (state: any) => state.userPermissions
  );
  const { userPersonalizationData } = useSelector(
    (state: any) => state.personalization
  );
  // console.log("userPermissions---> ", userPermissions);

  const [open, setOpen] = useState<boolean>(false);

  const { layout } = useAppSelector((state) => state.themeCustomizer);
  const dispatch = useAppDispatch();
  const compactSidebar = () => {
    const windowWidth = window.innerWidth;
    if (layout === "material-icon") {
      if (windowWidth < 1200) {
        dispatch(setToggleSidebar(true));
      } else {
        dispatch(setToggleSidebar(false));
      }
    } else if (layout === "horizontal-wrapper") {
      if (windowWidth < 992) {
        dispatch(setToggleSidebar(true));
        dispatch(addSidebarLayouts("material-icon"));
      } else {
        dispatch(setToggleSidebar(false));
        // horizontal-wrapper
        dispatch(addSidebarLayouts("horizontal-wrapper"));
      }
    }
  };
  useEffect(() => {
    compactSidebar();
    window.addEventListener("resize", () => {
      compactSidebar();
    });
  }, [layout]);
  return (
    <>
      {getUserRole() !== ROLES.SUPER_ADMIN && userPermissions.length < 0 ? (
        <Loader />
      ) : (
        <>
          <Loaderr />
          <TapTop />
          <div className={`page-wrapper horizontal-wrapper `}>
            <div
              className={`page-header d-block`}
              style={{
                backgroundColor: `${
                  userPersonalizationData !== null &&
                  userPersonalizationData?.primaryColor !== null
                    ? userPersonalizationData?.primaryColor
                    : ""
                }`,
              }}
            >
              {/* <Header /> */}
            </div>
            <div className="page-body-wrapper">
              <Sidebar setOpen={setOpen} open={open} />

              <div
                className="page-body"
                style={{
                  backgroundColor: `${
                    userPersonalizationData !== null &&
                    userPersonalizationData?.backgroundColor !== null
                      ? userPersonalizationData?.backgroundColor
                      : ""
                  }`,
                  marginTop: "-25px",
                  height: "auto",
                  // maxHeight:"93.vh"
                }}
              >
                <Outlet />
              </div>
              {/* <Footer /> */}
            </div>
          </div>
          {/* <ThemeCustomizer /> */}
        </>
      )}
    </>
  );
};

export default Layout;
