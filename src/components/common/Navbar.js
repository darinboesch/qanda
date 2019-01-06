import React from "react";
import { Link } from "react-router";
import Auth from "../../modules/Auth";

const Navbar = () => (
  <nav className={"navbar navbar-default"}>
    <div className="container-fluid">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/">QandA</Link>
      </div>

      {Auth.isUserAuthenticated() ? (
        <div>
          <ul className="nav navbar-nav">
            <li className={location.pathname === "/home" ? "active" : ""}>
              <Link to="/home">Home</Link>
            </li>
            <li className={location.pathname === "/all" ? "active" : ""}>
              <Link to="/all">All</Link>
            </li>
            <li className={location.pathname === "/favorites" ? "active" : ""}>
              <Link to="/favorites">Favorites</Link>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/logout">Log out</Link></li>
          </ul>
        </div>
      ) : (
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/login">Log in</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      )}

    </div>
  </nav>
);

export default Navbar;
