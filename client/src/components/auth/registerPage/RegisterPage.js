import React, { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  var [createUser, setCreateUser] = useState([]);
  var [name, setName] = useState("");
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [confirmPassword, setConfirmPassword] = useState("");

  var handleSubmit = async (e) => {
    e.preventDefault();
    
    const saveData = ({
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    })
     
    const resp = await axios.post(`/register`, saveData)
    console.log(resp.data)
    setName("")

    setEmail("")

    setPassword("")

    setConfirmPassword("")

    setCreateUser([...createUser, [name, email, password, confirmPassword]]);
  };
  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <span>
          <label>Name : </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="please enter your Name"
            type="text"
          />
        </span>
        <span>
          <label>email : </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="please enter your email"
            type="email"
          />
        </span>
        <span>
          <label>password : </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="please enter your password"
            type="text"
          />
        </span>
        <span>
          <label>confirm password : </label>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="please confirm your password"
            type="text"
          />
        </span>
        <button>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
