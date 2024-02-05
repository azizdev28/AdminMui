import React, { useState, useEffect } from "react";
import axios from "axios";
import "../EditStudent/EditStudent.scss";

const EditStudent = ({ studentId, onCancel, onSave }) => {
  const [editedStudentData, setEditedStudentData] = useState({});
  const [originalStudentData, setOriginalStudentData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://65ba13f9b4d53c066551fcf6.mockapi.io/adminpanel/${studentId}`
        );
        setOriginalStudentData(response.data);
        setEditedStudentData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Xatolik:", error);
        setError("Ma'lumotni olishda xatolik yuz berdi.");
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  const handleInputChange = (e) => {
    setEditedStudentData({
      ...editedStudentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `https://65ba13f9b4d53c066551fcf6.mockapi.io/adminpanel/${studentId}`,
        editedStudentData
      );

      onSave(editedStudentData);
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  const handleCancel = () => {
    setEditedStudentData(originalStudentData);
    onCancel();
  };

  return (
    <div className="EditStudent">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="EditForm">
          <h2>Edit Student</h2>
          <form className="EditStudentSe">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editedStudentData.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Lastname:
              <input
                type="text"
                name="lastname"
                value={editedStudentData.lastname}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Group:
              <input
                type="text"
                name="group"
                value={editedStudentData.group}
                onChange={handleInputChange}
              />
            </label>
            <div className="saveCancel">
              <button type="button" onClick={handleSave} className="Save">
                Save
              </button>
              <button type="button" onClick={handleCancel} className="Cancel">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditStudent;
