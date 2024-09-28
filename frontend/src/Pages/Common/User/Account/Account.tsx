import { Container, Row } from "reactstrap";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs/Breadcrumbs";
import { UserEdits, Users } from "../../../../utils/Constant";
import EditProfileForm from "./EditProfileForm/EditProfileForm";
import { useEffect, useState } from "react";
import { getAll } from "../../../../Utilities/api";
import { useDispatch } from "react-redux";
import Skeleton from "../../../Utilities/Skeleton/Skeleton";
import { setUserData } from "../../../../ReaduxToolkit/Reducer/UserSlice";
import Swal from "sweetalert2";
import NoInternetConnection from "../../../Utilities/NoInternetConnection/NoInternetConnection";

import EditMyProfile from "./EditMyProfile/EditMyProfile";
import { GET_PROFILE } from "../../../../Utilities/api/apiEndpoints";

const Account = () => {
  // console.log("legalAttachements", legalAttachements);
  const dispatch = useDispatch();
  const [userDataLoading, setUserDataLoading] = useState(true);

  const [undefinedData, setUndefinedData] = useState<any>(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setIsConnected(false);
  }, []);
  useEffect(() => {
    setUserDataLoading(true);

    getAll({ url: GET_PROFILE }).then((parentData: any) => {
      if (parentData !== undefined) {
        if (!parentData.success) {
          Swal.fire({
            text: `${parentData.message}`,
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          });

          setUserDataLoading(false);
        }
        if (parentData.success) {
          setUndefinedData(false);
          dispatch(setUserData(parentData.data));
          setUserDataLoading(false);
        }
      }
    });
  }, []);

  return (
    <>
      {isConnected ? (
        <NoInternetConnection />
      ) : (
        <div>
          <Breadcrumbs title={UserEdits} mainTitle={UserEdits} parent={Users} />
          <Container fluid>
            <div className="edit-profile">
              {undefinedData ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "80vh",
                    backgroundColor: "white",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "25px",
                      fontWeight: "bold",
                    }}
                  >
                    No Data Found
                  </div>
                </div>
              ) : !userDataLoading ? (
                <Row>
                  <EditMyProfile />
                  <EditProfileForm />
                </Row>
              ) : (
                <div>
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      height: "75vh",
                      // alignItems: "center",
                    }}
                  >
                    {/* <Loader /> */}

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "35%",
                        backgroundColor: "white",
                        marginRight: "20px",
                        borderRadius: "10px",
                        padding: "0px 20px",
                      }}
                    >
                      <Skeleton
                        height="130px"
                        width="100%"
                        marginTop="30px"
                        marginBottom="20px"
                        borderRadius="10px"
                        marginRight="20px"
                      />
                      <Skeleton
                        height="30px"
                        width="50%"
                        marginTop="10px"
                        marginBottom="10px"
                        borderRadius="10px"
                        marginRight="20px"
                      />
                      <Skeleton
                        height="40px"
                        width="50%"
                        marginTop="10px"
                        marginBottom="10px"
                        borderRadius="10px"
                        marginRight="20px"
                      />
                      <Skeleton
                        height="30px"
                        width="50%"
                        marginTop="10px"
                        marginBottom="10px"
                        borderRadius="10px"
                        marginRight="20px"
                      />
                      <Skeleton
                        height="40px"
                        width="50%"
                        marginTop="10px"
                        marginBottom="10px"
                        borderRadius="10px"
                        marginRight="20px"
                      />
                      <Skeleton
                        height="30px"
                        width="50%"
                        marginTop="10px"
                        marginBottom="10px"
                        borderRadius="10px"
                        marginRight="20px"
                      />
                      <Skeleton
                        height="40px"
                        width="50%"
                        marginTop="10px"
                        marginBottom="10px"
                        borderRadius="10px"
                        marginRight="20px"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "65%",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        height: "55vh",
                        padding: "20px 20px",
                      }}
                    >
                      <Skeleton
                        height="75px"
                        width="100%"
                        marginBottom="20px"
                        borderRadius="10px"
                        marginRight="20px"
                      />
                      <Skeleton
                        height="30px"
                        width="100%"
                        marginBottom="20px"
                        borderRadius="10px"
                        marginRight="20px"
                      />
                      <Skeleton
                        height="40px"
                        width="100%"
                        marginBottom="20px"
                        borderRadius="10px"
                        marginRight="20px"
                      />
                      <Skeleton
                        height="30px"
                        width="100%"
                        marginBottom="20px"
                        borderRadius="10px"
                        marginRight="20px"
                      />
                      <Skeleton
                        height="40px"
                        width="100%"
                        marginBottom="20px"
                        borderRadius="10px"
                        marginRight="20px"
                      />
                      <Skeleton
                        height="40px"
                        width="10%"
                        marginBottom="20px"
                        borderRadius="10px"
                        marginLeft="90%"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default Account;
