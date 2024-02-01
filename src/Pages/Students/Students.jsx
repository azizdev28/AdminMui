import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Students/Students.scss";
import Pagination from "../../components/Pagination/Pagination";
import EditStudent from "../../components/EditStudent/EditStudent";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [editingStudentId, setEditingStudentId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://65ba13f9b4d53c066551fcf6.mockapi.io/adminpanel"
        );
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Xatolik:", error);
        setError("Ma'lumotni olishda xatolik yuz berdi.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const filteredStudents = students
    .filter((student) => {
      const fullName = `${student.name} ${student.lastname}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    })
    .filter((student) => {
      if (selectedGroup === "all") {
        return true;
      }
      return student.group.toLowerCase() === selectedGroup.toLowerCase();
    });

  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
    setCurrentPage(1);
  };

  const handleEdit = (id) => {
    setEditingStudentId(id);
  };

  const handleCancelEdit = () => {
    setEditingStudentId(null);
  };

  const handleSaveEdit = async (editedStudentData) => {
    try {
      await axios.put(
        `https://65ba13f9b4d53c066551fcf6.mockapi.io/adminpanel/${editingStudentId}`,
        editedStudentData
      );
      setEditingStudentId(null);
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://65ba13f9b4d53c066551fcf6.mockapi.io/adminpanel/${id}`
      );
      const updatedStudents = students.filter((student) => student.id !== id);
      setStudents(updatedStudents);
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  return (
    <div className="StItem">
      <div className="Students">
        <div className="StudentsNavbar">
          <h1>Students List</h1>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <select value={selectedGroup} onChange={handleGroupChange}>
            <option value="all">All Groups</option>
            <option value="group1">Group 1</option>
            <option value="group2">Group 2</option>
          </select>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : students.length === 0 ? (
          <p>No students found</p>
        ) : (
          <div className="StudentsCard">
            <ul>
              {currentStudents.map((student) => (
                <li key={student.id}>
                  <h3 className="StudentLine">
                    <span>Name:</span> {student.name}{" "}
                  </h3>

                  <h3 className="StudentLine">
                    <span>Lastname:</span> {student.lastname}{" "}
                  </h3>
                  <p className="StudentLine">
                    <span>Group:</span>
                    {student.group}
                  </p>
                  <button
                    onClick={() => handleEdit(student.id)}
                    className="btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="btn"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <div>
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(
                  filteredStudents.length / studentsPerPage
                )}
                onPageChange={paginate}
              />
            </div>
          </div>
        )}
      </div>

      <div className="CardSt">
        {editingStudentId && (
          <EditStudent
            studentId={editingStudentId}
            onCancel={handleCancelEdit}
            onSave={handleSaveEdit}
          />
        )}
      </div>
    </div>
  );
};

export default Students;
