import Logoo from "../../assets/Logo.png";

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
