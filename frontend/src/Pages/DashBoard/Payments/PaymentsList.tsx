import { Card, CardBody, Col, Container } from "reactstrap";
import CommonHeader from "../../../Common/CommonHeader";
import { useEffect, useState } from "react";
import { getAll, patch } from "../../../Utilities/api";
import "./tableStyle.css";
import "../../../CssConstaints/Style.css";

import Swal from "sweetalert2";
import H7 from "../../../CommonElements/Headings/H7Element";
import Skeleton from "../../Utilities/Skeleton/Skeleton";
import { formatUnderscoredString } from "../../../Utilities/globals/globals";

import {
  GET_ALL_EVIDENCES,
  SUBMIT_PAYMENT_EVIDENCE,
  UPDATE_EVIDENCE_STATUS,
} from "../../../Utilities/api/apiEndpoints";
import ShowSinglePaymentEvidenceModal from "../../SuperAdmin/Packages/components/ShowSinglePaymentEvidenceModal";

const PaymentsList = () => {
  const [loading, setLoading] = useState(true);

  const [paymentEvidences, setPaymentEvidences] = useState([]);
  const [data, setData] = useState(null);
  const [isSinglePaymentModal, setIsSinglePaymentModal] = useState(false);
  const [evidenceData, setEvidenceData] = useState(null);
  const [paymentId, setPaymentId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const getAllEvidences = () => {
    getAll({
      url: GET_ALL_EVIDENCES,
    }).then((data: any) => {
      // console.log("api call --- >", data);

      if (data !== undefined) {
        if (!data.success) {
          Swal.fire({
            text: `${data.message}`,
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          });
          setPaymentEvidences([]);
          setLoading(false);
        }
        if (data.success) {
          // console.log("hhg");
          setPaymentEvidences(data.data);
          setLoading(false);
        }
      }
    });
  };

  useEffect(() => {
    getAllEvidences();
  }, []);

  const updatePaymentEvidenceStatus = async (e: any, id: any, status: any) => {
    e.preventDefault();
    const data = {
      status: status,
    };
    try {
      await patch(data, {
        url: `${UPDATE_EVIDENCE_STATUS}/${id}`,
      }).then(async (data: any) => {
        console.log("response: ", data);

        setLoading(false);

        if (!data.success) {
          Swal.fire({
            text: `${data.message}`,
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          });
          setPaymentId("");
        }

        if (data.success) {
          Swal.fire({
            text: `${data.message}`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          setPaymentId("");
          getAllEvidences();
        }
      });

      // Handle successful post creation (e.g., show a success message, redirect, etc.)
    } catch (error: any) {
      Swal.fire({
        text: `${error?.message}`,
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };
  const [isHovered, setIsHovered] = useState(false);
  const [idd, setIdd] = useState("");
  const renderTableRows = () => {
    return paymentEvidences?.map((row: any) => (
      // <tr key={row.id}>
      <tr
        key={row._id}
        onMouseEnter={() => {
          setIsHovered(true);
          setIdd(row._id);
        }}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backgroundColor:
            isHovered && idd == row._id ? "#D6EEEE" : "transparent",
          transition: "background-color 0.3s",
        }}
      >
        <td style={{ width: "16%", fontSize: "16px", fontWeight: "normal" }}>
          {row?._id}
        </td>
        <td style={{ width: "16%", fontSize: "16px", fontWeight: "normal" }}>
          {row?.user?.firstName} {row?.user?.lastName}
        </td>
        <td style={{ width: "16%", fontSize: "16px", fontWeight: "normal" }}>
          {row?.user?.emailAddress}
        </td>
        <td style={{ width: "16%", fontSize: "16px", fontWeight: "normal" }}>
          {formatUnderscoredString(row?.status)}
        </td>
        <td style={{ width: "36%", fontSize: "16px", fontWeight: "normal" }}>
          <button
            className="global-table-edit-btn"
            onClick={(e) => {
              setEvidenceData(row);
              setIsSinglePaymentModal(true);
            }}
            style={{
              marginRight: "5px",
              width: "70px",
            }}
          >
            View
            {/* {row.isActive ? "Deactivate" : "Activate"} */}
          </button>
          <button
            className="global-table-edit-btn"
            onClick={(e) => {
              console.log(row);
              setPaymentId(row._id);
              setPaymentStatus("APPROVED");
              updatePaymentEvidenceStatus(e, row._id, "APPROVED");
            }}
            style={{
              marginRight: "5px",
              width: "90px",
              opacity: `${row?.status == "APPROVED" ? "0.5" : "1"}`,
            }}
            disabled={row?.status == "APPROVED"}
          >
            {paymentId == row?._id && paymentStatus == "APPROVED"
              ? "Loading.."
              : "Approve"}
            {/* {row.isActive ? "Deactivate" : "Activate"} */}
          </button>
          <button
            className="global-table-edit-btn"
            onClick={(e) => {
              console.log(row);
              setPaymentId(row._id);
              setPaymentStatus("REJECTED");
              updatePaymentEvidenceStatus(e, row._id, "REJECTED");
            }}
            style={{
              marginRight: "5px",
              width: "90px",
              opacity: `${row?.status == "REJECTED" ? "0.5" : "1"}`,
            }}
            disabled={row?.status == "REJECTED"}
          >
            {paymentId == row?._id && paymentStatus == "REJECTED"
              ? "Loading.."
              : "Reject"}
            {/* {row.isActive ? "Deactivate" : "Activate"} */}
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Container fluid>
        <Col sm="12">
          <Card>
            <CommonHeader title="All Payments" />
            <CardBody>
              <div className="table-responsive product-table">
                {loading ? (
                  // <Loader />
                  <>
                    <Skeleton height="100px" width="100%" borderRadius="10px" />
                    <Skeleton
                      height="40px"
                      width="100%"
                      marginTop="10px"
                      marginBottom="10"
                      borderRadius="10px"
                    />
                    <Skeleton
                      height="40px"
                      width="100%"
                      marginTop="10px"
                      marginBottom="10"
                      borderRadius="10px"
                    />
                    <Skeleton
                      height="40px"
                      width="100%"
                      marginTop="10px"
                      marginBottom="10"
                      borderRadius="10px"
                    />
                    <Skeleton
                      height="40px"
                      width="100%"
                      marginTop="10px"
                      marginBottom="10"
                      borderRadius="10px"
                    />
                  </>
                ) : paymentEvidences?.length > 0 && loading === false ? (
                  <div>
                    <table>
                      <thead>
                        <tr>
                          <th style={{ width: "16%", fontSize: "18px" }}>ID</th>
                          <th style={{ width: "16%", fontSize: "18px" }}>
                            Name
                          </th>
                          <th style={{ width: "16%", fontSize: "18px" }}>
                            Email Address
                          </th>
                          <th style={{ width: "16%", fontSize: "18px" }}>
                            Status
                          </th>
                          <th style={{ width: "36%", fontSize: "18px" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>{renderTableRows()}</tbody>
                      {isSinglePaymentModal && (
                        <ShowSinglePaymentEvidenceModal
                          isVisible={isSinglePaymentModal}
                          setIsVisible={setIsSinglePaymentModal}
                          evidenceData={evidenceData}
                        />
                      )}
                    </table>
                  </div>
                ) : (
                  <H7>No Payments Found</H7>
                )}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default PaymentsList;
