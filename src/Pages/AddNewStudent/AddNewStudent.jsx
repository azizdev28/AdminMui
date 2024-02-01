import React, { useState } from "react";
import axios from "axios";
import "../AddNewStudent/AddNewStudent.scss";

const AddNewStudent = ({ onAddStudent }) => {
  const [newStudentData, setNewStudentData] = useState({
    name: "",
    lastname: "",
    group: "",
  });

  const handleInputChange = (e) => {
    setNewStudentData({
      ...newStudentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddStudent = async () => {
    try {
      const response = await axios.post(
        "https://65ba13f9b4d53c066551fcf6.mockapi.io/adminpanel",
        newStudentData
      );
      // Update the list of students in the parent component
      onAddStudent(response.data);
      // Reset the form after successful addition
      setNewStudentData({ name: "", lastname: "", group: "" });
    } catch (error) {
      console.error("Xatolik:", error);
      // Handle error if needed
    }
  };

  return (
    <div className="AddNewStudent">
      <h2>Add New Student</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newStudentData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Lastname:
          <input
            type="text"
            name="lastname"
            value={newStudentData.lastname}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Group:
          <input
            type="text"
            name="group"
            value={newStudentData.group}
            onChange={handleInputChange}
          />
        </label>
        <button type="button" onClick={handleAddStudent}>
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddNewStudent;
