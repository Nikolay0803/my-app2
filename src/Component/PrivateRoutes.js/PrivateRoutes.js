import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PrivateRoutes = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default PrivateRoutes;
