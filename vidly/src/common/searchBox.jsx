import React, { Component } from "react";

const SearchBox = ({ search, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Search..."
      onChange={(e) => onChange(e.currentTarget.value)}
      value={search}
    />
  );
};

export default SearchBox;
