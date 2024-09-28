import { ReactNode } from "react";

interface propsTypes {
  children?: ReactNode;
  className?: string;
}

const H4 = (props: propsTypes) => {
  const { children = "" } = props;
  return (
    <h3 {...props} style={{ fontSize: "18px", fontWeight: "bold" }}>
      {children}
    </h3>
  );
};

export default H4;
