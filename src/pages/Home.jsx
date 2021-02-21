import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Categories,
  SortPopup,
  PizzaBlock,
  PizzaLoadingBlock,
} from "../components";
import { setCategory, setSortBy } from "../redux/actions/filter";
import { fetchPizzas } from "../redux/actions/pizzas";

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
  const { items, category, isLoaded, sortBy } = useSelector(
    ({ pizzas, filter }) => {
      return {
        items: pizzas.items,
        isLoaded: pizzas.isLoaded,
        category: filter.category,
        sortBy: filter.sortBy,
      };
    }
  );

  React.useEffect(() => {
    dispatch(fetchPizzas(category, sortBy));
  }, [category, sortBy]);

  // console.log(items);

  const selectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);

  const selectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  return (
    <section className="container">
      <div className="content__top">
        <Categories
          onClickCategory={selectCategory}
          items={categoryNames}
          activeCategory={category}
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
          ? items.map((item) => <PizzaBlock key={item.id} {...item} />)
          : Array(10)
              .fill(0)
              .map((_, index) => <PizzaLoadingBlock key={index} />)}
      </div>
    </section>
  );
}

export default Home;
