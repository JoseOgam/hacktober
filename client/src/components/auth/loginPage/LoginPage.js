import React, { useState } from "react";

const LoginPage = () => {
  var [login, setLogin] = useState([]);
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");

  var handleLogin = (e) => {
    e.preventDefault();
    setLogin([...login, [email, password]]);
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
