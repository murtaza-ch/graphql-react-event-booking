import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import AuthContext from "../../context/auth-Context";

const Navbar = props => (
  <AuthContext.Consumer>
    {(context) => {
      return (
        <header className="main-navigation">
          <div className="main-navigation-logo">
            <h1>EasyEvent</h1>
          </div>
          <nav className="main-navigation-items">
            <ul>
              {!context.token && (
                <li>
                  <NavLink to="/auth">Authenticate</NavLink>
                </li>
              )}
              <li>
                <NavLink to="/events">Events</NavLink>  
              </li>
              {context.token && (
                <>
                <li>
                  <NavLink to="/bookings">Bookings</NavLink>
                </li>
                <li>
                  <button onClick={context.logout}>Logout</button>
                </li>
                </>
              )}
            </ul>
          </nav>
        </header>
      );
    }}
  </AuthContext.Consumer>
);

export default Navbar;
