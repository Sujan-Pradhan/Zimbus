import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  if (loading) {
    return null;
  }
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return (
      <Routes>
        <Route {...rest} element={ <Element />} />
      </Routes>
  );
};

export default ProtectedRoute;
