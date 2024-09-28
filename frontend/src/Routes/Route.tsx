import VerifyOTP from "../Pages/Common/VerifyOTP/VerifyOTP";

// Company

import Account from "../Pages/Common/User/Account/Account";
import { ROLES } from "../constants/roles";
import { PERMISSION_VALUES } from "../constants/permissions";
import CreatePackageForm from "../Pages/SuperAdmin/Packages/CreateCompanyForm/CreatePackageForm";
import Packages from "../Pages/SuperAdmin/Packages/Packages";
import Drivers from "../Pages/DashBoard/Drivers/Drivers";
import Payments from "../Pages/DashBoard/Payments/Payments";
import SinglePackage from "../Pages/SuperAdmin/Packages/SinglePackageDetail.tsx/SinglePackage";

const routes = [
  {
    path: `${process.env.PUBLIC_URL}/users/account`,
    Component: <Account />,
    isProtected: true,
    allowedUserRoles: [
      ROLES.COMPANY,
      ROLES.CUSTOMER,
      ROLES.SUPER_ADMIN,
      ROLES.OPERATOR,
    ],
    permissionValue: PERMISSION_VALUES.PROFILE,
  },

  // superAdmin

  // Dashboard
  {
    path: `${process.env.PUBLIC_URL}/drivers`,
    Component: <Drivers />,
    isProtected: true,
    allowedUserRoles: [ROLES.SUPER_ADMIN],
    permissionValue: PERMISSION_VALUES.DASHBOARD,
  },
  {
    path: `${process.env.PUBLIC_URL}/payments`,
    Component: <Payments />,
    isProtected: true,
    allowedUserRoles: [ROLES.SUPER_ADMIN],
    permissionValue: PERMISSION_VALUES.DASHBOARD,
  },

  {
    path: `${process.env.PUBLIC_URL}/packages`,
    Component: <Packages />,
    allowedUserRoles: [ROLES.SUPER_ADMIN],
    isProtected: true,
    permissionValue: "Packages",
  },

  {
    path: `${process.env.PUBLIC_URL}/packages/create-package`,
    Component: <CreatePackageForm />,
    isProtected: true,
    permissionValue: "CreatePackage",
  },
  {
    path: `${process.env.PUBLIC_URL}/packages/package-detail/:packageId`,
    Component: <SinglePackage />,
    isProtected: true,
    permissionValue: "PackageDetail",
  },
  {
    path: `${process.env.PUBLIC_URL}/verifyOTP`,
    Component: <VerifyOTP />,
  },
];

export default routes;
