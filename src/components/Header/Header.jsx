import React from "react";
import "../Header/Header.scss";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <div>
      <div className="Header">
        <div className="Logo">
          <h2>A</h2>
          <a href="#">Abduhakimoff blog's</a>
        </div>
        <div className="LinkLine">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/profil">Profil</NavLink>
          <NavLink to="./statistika">Statistika</NavLink>
        </div>
        <div>
          <div className="UserName">
            <NavLink to="/login">
              <button>Log Out</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
