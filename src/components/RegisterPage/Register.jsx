import React from "react";
import "../RegisterPage/Register.scss";

const Register = () => {
  return (
    <div className="Register">
      <h1>Register Page</h1>
      <div className="RegisterCard">
        <form>
          <label>
            <input type="text" placeholder="Username" />
          </label>
          <label>
            <input type="number" placeholder="Phone Number" />
          </label>
          <label>
            <input type="password" placeholder="Password" />
          </label>
        </form>
      </div>
    </div>
  );
};

export default Register;
