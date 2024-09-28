import { color } from "framer-motion";

interface PropTypes {
  iconId: string | undefined;
  onClick?: () => void;
  className?: string;
  color?: string;
}

const SVG = (props: PropTypes) => {
  return (
    <svg
      className={props.className !== "personalization" ? props.className : ""}
      onClick={props.onClick}
      stroke={props.className == "personalization" ? props.color : ""}
    >
      <use
        href={`${process.env.PUBLIC_URL}/assets/svg/icon-sprite.svg#${props.iconId}`}
      ></use>
    </svg>
  );
};

export default SVG;
