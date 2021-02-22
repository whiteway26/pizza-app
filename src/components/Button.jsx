import React from "react";
import classNames from "classnames";

function Button({ children, onClick, outline, add, circle }) {
  return (
    <button
      onClick={onClick}
      className={classNames("button", {
        "button--outline": outline,
        "button--add": add,
        "button--circle": circle,
      })}
    >
      {children}
    </button>
  );
}

export { Button };
