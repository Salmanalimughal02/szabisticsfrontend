import { Col } from "reactstrap";
type PropsType = {
  ribbonText: string;
  subText: string ;
  classMain: string;
  ribbonClass: string;
};
const CommonRibbons = ({ ribbonText, subText, classMain, ribbonClass }: PropsType) => {
  return (
    <Col xl={4} sm={6}>
      <div className={classMain}>
        <div className={ribbonClass} dangerouslySetInnerHTML={{__html:ribbonText}} />
        <div dangerouslySetInnerHTML={{__html:subText}} />
      </div>
    </Col>
  );
};

export default CommonRibbons;
