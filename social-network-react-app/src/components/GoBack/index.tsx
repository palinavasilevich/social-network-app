import React from "react";

import { useNavigate } from "react-router-dom";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

const GoBack = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div
      className="text-default-500 flex items-center gap-2 mb-10 cursor-pointer"
      onClick={handleGoBack}
    >
      <FaRegArrowAltCircleLeft />
      Go Back
    </div>
  );
};

export default GoBack;
