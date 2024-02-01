import React from "react";
import "../Home/Home.scss";
import { FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const Home = () => {
  return (
    <div className=" Home">
      <div className="HomePage">
        <div>
          <h1>Welcome to Home Page</h1>
        </div>
        <div className="HomeIcon">
          <a href="#">
            <FaHome className="HomeIcon" />
          </a>
        </div>
        <div className="CreateUsers">
          <button>
            {" "}
            <NavLink to="/addnewteacher">Add New Teacher</NavLink>
          </button>
          <button>
            {" "}
            <NavLink to="/addnewstudent">Add New Students</NavLink>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
