import { navLinkList } from "../../../Data/Layout/ThemeCustomizer/ThemeCustomizerData";
import { Link } from "react-router-dom";

const Navlinks = () => {
  return (
    <>
      {navLinkList &&
        navLinkList.map((item, index) => (
          <Link
            key={index}
            className="nav-link"
            to={item.path}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <i className={`${item.icon}`}></i>
            </div>
            <span>{item.name}</span>
          </Link>
        ))}
    </>
  );
};

export default Navlinks;
