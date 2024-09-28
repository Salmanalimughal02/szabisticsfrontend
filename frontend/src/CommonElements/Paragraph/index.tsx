import { Fragment } from "react";

interface propsTypes {
  children?: React.ReactNode;
  className?: string;
  innerHtml?: any;
  dangerouslySetInnerHTML?: any;
  id?: string;
  style?: any;
}

const P = (props: propsTypes) => {
  return (
    <Fragment>
      <p {...props} style={{ marginBottom: "4px", fontSize: "15px" }}>
        {props.children}
      </p>
    </Fragment>
  );
};

export default P;
