import { Card, CardBody, Col } from "reactstrap";
import CommonHeader from "../../../../Common/CommonHeader";
import Dropzone from "react-dropzone-uploader";
import { SingleFileUploads } from "../../../../utils/Constant";
import { useDispatch } from "react-redux";

import { H5 } from "../../../../AbstractElements";
import { setPackageImage, setReleaseDocumentOne, setReleaseDocumentTwo } from "../../../../ReaduxToolkit/Reducer/CompanySlice";

interface propTypes {
  heading: any;
  category: any;
}

const FileAttachementComponent: React.FC<propTypes> = ({
  heading,
  category,
}) => {
  const dispatch = useDispatch();
  const subTitle = [
    {
      text: "",
      code: "",
    },
  ];

  interface type {
    file: any;
    meta: any;
    remove: any;
  }

  const convertToBase64 = (file: any, setBase64: any) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleAdd = ({ file, meta, remove }: type, status: any) => {
    if (category === "packageImage") {
      if (status === "done") {
        const filee = file;
        if (filee) {
          dispatch(setPackageImage(file));
        }

      } else if (status === "removed") {
        // console.log("File removed:", file);
        dispatch(setPackageImage(null));
      }
    } else if (category === "releaseDocumentOne") {
      if (status === "done") {
        const filee = file;
        if (filee) {
          dispatch(setReleaseDocumentOne(file));
        }

      } else if (status === "removed") {
        // console.log("File removed:", file);
        dispatch(setReleaseDocumentOne(null));
      }
    } else if (category === "releaseDocumentTwo") {
      if (status === "done") {
        const filee = file;
        if (filee) {
          dispatch(setReleaseDocumentTwo(file));
        }

      } else if (status === "removed") {
        // console.log("File removed:", file);
        dispatch(setReleaseDocumentTwo(null));
      }

    }
  };
  return (
    <Col lg={4}>
      <Card>
        {/* <CommonHeader title={heading} subTitle={subTitle} headClass="pb-0" /> */}
        <H5>{heading}</H5>
        <CardBody>
          <Dropzone
            onChangeStatus={handleAdd}
            // accept="image/*"
            accept="image/*,application/pdf"
            maxFiles={1}
            inputContent="Drop files here or click to upload."
          />
        </CardBody>
      </Card>
    </Col>
  );
};

export default FileAttachementComponent;
