import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar";
import Loader from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, users } = useSelector(
    (state) => state.allUsersReducer
  );
  const { isDeleted } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(allUsers());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("User Deleted Successfully");
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [alert, dispatch, error, isDeleted]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "User ID",
          field: "id",
          sort: "des",
        },
        {
          label: "Name",
          field: "name",
          sort: "des",
        },
        {
          label: "Email",
          field: "email",
          sort: "des",
        },
        {
          label: "Role",
          field: "role",
          sort: "des",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        actions: (
          <>
            <Link
              to={`/admin/user/${user._id}`}
              className="btn btn-primary py-1 px-3"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteUserHandler(user._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });
    return data;
  };
  return (
    <>
      <MetaData title={"All Users"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <>
            <h1 className="my-5">All Users</h1>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setUsers}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default UsersList;
