import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = (props) => {
  const { itemCount, pageSize, onPageChange, currentPage } = props;
  const numPages = Math.ceil(itemCount / pageSize);
  if (numPages === 1) return null;
  const pages = _.range(1, numPages + 1);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <span className="page-link">{page}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
