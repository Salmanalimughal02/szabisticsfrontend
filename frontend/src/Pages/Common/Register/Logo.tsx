import React from "react";
import Logoo from "../../assets/Logo.png";
import { useSelector } from "react-redux";
import { IMAGE_BASE_URL } from "../../../Utilities/api";

interface PropsType {
  alignLogo?: string;
}
const Logo = ({ alignLogo }: PropsType) => {
  return (
    <div className={`logo ${alignLogo ? alignLogo : ""} `}>
      <img src={Logoo} alt="" width={60} height={45} />
    </div>
  );
};

export default Logo;
