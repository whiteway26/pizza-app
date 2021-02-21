import React from "react";
import classNames from "classnames";

function Button({ children, onClick, outline, add }) {
  return (
    <button
      onClick={onClick}
      className={classNames("button", {
        "button--outline": outline,
        "button--add": add,
      })}
    >
      {children}
    </button>
  );
}

export { Button };
