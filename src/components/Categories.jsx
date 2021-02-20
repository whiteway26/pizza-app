import React, { useState } from "react";
import classNames from "classnames";

const Categories = React.memo(function Categories({ items, onClickItem }) {
  const [activeItem, setActiveItem] = useState(null);

  const handleActiveItem = (index) => {
    setActiveItem(index);
    onClickItem(index);
  };

  return (
    <div className="categories">
      <ul>
        <li
          className={classNames({ active: activeItem === null })}
          onClick={() => setActiveItem(null)}
        >
          Все
        </li>
        {items.map((name, index) => (
          <li
            className={classNames({ active: activeItem === index })}
            onClick={() => handleActiveItem(index)}
            key={`${name}-${index}`}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
