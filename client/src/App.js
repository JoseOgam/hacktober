import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios"
import "./App.css";
import NavBar from "./components/common/NavBar";
import HomePage from "./components/homePage/HomePage";
import LoginPage from "./components/auth/loginPage/LoginPage";
import RegisterPage from "./components/auth/registerPage/RegisterPage";
import UserContext from "./context/UserContext"

function App() {
  const { userData, setUserData } = useState({
    token: undefined,
    user: undefined
  })
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token")
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post("/tokenIsValid", null, { headers: { "Authorization": token } });
     console.log(tokenRes.data)
    }
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
     </Switch>
     </UserContext.Provider>
    </div>
  );
}

export default App;
