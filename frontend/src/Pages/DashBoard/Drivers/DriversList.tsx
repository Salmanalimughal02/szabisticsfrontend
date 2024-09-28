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
import ViewCNICModal from "./ViewCNICModal";
import {
  APPROVE_OR_UNAPPROVE_DRIVER,
  GET_ALL_DRIVERS,
} from "../../../Utilities/api/apiEndpoints";
import ShowDriverProfileModal from "../../SuperAdmin/Packages/components/ShowDriverProfileModal";
import { dynamicImage } from "../../../Service";

const DriversList = () => {
  const [loading, setLoading] = useState(true);

  const [drivers, setDrivers] = useState([]);
  const [data, setData] = useState(null);
  const [driverId, setDriverId] = useState("");
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);

  useEffect(() => {
    getAll({
      url: GET_ALL_DRIVERS,
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
          setDrivers([]);
          setLoading(false);
        }
        if (data.success) {
          // console.log("hhg");
          setDrivers(data.data);
          setLoading(false);
        }
      }
    });
  }, []);

  const approvedOrDeActivated = async (
    e: any,
    id: any,
    isApproved: any,
    isActivated: any
  ) => {
    e.preventDefault();
    const data = {
      isApproved: isApproved,
      isActive: isActivated,
    };
    try {
      await patch(data, {
        url: `${APPROVE_OR_UNAPPROVE_DRIVER}/${id}`,
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
        }

        if (data.success) {
          Swal.fire({
            text: `${data.message}`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          getAll({
            url: GET_ALL_DRIVERS,
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
                setDrivers([]);
                setLoading(false);
              }
              if (data.success) {
                // console.log("hhg");
                setDrivers(data.data);
                setLoading(false);
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
    }
  };
  const [isHovered, setIsHovered] = useState(false);
  const [idd, setIdd] = useState("");
  const [isViewCNIC, setIsViewCNIC] = useState(false);
  const renderTableRows = () => {
    return drivers?.map((row: any) => (
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
        <td style={{ width: "10%", fontSize: "16px", fontWeight: "normal" }}>
          <img
            width="60px"
            height="60px"
            alt="Driver"
            style={{
              border: "1px solid gray",
              borderRadius: "100px",
              // marginBottom: "25px",
            }}
            src={
              row?.profileImage?.url !== ""
                ? row?.profileImage?.url
                : dynamicImage("user/7.jpg")
            }
          />
        </td>
        <td style={{ width: "20%", fontSize: "16px", fontWeight: "normal" }}>
          {row.firstName} {row.lastName}
        </td>
        <td style={{ width: "25%", fontSize: "16px", fontWeight: "normal" }}>
          {row.emailAddress}
        </td>
        <td style={{ width: "10%", fontSize: "16px", fontWeight: "normal" }}>
          {formatUnderscoredString(row.role)}
        </td>
        <td style={{ width: "40%", fontSize: "16px", fontWeight: "normal" }}>
          <button
            className="global-table-edit-btn"
            onClick={() => {
              console.log(row);

              setIsViewCNIC(true);
              setData(row);
              // navigate(`${process.env.PUBLIC_URL}/packages/package-detail`);
            }}
            style={{
              marginRight: "5px",
              width: "80px",
            }}
          >
            View ID
          </button>
          <button
            className="global-table-edit-btn"
            onClick={() => {
              console.log(row);
              setDriverId(row._id);
              setIsDriverModalOpen(true);
            }}
            style={{
              marginRight: "5px",
              width: "100px",
            }}
          >
            View Logistic
          </button>
          <button
            className="global-table-edit-btn"
            onClick={(e) => {
              console.log(row);
              approvedOrDeActivated(e, row._id, true, row.isActive);
              // dispatch(setPackage(row));
              // navigate(`${process.env.PUBLIC_URL}/packages/package-detail`);
            }}
            disabled={row.isApproved}
            style={{
              marginRight: "5px",
              width: "80px",
              opacity: `${row.isApproved ? "0.5" : "1"}`,
            }}
          >
            {row.isApproved ? "Approved" : "Approve"}
          </button>
          <button
            className="global-table-edit-btn"
            onClick={(e) => {
              console.log(row);
              approvedOrDeActivated(e, row._id, row.isApproved, !row.isActive);
              // dispatch(setPackage(row));
              // navigate(`${process.env.PUBLIC_URL}/packages/package-detail`);
            }}
            style={{
              marginRight: "5px",
              width: "80px",
            }}
          >
            {row.isActive ? "Deactivate" : "Activate"}
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
            <CommonHeader title="All Users" />
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
                ) : drivers?.length > 0 && loading === false ? (
                  <div>
                    <table>
                      <thead>
                        <tr>
                          <th style={{ width: "10%", fontSize: "18px" }}>Image</th>
                          <th style={{ width: "20%", fontSize: "18px" }}>
                            Name
                          </th>
                          <th style={{ width: "25%", fontSize: "18px" }}>
                            Email Address
                          </th>
                          <th style={{ width: "10%", fontSize: "18px" }}>
                            Role
                          </th>
                          <th style={{ width: "40%", fontSize: "18px" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>{renderTableRows()}</tbody>
                    </table>
                  </div>
                ) : (
                  <H7>No Drivers Found</H7>
                )}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Container>
      {isDriverModalOpen && (
        <ShowDriverProfileModal
          isVisible={isDriverModalOpen}
          setIsVisible={setIsDriverModalOpen}
          id={driverId}
        />
      )}

      {isViewCNIC && (
        <ViewCNICModal
          isVisible={isViewCNIC}
          setIsVisible={setIsViewCNIC}
          data={data}
        />
      )}
    </>
  );
};

export default DriversList;
