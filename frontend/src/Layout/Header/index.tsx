import { Row } from 'reactstrap';
import RightHeader from './RightHeader/RightHeader';

const index = () => {
  return (
    <>
      <Row className="header-wrapper m-0" style={{ padding: "5px 30px" }}>
        <RightHeader />
      </Row>
    </>
  )
}

export default index