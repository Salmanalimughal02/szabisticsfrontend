import { Container, Row } from "reactstrap";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs/Breadcrumbs";

import CustomHorizontalWizard from "./CustomHorizontalWizard";


const SinglePackage = () => {
  return (
    <>
      <Breadcrumbs
        mainTitle="Package Detail"
        parent="Package"
        title="Package Detail"
      />
      <Container fluid>
        <Row>
          <CustomHorizontalWizard heading="" xs={12} />
        </Row>
      </Container>
    </>
  );
};

export default SinglePackage;
