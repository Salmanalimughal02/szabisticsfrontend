import React from "react";

const NoInternetConnection = () => {
  return (
    <div
      style={{
        fontSize: "30px",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "85vh",
      }}
    >
      <div>Internet Connection is Disconnected</div>
    </div>
  );
};

export default NoInternetConnection;
