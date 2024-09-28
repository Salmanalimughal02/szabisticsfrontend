import Breadcrumbs from "../../../CommonElements/Breadcrumbs/Breadcrumbs";
import DriversList from "./DriversList";

const Drivers = () => {
  return (
    <>
      <Breadcrumbs mainTitle="Drivers" parent="Drivers" title="" />
      <div
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // height: "vh",
        }}
      >
        <DriversList />
      </div>
    </>
  );
};

export default Drivers;
