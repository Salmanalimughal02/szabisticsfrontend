import Logoo from "../../../assets/Logo.png";

interface PropsType {
  alignLogo?: string;
}
const Logo = ({ alignLogo }: PropsType) => {
  return (
    <div className={`logo ${alignLogo ? alignLogo : ""} `}>
      <img src={Logoo} alt="" width={65} height={50} />
    </div>
  );
};

export default Logo;
