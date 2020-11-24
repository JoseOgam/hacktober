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
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token")
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post("http://localhost:5000/tokenIsValid", null, { headers: { "Authorization": token } });
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:5000/loggedUser",{ headers: { "Authorization": token } });
        setUserData({
          user: userRes.data,
        });
      };
    };
    checkLoggedIn()
  },[])
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
