import { useEffect } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  // console.log(token);

  const { companyId } = useParams();

  useEffect(() => {
    // Save companyId to localStorage
    // console.log("userId except IF", companyId);
    if (companyId) {
      // console.log("userId in IF", companyId);
      localStorage.setItem("userId", companyId);
    }
  }, [companyId]);

  // Check if companyId is saved in localStorage
  const storedCompanyId = localStorage.getItem("userId");

  return token !== null ? (
    <Outlet />
  ) : storedCompanyId ? (
    // <Outlet />
    <Navigate to="/login" />
  ) : (
    <Navigate to="/login" />
  );

  // return <Outlet />;
};

export default PrivateRoute;
