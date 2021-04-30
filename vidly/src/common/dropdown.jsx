import React, { Component } from "react";
import { getGenres } from "../services/fakeGenreService";

const DropDown = ({ name, label, error, onChange, options }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        className="form-control"
        onChange={onChange}
      >
        <option value="" />
        {options.map((item) => (
          <option key={item._id}>{item.name}</option>
        ))}
      </select>
      {error && <div class="alert alert-danger">{error}</div>}
    </div>
  );
};

export default DropDown;
