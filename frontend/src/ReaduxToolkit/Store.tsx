import { configureStore } from "@reduxjs/toolkit";
import LayoutSlice from "./Reducer/LayoutSlice";
import ThemeCustomizerSlice from "./Reducer/ThemeCustomizerSlice";
import FilterSlice from "./Reducer/FilterSlice";
import ProductSlice from "./Reducer/ProductSlice";
import PackageSlice from "./Reducer/PackageSlice";
import NoDataFoundSlice from "./Reducer/NoDataFoundSlice";
import CompanySlice from "./Reducer/CompanySlice";
import UserSlice from "./Reducer/UserSlice";
import MonitoringSlice from "./Reducer/MonitoringSlice";
import OperatorSlice from "./Reducer/OperatorSlice";
import AlertsSlice from "./Reducer/AlertsSlice";
import PersonalizationSlice from "./Reducer/PersonalizationSlice";
import PermissionSlice from "./Reducer/PermissionSlice";
import DashboardSlice from "./Reducer/DashboardSlice";

const Store = configureStore({
  reducer: {
    layout: LayoutSlice,
    themeCustomizer: ThemeCustomizerSlice,
    filterData: FilterSlice,
    product: ProductSlice,

    packages: PackageSlice,
    noDataFound: NoDataFoundSlice,
    companies: CompanySlice,
    user: UserSlice,
    monitoring: MonitoringSlice,
    operators: OperatorSlice,
    alerts: AlertsSlice,
    personalization: PersonalizationSlice,
    userPermissions: PermissionSlice,
    dashboard: DashboardSlice,
  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
