import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Teachers/Teachers.scss";
import Pagination from "../../components/Pagination/Pagination";
import EditTeachers from "../../components/EditTeachers/EditTeachers";
import AddNewTeacher from "../AddNewTeacher/AddNewTeacher";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [teachersPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [editingTeacherId, setEditingTeacherId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://65ba13f9b4d53c066551fcf6.mockapi.io/adminpanel"
        );
        setTeachers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Xatolik:", error);
        setError("Ma'lumotni olishda xatolik yuz berdi.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;

  const filteredTeachers = teachers
    .filter((teacher) => {
      const fullName = `${teacher.name} ${teacher.lastname}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    })
    .filter((teacher) => {
      if (selectedLevel === "all") {
        return true;
      }
      return teacher.level.toLowerCase() === selectedLevel.toLowerCase();
    });

  const currentTeachers = filteredTeachers.slice(
    indexOfFirstTeacher,
    indexOfLastTeacher
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
    setCurrentPage(1);
  };

  const handleEdit = (id) => {
    setEditingTeacherId(id);
  };

  const handleCancelEdit = () => {
    setEditingTeacherId(null);
  };

  const handleSaveEdit = () => {
    setEditingTeacherId(null);
    // Refresh data or perform other actions if needed
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://65ba13f9b4d53c066551fcf6.mockapi.io/adminpanel/${id}`
      );
      const updatedTeachers = teachers.filter((teacher) => teacher.id !== id);
      setTeachers(updatedTeachers);
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  const handleNewTeacherAdded = (newTeacher) => {
    setTeachers((prevTeachers) => [...prevTeachers, newTeacher]);
  };

  return (
    <div className="Teacher">
      <div className="TeacherPage">
        <div className="CardNavbar">
          <h1>Teachers Page</h1>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <select value={selectedLevel} onChange={handleLevelChange}>
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="TeachersCard">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : currentTeachers.length === 0 ? (
            <p>No data found</p>
          ) : (
            currentTeachers.map((teacher) => (
              <div key={teacher.id} className="CardLine">
                <img src={teacher.avatar} alt={`Avatar of ${teacher.name}`} />
                <h2 className="Line">{teacher.name}</h2>
                <p className="Line">{teacher.lastname}</p>
                <p className="Line">ID: {teacher.id}</p>
                <p className="Line">Level: {teacher.level}</p>
                <button onClick={() => handleEdit(teacher.id)}>Edit</button>
                <button onClick={() => handleDelete(teacher.id)}>Delete</button>
              </div>
            ))
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredTeachers.length / teachersPerPage)}
          onPageChange={paginate}
        />
      </div>

      <div className="Editing">
        {editingTeacherId && (
          <EditTeachers
            teacherId={editingTeacherId}
            onCancel={handleCancelEdit}
            onSave={handleSaveEdit}
          />
        )}
      </div>

      {/* <AddNewTeacher onNewTeacherAdded={handleNewTeacherAdded} /> */}
    </div>
  );
};

export default Teachers;
