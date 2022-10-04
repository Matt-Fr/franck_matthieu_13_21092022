import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
//allows to not access the profile page if not logged in

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);

  if (!user) {
    return <Navigate to={"/"} />;
  }
  return children;
};

export default ProtectedRoute;
