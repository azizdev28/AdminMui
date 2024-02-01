import React from "react";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";

import "../Sidebar/Sidebar.scss";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <div>
      <div className="Sidebar">
        <div>
          <h2>Admin Panel</h2>
        </div>

        <div className="SaidbarIcons">
          <NavLink to="./teachers">
            <FaChalkboardTeacher />
            Teachers
          </NavLink>

          <NavLink to="students">
            <PiStudentBold />
            Studenets
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
