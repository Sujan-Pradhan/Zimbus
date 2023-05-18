import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchField, setSearchField] = useState("");

  const navigate = useNavigate()

  const searchHandler = (e) => {
    e.preventDefault();

    if (searchField.trim()) {
      navigate(`/search/${searchField}`);
    } else {
      navigate("/");
    }
  };
  return (
    <>
      <form onSubmit={searchHandler}>
        <div className="input-group">
          <input
            type="text"
            id="search_field"
            className="form-control"
            placeholder="Enter Product Name ..."
            onChange={(e) => {
              setSearchField(e.target.value);
            }}
          />
          <div className="input-group-append">
            <button id="search_btn" className="btn">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Search;
