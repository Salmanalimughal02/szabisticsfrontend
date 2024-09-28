import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Modal,
  ModalBody,
  Row,
  Table,
} from "reactstrap";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Select } from "antd";
import { H3, H5, P } from "../../../../AbstractElements";
import { Heading5 } from "../../../../utils/Constant";
import { create, getAll } from "../../../../Utilities/api";
import Skeleton from "../../../Utilities/Skeleton/Skeleton";
import SingleBidModal from "./ShowSingleBidModal";
import {
  ACCEPT_OR_REJECT_BID,
  GET_ALL_BIDS_BY_PACKAGE_ID,
  GET_ALL_PACKAGES,
  UPDATE_AGREEMENT_STATUS,
} from "../../../../Utilities/api/apiEndpoints";
import ShowTermsAndConditionsModal from "./ShowTermsAndConditionsModal";
import CreatePaymentEvidence from "./CreatePaymentEvidenceModal";
import {
  setFilterPackages,
  setPackages,
} from "../../../../ReaduxToolkit/Reducer/CompanySlice";
import { getUserRole } from "../../../../Utilities/globals/globals";
import ShowDriverProfileModal from "./ShowDriverProfileModal";

interface PropsTypes {
  isVisible: boolean; // Change 'boolean' to the actual type of isVisible
  setIsVisible: any;
  id: any;
}

