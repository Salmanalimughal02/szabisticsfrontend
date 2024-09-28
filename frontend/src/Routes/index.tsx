import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LayoutRoutes from "./LayoutRoutes";

import VerifyOTP from "../Pages/Common/VerifyOTP/VerifyOTP";
import LoginForm from "../Pages/Common/Auth/Auth";
import RegisterForm from "../Pages/Common/Register/Register";
import ForgotPassword from "../Pages/Common/ForgotPassword/ForgotPassword";
import ResetPassword from "../Pages/Common/ResetPassword/ResetPassword";
import { getUserRole } from "../Utilities/globals/globals";
import VerifyOTPForRegistration from "../Pages/Common/VerifyOTPForRegistration/VerifyOTPForRegistration";

const Routers = () => {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter basename={"/"}>
      <Routes>
        {token !== null ? (
          <>
            <Route
              path={`${process.env.PUBLIC_URL}` || "/"}
              element={
                <Navigate
                  to={`${
                    getUserRole() == "SUPER_ADMIN"
                      ? `${process.env.PUBLIC_URL}/drivers`
                      : `${process.env.PUBLIC_URL}/packages`
                  }`}
                />
              }
            />
          </>
        ) : (
          ""
        )}
        <Route
          path={`${process.env.PUBLIC_URL}` || "/"}
          element={<Navigate to={`${process.env.PUBLIC_URL}/drivers`} />}
        />
        <Route path={"/"} element={<PrivateRoute />}>
          <Route path={`/*`} element={<LayoutRoutes />} />
        </Route>

        <Route path="/login/:companyId" element={<PrivateRoute />} />
        <Route
          path={`${process.env.PUBLIC_URL}/login`}
          element={<LoginForm />}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/register`}
          element={<RegisterForm />}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/forgot-password`}
          element={<ForgotPassword />}
        />

        <Route
          path={`${process.env.PUBLIC_URL}/verifyOTP`}
          element={<VerifyOTP />}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/verify-registration-OTP`}
          element={<VerifyOTPForRegistration />}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/reset-password`}
          element={<ResetPassword />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
