import { Header } from "./components";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import "./scss/app.scss";

import { Cart, Home } from "./pages";
import { useEffect, useState } from "react";

function App() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/db.json")
      .then((res) => res.json())
      .then((data) => setPizzas(data.pizzas));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <main className="content">
        <Route exact path="/" render={() => <Home items={pizzas} />} />
        <Route path="/cart" render={Cart} />
      </main>
    </div>
  );
}

export default App;
