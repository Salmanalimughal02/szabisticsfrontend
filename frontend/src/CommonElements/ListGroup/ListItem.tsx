import { Fragment } from "react";
import { ListGroupItem } from "reactstrap";

interface propsTypes {
  children?: React.ReactNode;
  val?: string;
  className?: string;
  disabled?: boolean;
  onClick?: (key:any) => void;
  tag?: React.ElementType;
  href?: string;
  style?: {
    listStyle: string;
  };
  title?:string
}

const LI = (props: propsTypes) => {
  const { children, val } = props;
  return (
    <Fragment>
      <ListGroupItem {...props}>
        {val ? <div dangerouslySetInnerHTML={{ __html: val }} /> : ""}{" "}
        {children}
      </ListGroupItem>
    </Fragment>
  );
};

export default LI;
