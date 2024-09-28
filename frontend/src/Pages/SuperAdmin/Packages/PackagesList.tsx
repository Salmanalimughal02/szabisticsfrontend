import { Card, CardBody, Col, Container, Input, Label, Row } from "reactstrap";
import CommonHeader from "../../../Common/CommonHeader";
import { useEffect, useState } from "react";
import { getAll } from "../../../Utilities/api";
import { useDispatch, useSelector } from "react-redux";
import "./tableStyle.css";
import "../../../CssConstaints/Style.css";

import { setNoDataFound } from "../../../ReaduxToolkit/Reducer/NoDataFoundSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import H7 from "../../../CommonElements/Headings/H7Element";
import Skeleton from "../../Utilities/Skeleton/Skeleton";
import {
  setFilterPackages,
  setIsConnected,
  setPackage,
  setPackages,
  setPackagesEnd,
  setPackagesStart,
} from "../../../ReaduxToolkit/Reducer/CompanySlice";
import ShowAllBidsModal from "./components/ShowAllBidsModal";
import MakeBidModal from "./components/MakeBidModal";
import {
  getUserId,
  getUserRole,
  getUserRoleID,
} from "../../../Utilities/globals/globals";
import {
  GET_ALL_PACKAGES,
  GET_CONTAINER_WEIGHT,
} from "../../../Utilities/api/apiEndpoints";
import { ERROR_MESSAGE } from "../../../Utilities/constants/constants";
import CreatePaymentEvidence from "./components/CreatePaymentEvidenceModal";
import { H5 } from "../../../AbstractElements";
import PackageClipart from "../../../assets/Package_clipart.png";

