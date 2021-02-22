import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setCategory,
  setSortBy,
  fetchPizzas,
  addPizzaToCart,
} from "../redux/actions";
import { Categories, SortPopup, PizzaBlock, LoadingBlock } from "../components";

const categoryNames = [
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const sortItems = [
  { name: "популярности", type: "popular", order: "desc" },
  { name: "цене", type: "price", order: "desc" },
  { name: "алфавиту", type: "name", order: "asc" },
];

function Home() {
  const dispatch = useDispatch();
  const { items, isLoaded, category, sortBy, cartItems } = useSelector(
    ({ pizzas, filter, cart }) => {
      return {
        items: pizzas.items,
        isLoaded: pizzas.isLoaded,
        category: filter.category,
        sortBy: filter.sortBy,
        cartItems: cart.items,
      };
    }
  );

  React.useEffect(() => {
    dispatch(fetchPizzas(category, sortBy));
  }, [category, sortBy]);

  const selectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);

  const selectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  const addToCart = (pizzaObj) => {
    dispatch(addPizzaToCart(pizzaObj));
  };

  return (
    <section className="container">
      <div className="content__top">
        <Categories
          items={categoryNames}
          activeCategory={category}
          onClickCategory={selectCategory}
        />
        <SortPopup
          items={sortItems}
          activeSortType={sortBy.type}
          onClickSortType={selectSortType}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? items.map((item) => (
              <PizzaBlock
                key={item.id}
                {...item}
                onClickAddPizza={addToCart}
                addedCount={
                  cartItems[item.id] && cartItems[item.id].items.length
                }
              />
            ))
          : Array(10)
              .fill(0)
              .map((_, index) => <LoadingBlock key={index} />)}
      </div>
    </section>
  );
}

export default Home;
