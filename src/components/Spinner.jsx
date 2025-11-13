import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <span className="loading loading-infinity loading-lg text-primary"></span>
    </div>
  );
};

export default Spinner;