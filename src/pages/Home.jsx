import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Categories, SortPopup, PizzaBlock } from "../components";
import { setCategory } from "../redux/actions/filter";

const categoryNames = [
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const sortItems = [
  { name: "популярности", type: "popular" },
  { name: "цене", type: "price" },
  { name: "алфавиту", type: "alphabet" },
];

function Home() {
  const dispatch = useDispatch();

  const { items, sortBy } = useSelector(({ pizzas, filter }) => {
    return {
      items: pizzas.items,
      sortBy: filter.sortBy,
    };
  });

  // console.log(items);

  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  });

  return (
    <section className="container">
      <div className="content__top">
        <Categories onClickItem={onSelectCategory} items={categoryNames} />
        <SortPopup items={sortItems} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {items && items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </section>
  );
}

export default Home;
