import { Link } from "react-router-dom";
import SVG from "../../utils/CommonSvgIcon/SVG";
import { LI, UL } from "../../AbstractElements";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { Href } from "../../utils/Constant";
import { useAppSelector } from "../../ReaduxToolkit/Hooks";
import { MenuListInterface } from "./SideBarTypes";
import { getUserRole } from "../../Utilities/globals/globals";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";


const MenuList = ({ subMenuData, setIsOpen, isOpen, level, isClose, setIsClose }: MenuListInterface) => {
  const [close, setClose] = useState(false)
  const { sidebarIconType } = useAppSelector((state) => state.themeCustomizer);
  const { t } = useTranslation();
  const { layout } = useAppSelector((state) => state.themeCustomizer);
  const menuRef = useRef<HTMLDivElement>(null);
  const [showArrow, setShowArrow] = useState(false);
  const handleClick = (item: string) => {
    const temp: string[] = isOpen;
    temp[level] = item !== temp[level] ? item : "";
    setIsOpen([...temp]);
    setClose(temp[level].includes(item) ? true : false)
    // setIsClose(true);
  };

  const handleScroll = () => {
    if (!menuRef.current) return;
    const { scrollTop, clientHeight, scrollHeight } = menuRef.current;
    const bottomOffset = scrollHeight - (scrollTop + clientHeight);
    if (bottomOffset < 10) {
      setShowArrow(true)
    }
    else {
      setShowArrow(false)
    }
  };
  return (

    <div>
      <div className="hoverd-menu" style={{
        height: `${subMenuData.title == "Setup" && getUserRole() == "SUPER_ADMIN" && "55vh"}`,
        overflow: "auto",
        scrollbarWidth: "none",
      }}
        ref={menuRef}
        onScroll={handleScroll}
      >
        {subMenuData?.subMenu &&
          subMenuData?.subMenu?.map((item, index) => (
            <LI className={level === 0 ? "main-submenu" : ""} key={index} >
              <Link
                className={`${level === 0 ? "d-flex sidebar-menu" : level === 1 ? "submenu-title" : ""} ${isOpen[level] === item.title ? "active" : ""}`}
                to={item.link ? item.link : Href}
                onClick={() => handleClick(item.title)}
              >
                {item.svgIcon && (
                   <span
                   style={{
                     height: "20px",
                     width: "20px",
                     marginRight: "8px",
                   }}
                 >
                   <img
                     src={item.svgIcon}
                     style={{
                       height: "100%",
                       width: "100%",
                     }}
                     alt=""
                   />
                 </span>
                  // <SVG className={`${sidebarIconType}-icon`} iconId={item.svgIcon === "home" ? item.svgIcon : `${sidebarIconType}-${item.svgIcon}`} />
                )}
                {t(item.title)}

              </Link>

            </LI>
          ))}

      </div >
      {
        (subMenuData.title == "Setup" && getUserRole() == "SUPER_ADMIN") && !showArrow ? <IoMdArrowDropdown style={{
          marginBottom: "-8px",
          marginTop: "5px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          fontSize: "20px",
          height: "20px"
        }} /> : subMenuData.title == "Setup" && getUserRole() == "SUPER_ADMIN" && <IoMdArrowDropup style={{
          marginBottom: "-8px",
          marginTop: "5px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          fontSize: "20px",
          height: "20px"
        }} />
      }
    </div>

  );
};

export default MenuList;