const ShowAllBidsModal: React.FC<PropsTypes> = ({
  isVisible,
  setIsVisible = () => {},
  id,
}) => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading
  const tableHeader = ["ID", "User", "Fare", "Instruction", "Status", "View"];
  const containerRef = useRef(null);
  const [data, setData] = useState(null);
  const [singleBidModalOpen, setSingleBidModalOpen] = useState(false);
  const [isOpenTermsModal, setIsOpenTermsModal] = useState(false);
  const [bidId, setBidId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [status, setStatus] = useState("");
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);

  const dispatch = useDispatch();

  const allPackageBids = () => {
    getAll({
      url: `${GET_ALL_BIDS_BY_PACKAGE_ID}/${id}`,
    }).then((data: any) => {
      // console.log("api call --- >", data);

      if (data !== undefined) {
        if (!data.success) {
          setLoading(false);
        }
        if (data.success) {
          // console.log("hhg");
          setDataList(data.data);
          setLoading(false);
        }
      }
    });
  };
  useEffect(() => {
    allPackageBids();
  }, []);

  const acceptOrRejectBid = async (
    e: any,
    packageId: any,
    bidId: any,
    status: any,
    driverId: any
  ) => {
    e.preventDefault();

    var bodyData = {
      packageId: packageId,
      bidId: bidId,
      status: status,
      driverId: driverId,
    };

    try {
      await create(bodyData, {
        url: `${ACCEPT_OR_REJECT_BID}`,
      }).then(async (data: any) => {
        console.log("response: ", data);

        if (!data.success) {
          Swal.fire({
            text: `${data.message}`,
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          });
        }

        if (data.success) {
          setBidId("");
          setStatus("");
          Swal.fire({
            text: `${data.message}`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          allPackageBids();
          setBidId("");
          getAll({
            url: GET_ALL_PACKAGES,
          }).then((data: any) => {
            // console.log("api call --- >", data);

            if (data !== undefined) {
              if (data.success) {
                // console.log("hhg");
                dispatch(setPackages(data.data));
                dispatch(setFilterPackages(data.data));
              }
            }
          });
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
      setLoading(false);
    }
  };

  return (
    <Modal
      centered
      isOpen={isVisible}
      toggle={() => {
        setIsVisible(!isVisible);
      }}
      size="xl"
      onClosed={() => {
        // setValue("")
        setIsVisible(false);
      }}
    >
      <div className="modal-header">
        <H3 className="modal-title">All Bids</H3>
        <Button
          color="transprant"
          className="btn-close"
          onClick={() => {
            // setValue("")
            setIsVisible(!isVisible);
          }}
        ></Button>
      </div>
      <ModalBody>
        <Card className="invoice-card">
          <CardBody
            className="transaction-card"
            style={{
              height: "400px",
            }}
          >
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
              </>
            ) : (
              <div
                ref={containerRef}
                className="table-responsive theme-scrollbar recent-wrapper"
                style={{
                  overflowY: "auto",
                  maxHeight: "calc(66vh - 20px)", // Subtract scrollbar width from max height
                  WebkitOverflowScrolling: "touch", // Enable momentum scrolling on iOS
                  scrollbarWidth: "thin", // Specify scrollbar width
                  WebkitBorderRadius: "5px", // For WebKit browsers (Chrome, Safari)
                  MozBorderRadius: "5px", // For Mozilla Firefox
                  borderRadius: "5px", // For other browsers
                  scrollbarColor: "lightgray transparent", // Specify scrollbar color
                }}
                //   onScroll={handleScroll}
              >
                <div className="table-responsive theme-scrollbar recent-wrapper">
                  <Table className="display order-wrapper" id="recent-order">
                    <thead>
                      <tr>
                        {tableHeader.map((data, index) => (
                          <th
                            key={index}
                            style={{ width: data == "View" ? "45%" : "12%" }}
                          >
                            {data}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {dataList.length === 0 ? (
                        <tr>
                          <td colSpan={11} style={{ fontSize: "25px" }}>
                            No Bids Found
                          </td>
                        </tr>
                      ) : (
                        dataList.map((data: any, index: any) => (
                          <tr
                            style={{
                              cursor: "pointer",
                            }}
                            key={index}
                          >
                            <td style={{ width: "11%" }}>{data?._id}</td>
                            <td style={{ width: "12%" }}>
                              {data?.user?.firstName} {data?.user?.lastName}
                            </td>
                            <td style={{ width: "10%" }}>{data?.bidFare}</td>
                            <td style={{ width: "12%" }}>
                              {data?.notesOrInstruction?.slice(0, 25)}{" "}
                              {data?.notesOrInstruction?.length > 25 && "..."}
                            </td>
                            <td style={{ width: "10%" }}>{data.status}</td>
                            <td style={{ width: "45%" }}>
                              <button
                                className="global-table-edit-btn"
                                onClick={() => {
                                  setData(data);
                                  setSingleBidModalOpen(true);
                                }}
                                style={{
                                  marginRight: "5px",
                                  width: "60px",
                                }}
                              >
                                View
                              </button>
                              <button
                                className="global-table-edit-btn"
                                onClick={() => {
                                  setDriverId(data?.user?._id);
                                  setIsDriverModalOpen(true);
                                }}
                                style={{
                                  marginRight: "5px",
                                  width: "100px",
                                }}
                              >
                                View Logistic
                              </button>
                              {data.status === "PLACED" &&
                                getUserRole() == "OWNER" && (
                                  <button
                                    className="global-table-edit-btn"
                                    onClick={() => {
                                      // setData(data);
                                      setBidId(data?._id);
                                      setDriverId(data?.user?._id);
                                      setIsOpenTermsModal(true);
                                    }}
                                    style={{
                                      marginRight: "5px",
                                      width: "70px",
                                    }}
                                  >
                                    {bidId == data._id && status == ""
                                      ? "Loading..."
                                      : "Accept"}
                                  </button>
                                )}
                              {data.status === "PLACED" &&
                                getUserRole() == "OWNER" && (
                                  <button
                                    className="global-table-edit-btn"
                                    onClick={(e) => {
                                      setStatus("REJECTED");
                                      setBidId(data?._id);
                                      acceptOrRejectBid(
                                        e,
                                        id,
                                        data?._id,
                                        "REJECTED",
                                        data?.user?._id
                                      );
                                    }}
                                    style={{
                                      marginRight: "5px",
                                      width: "70px",
                                    }}
                                  >
                                    {bidId == data._id && status == "REJECTED"
                                      ? "Loading..."
                                      : "Reject"}
                                  </button>
                                )}

                              {singleBidModalOpen && (
                                <SingleBidModal
                                  isVisible={singleBidModalOpen}
                                  setIsVisible={setSingleBidModalOpen}
                                  data={data}
                                />
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                    {isOpenTermsModal && (
                      <ShowTermsAndConditionsModal
                        isVisible={isOpenTermsModal}
                        setIsVisible={setIsOpenTermsModal}
                        id={bidId}
                        acceptBid={acceptOrRejectBid}
                        packageId={id}
                        driverId={driverId}
                      />
                    )}
                    {isDriverModalOpen && (
                      <ShowDriverProfileModal
                        isVisible={isDriverModalOpen}
                        setIsVisible={setIsDriverModalOpen}
                        id={driverId}
                      />
                    )}
                  </Table>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </ModalBody>
    </Modal>
  );
};

export default ShowAllBidsModal;
