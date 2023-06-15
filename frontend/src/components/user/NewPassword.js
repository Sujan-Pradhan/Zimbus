import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearErrors, resetPassword } from "../../actions/userAction";
import MetaData from "../layouts/MetaData";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();

  const { error, success, loading } = useSelector(
    (state) => state.forgetPassword
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }

    if (success) {
      alert.success("Password Updated Sucessfully!!😊");
      navigate("/login");
    }
  }, [dispatch, success, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token, formData));
  };
  return (
    <>
      <div className="container container-fluid">
        <MetaData title={"New Password"} />
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form onSubmit={submitHandler} className="shadow-lg">
              <h1 className="mb-3">New Password</h1>
              <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirm_password_field">Confirm Password</label>
                <input
                  type="password"
                  id="confirm_password_field"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                className="btn btn-block py-3"
                type="submit"
                id="new_password_button"
              >
                Set Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPassword;
