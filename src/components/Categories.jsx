import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const Categories = React.memo(function Categories({
  activeCategory,
  items,
  onClickCategory,
}) {
  return (
    <div className="categories">
      <ul>
        <li
          className={classNames({ active: activeCategory === null })}
          onClick={() => onClickCategory(null)}
        >
          Все
        </li>
        {items.map((name, index) => (
          <li
            className={classNames({ active: activeCategory === index })}
            onClick={() => onClickCategory(index)}
            key={`${name}-${index}`}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
});

Categories.propTypes = {
  activeCategory: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickCategory: PropTypes.func,
};

Categories.defaultProps = { activeCategory: null, items: [] };

export default Categories;
