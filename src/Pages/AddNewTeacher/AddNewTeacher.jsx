import React, { useState } from "react";
import axios from "axios";
import "../AddNewTeacher/AddNewTeacher.scss";

const AddNewTeacher = ({ onNewTeacherAdded }) => {
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    lastname: "",
    level: "",
    id: "", // Add other fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher((prevTeacher) => ({
      ...prevTeacher,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://65ba13f9b4d53c066551fcf6.mockapi.io/adminpanel",
        newTeacher
      );

      // Clear the form after successful submission
      setNewTeacher({
        name: "",
        lastname: "",
        level: "",
        id: "",
      });

      onNewTeacherAdded(response.data);
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  return (
    <div className="AddNewTeacher">
      <h1>Add New Teacher</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newTeacher.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Lastname:
          <input
            type="text"
            name="lastname"
            value={newTeacher.lastname}
            onChange={handleChange}
          />
        </label>
        <label>
          Level:
          <select name="level" value={newTeacher.level} onChange={handleChange}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>
        {/* Add other fields as needed */}
        <button type="submit">Add Teacher</button>
      </form>
    </div>
  );
};

export default AddNewTeacher;
