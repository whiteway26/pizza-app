import React, { useState } from "react";
import classNames from "classnames";

// class Categories extends React.Component {
//   state = {
//     activeItem: null,
//   };

//   setActiveItem(index) {
// this.setState({
//   activeItem: index,
// });
// this.state.activeItem = index;
// this.forceUpdate();
//   }

//   render() {
//     const { items, onClickItem } = this.props;
//     return (
//       <div className="categories">
//         <ul>
//           {items.map((name, index) => (
//             <li
//               onClick={() => this.setActiveItem(index)}
//               className={this.state.activeItem === index ? "active" : ""}
//               key={`${name}-${index}`}
//             >
//               {name}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

function Categories({ items, onClickItem }) {
  const [activeItem, setActiveItem] = useState(null);

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
            onClick={() => setActiveItem(index)}
            key={`${name}-${index}`}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
