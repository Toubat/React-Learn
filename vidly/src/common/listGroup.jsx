import React from "react";
import { getGenres } from "../services/fakeGenreService";

const ListGroup = (props) => {
  const { onGenreChange, currentGenre, textProperty, valueProperty } = props;
  const items = [
    { [valueProperty]: "all-genres", [textProperty]: "All Genres" },
    ...getGenres(),
  ];
  console.log(currentGenre);
  return (
    <ul className="list-group" style={{ whiteSpace: "nowrap" }}>
      {items.map((item) => {
        return (
          <li
            key={item[valueProperty]}
            onClick={() => onGenreChange(item[textProperty])}
            className={
              currentGenre === item.name
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
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
