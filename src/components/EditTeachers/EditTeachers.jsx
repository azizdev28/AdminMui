import React, { useState, useEffect } from "react";
import axios from "axios";
import "../EditTeachers/EditTeachers.scss";

const TeacherEdit = ({ teacherId, onCancel, onSave }) => {
  const [editedTeacher, setEditedTeacher] = useState({
    name: "",
    lastname: "",
    level: "",
    // Add other fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTeacher((prevTeacher) => ({
      ...prevTeacher,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `https://65ba13f9b4d53c066551fcf6.mockapi.io/adminpanel/${teacherId}`,
        editedTeacher
      );
      onSave();
    } catch (error) {
      console.error("Xatolik:", error);
      // Handle error if needed
    }
  };

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(
          `https://65ba13f9b4d53c066551fcf6.mockapi.io/adminpanel/${teacherId}`
        );
        setEditedTeacher(response.data);
      } catch (error) {
        console.error("Xatolik:", error);
        // Handle error if needed
      }
    };

    fetchTeacher();
  }, [teacherId]);

  return (
    <div className="EditTeacher">
      <h2>Edit Teacher</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={editedTeacher.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Lastname:
        <input
          type="text"
          name="lastname"
          value={editedTeacher.lastname}
          onChange={handleChange}
        />
      </label>
      <label>
        Level:
        <select
          name="level"
          value={editedTeacher.level}
          onChange={handleChange}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </label>
      {/* Add other fields as needed */}
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default TeacherEdit;
