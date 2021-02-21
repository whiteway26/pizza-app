const initialState = {
  items: {},
  totalCount: 0,
  totalPrice: 0,
};

function cart(state = initialState, action) {
  switch (action.type) {
    case "ADD_PIZZA_CART": {
      const newItems = {
        ...state.items,
        [action.payload.id]: state.items[action.payload.id]
          ? [...state.items[action.payload.id], action.payload]
          : [action.payload],
      };
      const allPizzas = Object.values(newItems).flat();

      return {
        ...state,
        items: newItems,
        totalCount: allPizzas.length,
        totalPrice: allPizzas.reduce((sum, pizza) => sum + pizza.price, 0),
      };
    }
    default:
      return state;
  }
}

export { cart };
