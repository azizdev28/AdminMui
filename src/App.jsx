// App.jsx
import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Sidebar from "./components/Sidebar/Sidebar";
import { Header } from "./components/Header/Header";
import Teachers from "./Pages/Teachers/Teachers";
import Students from "./Pages/Students/Students";
import Statistika from "./Pages/Statistika/Statistika";
import Profil from "./Pages/Profil/Profil";
import AddNewTeacher from "./Pages/AddNewTeacher/AddNewTeacher";
import AddNewStudent from "./Pages/AddNewStudent/AddNewStudent";
import Login from "./Pages/Login/Login";

const App = () => {
  const [user, setUser] = useState("");
  const isUserLoggedIn = !!user;

  return (
    <>
      <BrowserRouter>
        <Sidebar />
        <Header user={user} />

        <Routes>
          <Route
            path="/"
            element={
              isUserLoggedIn ? <Home user={user} /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/teachers" element={<Teachers user={user} />} />
          <Route path="/students" element={<Students user={user} />} />
          <Route path="/statistika" element={<Statistika user={user} />} />
          <Route path="/profil" element={<Profil />} />
          <Route
            path="/addnewteacher"
            element={<AddNewTeacher user={user} />}
          />
          <Route
            path="/addnewstudent"
            element={<AddNewStudent user={user} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
