import Breadcrumbs from "../../../CommonElements/Breadcrumbs/Breadcrumbs";
import PaymentsList from "./PaymentsList";

const Payments = () => {
  return (
    <>
      <Breadcrumbs mainTitle="Payments" parent="Payments" title="" />
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
        <PaymentsList />
      </div>
    </>
  );
};

export default Payments;
