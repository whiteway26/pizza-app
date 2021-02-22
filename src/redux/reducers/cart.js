// const initialState = {
//   items: {},
//   totalCount: 0,
//   totalPrice: 0,
// };

// function cart(state = initialState, action) {
//   const getTotalPrice = (arr) =>
//     arr.reduce((sum, pizza) => sum + pizza.price, 0);

//   switch (action.type) {
//     case "ADD_PIZZA_CART": {
//       const currentPizzaItems = state.items[action.payload.id]
//         ? [...state.items[action.payload.id].currentPizzaItems, action.payload]
//         : [action.payload];

//       const newItems = {
//         ...state.items,
//         [action.payload.id]: {
//           currentPizzaItems,
//           totalCount: currentPizzaItems.length,
//           totalPrice: getTotalPrice(currentPizzaItems),
//         },
//       };

//       const allPizzas = Object.values(newItems)
//         .map((obj) => obj.currentPizzaItems)
//         .flat();

//       return {
//         ...state,
//         items: newItems,
//         totalCount: allPizzas.length,
//         totalPrice: getTotalPrice(allPizzas),
//       };
//     }
//     case "MINUS_CART_ITEM": {
//       const oldItems = state.items[action.payload].currentPizzaItems;
//       const newItems =
//         oldItems.length > 1 ? state.items[action.payload].slice(1) : oldItems;
//       return {
//         ...state,
//         [action.payload]: {
//           items: newItems,
//           totalPrice: getTotalPrice(newItems),
//         },
//       };
//     }
//     case "PLUS_CART_ITEM": {
//       const newItems = [
//         ...state.items[action.payload].currentPizzaItems,
//         state.items[action.payload].currentPizzaItems[0],
//       ];
//       return {
//         ...state,
//         items: {
//           ...state.items,
//           [action.payload]: {
//             currentPizzaItems: newItems,
//             totalPrice: getTotalPrice(newItems),
//           },
//         },
//       };
//     }
//     case "CLEAR_CART":
//       return {
//         items: {},
//         totalCount: 0,
//         totalPrice: 0,
//       };
//     case "REMOVE_CART_ITEM":
//       const newItems = {
//         ...state.items,
//       };
//       const currentTotalPrice = newItems[action.payload].totalPrice;
//       const currentTotalCount =
//         newItems[action.payload].currentPizzaItems.length;

//       delete newItems[action.payload];
//       return {
//         ...state,
//         items: newItems,
//         totalPrice: state.totalPrice - currentTotalPrice,
//         totalCount: state.totalCount - currentTotalCount,
//       };
//     default:
//       return state;
//   }
// }

// export { cart };

// =================================================================================

const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

const _get = (obj, path) => {
  const [firstKey, ...keys] = path.split(".");
  return keys.reduce((val, key) => {
    return val[key];
  }, obj[firstKey]);
};

const getTotalSum = (obj, path) => {
  return Object.values(obj).reduce((sum, obj) => {
    const value = _get(obj, path);
    return sum + value;
  }, 0);
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PIZZA_CART": {
      const currentPizzaItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
        },
      };

      const totalCount = getTotalSum(newItems, "items.length");
      const totalPrice = getTotalSum(newItems, "totalPrice");

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case "REMOVE_CART_ITEM": {
      const newItems = {
        ...state.items,
      };
      const currentTotalPrice = newItems[action.payload].totalPrice;
      const currentTotalCount = newItems[action.payload].items.length;
      delete newItems[action.payload];
      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount,
      };
    }

    case "PLUS_CART_ITEM": {
      const newObjItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      const totalCount = getTotalSum(newItems, "items.length");
      const totalPrice = getTotalSum(newItems, "totalPrice");

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case "MINUS_CART_ITEM": {
      const oldItems = state.items[action.payload].items;
      const newObjItems =
        oldItems.length > 1
          ? state.items[action.payload].items.slice(1)
          : oldItems;
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      const totalCount = getTotalSum(newItems, "items.length");
      const totalPrice = getTotalSum(newItems, "totalPrice");

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case "CLEAR_CART":
      return { totalPrice: 0, totalCount: 0, items: {} };

    default:
      return state;
  }
};

export { cart };
