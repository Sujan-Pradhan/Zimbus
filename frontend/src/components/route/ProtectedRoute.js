import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, element: Element, ...rest }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  // if (loading) {
  //   return null;
  // }
  // if (!isAuthenticated) {
  //   navigate("/login");
  //   return null;
  // }
  // if (isAdmin === true && user.role !== "admin") {
  //   return navigate("/")
  // }

  return (
    <>
      {loading === false && (
        <Routes>
          <Route
            {...rest}
            render={(props) => {
              if (isAuthenticated === false) {
                return navigate("/login");
              }
              if (isAdmin === true && user.role !== "admin") {
                return navigate("/");
              }
              return <Element {...props} />;
            }}
          />
        </Routes>
      )}
    </>
    // <Routes>
    //   <Route {...rest} element={<Element />} />
    // </Routes>
  );
};

export default ProtectedRoute;
