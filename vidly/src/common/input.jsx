import React, { Component } from "react";

class Input extends Component {
  state = {};

  render() {
    const { name, label, error, field, ...rest } = this.props;

    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input id={name} name={name} className="form-control" {...rest} />
        {error && <div class="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Input;
