import React from "react";
import { Route } from "react-router-dom";

import "./scss/app.scss";

import { Header } from "./components";
import { Cart, Home } from "./pages";
import setPizzas from "./redux/actions/pizzas";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetch("http://localhost:3001/pizzas?_order=desc&_sort=price")
      .then((res) => res.json())
      .then((data) => dispatch(setPizzas(data)));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <main className="content">
        <Route exact path="/" component={Home} />
        <Route path="/cart" component={Cart} />
      </main>
    </div>
  );
}

export default App;
