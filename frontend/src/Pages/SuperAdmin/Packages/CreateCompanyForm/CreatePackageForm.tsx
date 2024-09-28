import { Container, Row } from "reactstrap";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs/Breadcrumbs";

import CustomHorizontalWizard from "./CustomHorizontalWizard";


const CreatePackageForm = () => {
  return (
    <>
      <Breadcrumbs
        mainTitle="Create Package"
        parent="Package"
        title="Create Package"
      />
      <Container fluid>
        <Row>
          <CustomHorizontalWizard heading="" xs={12} />
        </Row>
      </Container>
    </>
  );
};

export default CreatePackageForm;
