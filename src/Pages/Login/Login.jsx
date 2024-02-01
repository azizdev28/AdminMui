// Login.jsx
import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (username && password) {
      setUser(username);
      navigate("/");
    } else {
      alert("Please enter your username and password");
    }
  };

  return (
    <div className="Login">
      <div>
        <h2>Login Page</h2>
      </div>
      <div className="LoginForm">
        <form>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username..."
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password..."
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={handleClick}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
