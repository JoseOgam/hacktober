import React from "react";
import { Route } from "react-router-dom";

import "./App.css";
import NavBar from "./components/common/NavBar";
import HomePage from "./components/homePage/HomePage";
import LoginPage from "./components/auth/loginPage/LoginPage";
import RegisterPage from "./components/auth/registerPage/RegisterPage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Route path="/" component={HomePage} exact />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
    </div>
  );
}

export default App;
