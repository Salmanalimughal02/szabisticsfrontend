import { CardHeader } from "reactstrap";
import { Fragment } from "react";
import { H3, H4, P } from "../AbstractElements";
type ObjectType = {
  text?: string;
  code?: string;
};
type PropsTypes = {
  headClass?: string;
  title: string;
  subTitle?: ObjectType[];
  subTitle2?: ObjectType[];
};

const CommonHeader = ({
  headClass,
  title,
  subTitle,
  subTitle2,
}: PropsTypes) => {
  return (
    <CardHeader className={headClass}>
      <H4 className="mb-0">{title}</H4>
      {subTitle && (
        <P className="f-m-light mt-1">
          {subTitle.map((data, index) => (
            <Fragment key={index}>
              {data?.text} {data.code && <code>{data.code}</code>}
            </Fragment>
          ))}
        </P>
      )}
      {subTitle2 && (
        <P className="f-m-light mt-1">
          {subTitle2.map((data, index) => (
            <Fragment key={index}>
              {data?.text} {data.code && <code>{data.code}</code>}
            </Fragment>
          ))}
        </P>
      )}
    </CardHeader>
  );
};

export default CommonHeader;
