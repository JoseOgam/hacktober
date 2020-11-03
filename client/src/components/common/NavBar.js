import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/authOptions";

const NavBar = () => {
  return (
    <div>
      <header id="Header">
          <Link className="title" to="/">
            <h2>Mern Auth system</h2>
          </Link>
          <AuthOptions />
     </header>
    </div>
  );
};
export default NavBar;
