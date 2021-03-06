import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios"
import "./App.css";
import NavBar from "./components/common/NavBar";
import HomePage from "./components/homePage/HomePage";
import LoginPage from "./components/auth/loginPage/LoginPage";
import RegisterPage from "./components/auth/registerPage/RegisterPage";
import UserContext from "./context/UserContext"
import Dashboard from "./components/auth/dashboard/dashboard";

function App() {
  const [ userData, setUserData ] = useState({
    token: undefined,
    user: undefined,
  })
  useEffect(() => { },[])
  return (
    <div className="App">
      <UserContext.Provider value={{ userData, setUserData }}>
      <NavBar />
      <Switch>
      <Route path="/" component={HomePage} exact />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard" component={Dashboard} />
     </Switch>
     </UserContext.Provider>
    </div>
  );
}

export default App;