const PackagesList = () => {
  const { packages } = useSelector((state: any) => state.companies);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [isBidsModalOpen, setIsBidsModalOpen] = useState(false);
  const [isMakeBidsModalOpen, setIsMakeBidsModalOpen] = useState(false);
  const [id, setId] = useState("");
  const [isOpenPaymentEvidenceModal, setIsOpenPaymentEvidenceModal] =
    useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setIsConnected(false));
  }, []);

  const [totalWeight, setTotalWeight] = useState("");

  const getTotalWeight = () => {
    getAll({
      url: `${GET_CONTAINER_WEIGHT}`,
    }).then((data: any) => {
      // console.log("api call --- >", data);
      if (data !== undefined) {
        if (data.success) {
          // console.log("hhg");
          setTotalWeight(data.data.totalWeight);
        }
      }
    });
  };

  useEffect(() => {
    getTotalWeight();
  }, []);

  useEffect(() => {
    dispatch(setPackages([]));
    dispatch(setFilterPackages([]));
    dispatch(setPackagesStart());
    getAll({
      url: GET_ALL_PACKAGES,
    }).then((data: any) => {
      // console.log("api call --- >", data);
      if (data == undefined) {
        Swal.fire({
          text: "Companies not Found",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });

        dispatch(setPackages([]));
        dispatch(setFilterPackages([]));
        setLoading(false);
        dispatch(setPackagesEnd());
        return;
      }

      if (data !== undefined) {
        dispatch(setNoDataFound(data.message));
        if (!data.success && data.message === ERROR_MESSAGE) {
          dispatch(setIsConnected(true));
          setLoading(false);
        }
        if (!data.success) {
          Swal.fire({
            text: `${data.message}`,
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          });
          setLoading(false);
        }
        if (data.success) {
          // console.log("hhg");
          dispatch(setPackages(data.data));
          dispatch(setFilterPackages(data.data));
          setLoading(false);
        }
      }
      dispatch(setPackagesEnd());
    });
  }, []);
  const [isHovered, setIsHovered] = useState(false);
  const [idd, setIdd] = useState("");
  const renderTableRows = () => {
    return packages?.map((row: any) => (
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
        <td style={{ width: "7%", fontSize: "16px", fontWeight: "normal" }}>
          <img
            width="60px"
            height="60px"
            alt="Driver"
            style={{
              border: "1px solid gray",
              borderRadius: "100px",
              // marginBottom: "25px",
            }}
            src={PackageClipart}
          />
        </td>
        <td style={{ width: "13%" }}>{row?.name}</td>
        <td style={{ width: "13%" }}>{row?.modelNo}</td>

        {getUserRole() === "OWNER" && (
          <>
            <td style={{ width: "7%" }}>{row?.status}</td>
            <td style={{ width: "6%" }}>{row?.message}</td>
          </>
        )}

        <td style={{ width: "17%" }}>
          {/* {row?.acceptedOffer?.status == "ACCEPTED" ? "Accepted" : "Pending"} */}
          {row?.location?.pickup}
        </td>
        <td style={{ width: "17%" }}>
          {/* {row?.paymentEvidence?.status == "APPROVED"
            ? "Approved"
            : row?.paymentEvidence == null
            ? "N/A"
            : "Pending"} */}
          {row?.location?.dropoff}
        </td>
        <td style={{ width: "8%" }}>
          <div>
            <button
              className="global-table-edit-btn"
              onClick={() => {
                console.log(row);

                // dispatch(setPackage(row));
                navigate(
                  `${process.env.PUBLIC_URL}/packages/package-detail/${row._id}`
                );
              }}
              style={{
                marginRight: "5px",
                marginBottom: "6px",
                width: "80px",
              }}
            >
              View
            </button>
            {/* {getUserRole() === "DRIVER" &&
              row.acceptedOffer == null &&
              (row?.offers?.length === 0 ||
                (row?.offers?.some(
                  (item: any) =>
                    item.user === getUserId() && item.status === "REJECTED"
                ) &&
                  !row?.offers?.some(
                    (item: any) =>
                      item.user === getUserId() && item.status !== "REJECTED"
                  ))) && (
                <button
                  className="global-table-edit-btn"
                  onClick={() => {
                    setIsMakeBidsModalOpen(true);
                    setId(row._id);
                  }}
                  style={{
                    marginRight: "5px",
                    marginBottom: "6px",
                    width: "80px",
                  }}
                >
                  Make Bid
                </button>
              )} */}

            {getUserRole() === "DRIVER" &&
              row.acceptedOffer == null &&
              (row?.offers?.length === 0 ||
                row?.offers?.every(
                  (item: any) =>
                    item.user !== getUserId() ||
                    (item.user === getUserId() && item.status === "REJECTED")
                )) && (
                <button
                  className="global-table-edit-btn"
                  onClick={() => {
                    setIsMakeBidsModalOpen(true);
                    setId(row._id);
                  }}
                  style={{
                    marginRight: "5px",
                    marginBottom: "6px",
                    width: "80px",
                  }}
                >
                  Make Bid
                </button>
              )}

            <button
              className="global-table-edit-btn"
              onClick={() => {
                setIsBidsModalOpen(true);
                setId(row._id);
                // console.log("isUpdateModalOpen: ", isUpdateModalOpen);
              }}
              style={{
                marginRight: "5px",
                marginBottom: "6px",
                width: "80px",
              }}
            >
              Show Bids
            </button>

            {row.acceptedOffer !== null &&
              getUserRole() == "OWNER" &&
              (row.paymentEvidence == null ||
                row?.paymentEvidence?.status == "REJECTED") &&
              new Date(row?.OfferAcceptionTimestamp).getTime() >=
                Date.now() && (
                <button
                  className="global-table-edit-btn"
                  onClick={() => {
                    setIsOpenPaymentEvidenceModal(true);
                    setId(row._id);
                    // console.log("isUpdateModalOpen: ", isUpdateModalOpen);
                  }}
                  style={{
                    marginRight: "5px",
                    width: "80px",
                  }}
                >
                  Payment
                </button>
              )}
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Container fluid>
        <Col sm="12">
          <Card>
            {getUserRole() == "DRIVER" && (
              <div
                style={{
                  backgroundColor: `lightblue`,
                  padding: "10px",
                  borderRadius: "10px",
                  marginBottom: "20px",
                  // width: "100%",
                  margin: "20px",
                }}
              >
                <H5> Total Weight : {totalWeight} pounds</H5>
              </div>
            )}
            <CommonHeader title="All Packages" />

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
                ) : packages?.length > 0 && loading === false ? (
                  <div>
                    <table
                      style={{
                        width: "100%",
                        overflowX: "scroll",
                      }}
                    >
                      <thead>
                        <tr>
                          <th style={{ width: "7%" }}>Image</th>
                          <th style={{ width: "13%" }}>Name</th>
                          <th style={{ width: "13%" }}>Model No</th>
                          {getUserRole() === "OWNER" && (
                            <>
                              <th style={{ width: "8%" }}>Status</th>
                              <th style={{ width: "8%" }}>Message</th>
                            </>
                          )}

                          <th style={{ width: "17%" }}>Pick Up</th>
                          <th style={{ width: "17%" }}>Drop Off</th>
                          <th style={{ width: "8%" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody
                        style={{
                          width: "100%",
                          overflowX: "scroll",
                        }}
                      >
                        {renderTableRows()}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <H7>No Packages Found</H7>
                )}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Container>
      {isMakeBidsModalOpen && (
        <MakeBidModal
          isVisible={isMakeBidsModalOpen}
          setIsVisible={setIsMakeBidsModalOpen}
          id={id}
        />
      )}
      {isBidsModalOpen && (
        <ShowAllBidsModal
          isVisible={isBidsModalOpen}
          setIsVisible={setIsBidsModalOpen}
          id={id}
        />
      )}
      {isOpenPaymentEvidenceModal && (
        <CreatePaymentEvidence
          isVisible={isOpenPaymentEvidenceModal}
          setIsVisible={setIsOpenPaymentEvidenceModal}
          id={id}
        />
      )}
    </>
  );
};

export default PackagesList;
