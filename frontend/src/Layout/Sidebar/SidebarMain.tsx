import { LI, UL } from "../../AbstractElements";
import { Href } from "../../utils/Constant";
import SimpleBar from "simplebar-react";
import SidebarBack from "./SidebarBack";
import MenuList from "./MenuList";
import { Link } from "react-router-dom";

import DashboardIcon from "../../assets/dashboard (1).png";

import CompaniesIcon from "../../assets/enterprise.png";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SidebarMenuTypes } from "../../Data/Layout/Sidebar/SidebarTypes";
import { useAppSelector } from "../../ReaduxToolkit/Hooks";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { getUserRole } from "../../Utilities/globals/globals";

import Header from "../Header";

export interface PropsTypes {
  setOpen: (item: boolean) => void;
  open?: boolean;
}
const SidebarMain = ({ setOpen, open }: PropsTypes) => {


  const SidebarMenuComponent: SidebarMenuTypes[] = [
    {
      title: "Drivers",
      // svgIcon: "home",
      svgIcon: `${DashboardIcon}`,
      link: `${process.env.PUBLIC_URL}/drivers`,
      role: ["SUPER_ADMIN"],
    },
    {
      title: "Payments",
      // svgIcon: "home",
      svgIcon: `${DashboardIcon}`,
      link: `${process.env.PUBLIC_URL}/payments`,
      role: ["SUPER_ADMIN"],
    },

    {
      title: "Packages",
      // svgIcon: "home",
      svgIcon: `${CompaniesIcon}`,
      link: `${process.env.PUBLIC_URL}/packages`,
      role: ["DRIVER", "OWNER"],
    },
  ];

  const filteredSidebarMenuComponent = SidebarMenuComponent.filter((item) => {
    if (item.role?.includes(getUserRole())) {
      return item;
    }
  });

 
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<string[]>([]);
  const [sideMenu, setSideMenu] = useState("");
  const [isActive, setIsActive] = useState("");
  const [isClose, setIsClose] = useState(false);
  const { layout } = useAppSelector((state) => state.themeCustomizer);
  const menuRef = useRef<HTMLDivElement>(null);
  const [showArrow, setShowArrow] = useState(false);
  const handleClick = (item: SidebarMenuTypes) => {
    if (layout === "material-icon") {
      let menu: string = sideMenu;
      menu = sideMenu !== item.title ? item.title : "";
      let clas: string = isActive;
      // clas = sideMenu !== item.title ? "active" : "";
      // setIsActive("active");
      setSideMenu(menu);
      setOpen(menu !== "" ? true : false);
      // setIsClose(false);
    }
  };

  const { token } = useSelector((state: any) => state.user);
  const [decodedToken, setDecodedToken]: any = useState(null);
  const authToken = localStorage.getItem("token");
  useEffect(() => {
    if (authToken !== null) {
      const decodedToken = jwtDecode(authToken);
      // // // console.log(decodedToken);
      setDecodedToken(decodedToken);
    }
  }, []);

  return (
    <nav className="sidebar-main">
      {decodedToken !== null && (
        <div
          id="sidebar-menu"
          style={{
            backgroundColor: "white",
          }}
        >
          <UL className="sidebar-links simple-list" id="simple-bar">
            <SimpleBar
              className="w-100 simplebar-scrollable-y h-100"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <>
                <SidebarBack />
                {filteredSidebarMenuComponent.map((data, index) => (
                  <LI className={`sidebar-list`} key={index}>
                    <Link
                      className={`sidebar-link sidebar-title ${
                        sideMenu === data.title ? "active" : ""
                      }`}
                      // style={{
                      //   color: `${
                      //     userPersonalizationData !== null &&
                      //     userPersonalizationData?.buttonsAndBarsColor !== null &&
                      //     sideMenu === data.title &&
                      //     userPersonalizationData?.buttonsAndBarsColor
                      //   }`,
                      // }}
                      to={data.link ? data.link : "#"}
                      onClick={() => handleClick(data)}
                    >
                      {/* <SVG
                      className={`${sidebarIconType}-icon`} iconId={`${sidebarIconType === "fill" ? "fill-" : ""}${data.svgIcon}`}
                   
                    /> */}
                      <span
                        style={{
                          height: "20px",
                          width: "20px",
                          marginRight: "8px",
                        }}
                      >
                        <img
                          src={data.svgIcon}
                          style={{
                            height: "100%",
                            width: "100%",
                          }}
                          alt=""
                        />
                      </span>
                      <span
                        style={{
                          fontSize: "13px",
                        }}
                      >
                        {t(data.title)}
                      </span>
                    </Link>
                    {data.link ? (
                      <div></div>
                    ) : (
                      !isClose && (
                        <UL
                          className="sidebar-submenu custom-scrollbar simple-list"
                          // style={{
                          //   display: `${
                          //     layout === "material-icon"
                          //       ? data.title === sideMenu && !data.link
                          //         ? "none"
                          //         : "none"
                          //       : ""
                          //   }`,
                          // }}

                          style={{
                            display: `${
                              data.title === sideMenu && !data.link
                                ? "block"
                                : "block"
                            }`,
                            marginTop: "-70px",
                          }}
                        >
                          {!data.link && (
                            <div>
                              <MenuList
                                subMenuData={data}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                level={0}
                                isClose={isClose}
                                setIsClose={setIsClose}
                                menuRef={menuRef}
                                showArrow={showArrow}
                                setShowArrow={setShowArrow}
                              />
                            
                            </div>
                          )}
                        </UL>
                      )
                    )}
                  </LI>
                ))}
              </>

              <div
                className={`page-header d-block`}
                style={{
                  backgroundColor: `transparent`,
                  width: "20%",
                  // display:"flex",
                  // justifyContent:"flex-end",
                  right: "0",
                }}
              >
                <Header />
              </div>
            </SimpleBar>
          </UL>
        </div>
      )}
    </nav>
  );
};

export default SidebarMain;
