import { Button, Card, CardBody, Col } from "reactstrap";
import Swal from "sweetalert2";
import alertTypes from "./AlertType";
import { deleteSingle, getAll } from "../api";
import { setFilterPackages, setPackages } from "../../ReaduxToolkit/Reducer/CompanySlice";

const deleteAlert = (
  alertData: alertTypes,
  id: any,
  type: any,
  dispatch: any
) => {
  return Swal.fire({
    title: alertData.title,
    text: alertData.text,
    icon: "warning",
    showCancelButton: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      // loading true
      var uri;
      if (type === "packageType") {
        uri = ``;
      }
      // else if (type === "cityType") {
      //   uri = `${DELETE_CITY}`;
      // }


      try {
        Swal.fire({
          text: "Loading...",
          icon: "info",
          // timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
        });

        await deleteSingle({ url: `${uri}/${id}` }).then((data: any) => {
          if (!data.success) {
            setTimeout(() => {
              Swal.fire({
                text: `${data.message}`,
                icon: "error",
                timer: 2000,
              });
            }, 2000);
          }
          if (data.success) {
            // console.log(data);

            setTimeout(() => {
              Swal.fire({
                text: `${data.message}`,
                icon: "success",
                timer: 2000,
              });
            }, 2000);

            if (type === "packageType") {
              getAll({
                url: "http://localhost:8080/api/v1/package/get-all-packages",
              }).then((data: any) => {
                // console.log("api call --- >", data);
                if (data == undefined) {
                  dispatch(setPackages([]));
                  dispatch(setFilterPackages([]));
                }

                if (data !== undefined) {

                  if (data.success) {
                    // console.log("hhg");
                    dispatch(setPackages(data.data));
                    dispatch(setFilterPackages(data.data));
                  }
                  if (!data.success) {
                    dispatch(setPackages([]));
                    dispatch(setFilterPackages([]));
                  }
                } else {
                  // console.log("ier67i");
                }
              });
            }



            // loading false
          }
        });
        // Handle successful post creation (e.g., show a success message, redirect, etc.)
      } catch (error) {
        // Handle error (e.g., show an error message)
        // console.error("Error creating post:", error);
        // loading false
      }
    }
  });
};

export default deleteAlert;
