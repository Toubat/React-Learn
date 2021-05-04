import React, { Component } from "react";

class ListGroup extends Component {
  state = {};

  render() {
    const {
      onGenreChange,
      currentGenre,
      textProperty,
      valueProperty,
      shutDown,
      items,
    } = this.props;

    return (
      <ul className="list-group" style={{ whiteSpace: "nowrap" }}>
        {items.map((item) => {
          return (
            <li
              key={item[valueProperty]}
              onClick={() => onGenreChange(item[textProperty])}
              className={
                !shutDown && currentGenre === item.name
                  ? "list-group-item active"
                  : "list-group-item"
              }
              style={{ cursor: "pointer" }}
              aria-current="true"
            >
              {item[textProperty]}
            </li>
          );
        })}
      </ul>
    );
  }
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
