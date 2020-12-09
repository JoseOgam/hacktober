import React, { useState } from "react";
import axios from "axios"

const LoginPage = () => {
  var [login, setLogin] = useState([]);
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");

  var handleLogin = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password
    }
    axios.post(`/login`, data)
      .then((resp) => {
        localStorage.setItem('token', resp.token)
        console.log(resp)
      })
      .catch((error) => console.log(error))
  
  };
  return (
    <div>
      <h3>Login Page</h3>
      <form onSubmit={handleLogin}>
        <span>
          <label>email : </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="your email"
          />
        </span>
        <span>
          <label>password : </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            type="text"
          />
        </span>
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
