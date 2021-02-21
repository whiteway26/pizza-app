import React from "react";
import { Route } from "react-router-dom";

import "./scss/app.scss";

import { Header } from "./components";
import { Home, Cart } from "./pages";

function App() {
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
