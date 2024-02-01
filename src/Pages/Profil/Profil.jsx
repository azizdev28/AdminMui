import React, { useState } from "react";
import "../Profil/Profil.scss";
import { RiAdminFill } from "react-icons/ri";
import EditProfil from "../../components/EditProfil/EditProfil";

const Profil = () => {
  const [isEditing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Azizbek Abduhakimov",
    bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    phoneNumber: "998930766923",
    telegram: "@https://t.me/abduhakimoff_devv",
  });

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleEditClose = () => {
    setEditing(false);
  };

  const handleSave = (updatedData) => {
    setProfileData(updatedData);
    setEditing(false);
  };

  return (
    <div className="Profil">
      <div className="ProfilPage">
        <div>
          <RiAdminFill className="AdminProfil" />
        </div>
        <div className="AdminInfo">
          <h2>{profileData.name}</h2>
          <p>{profileData.bio}</p>
          <div className="AdminCall">
            <a href={`tel:${profileData.phoneNumber}`}>My Number</a>
            <a
              href={`https://t.me/${profileData.telegram}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram
            </a>
          </div>
          <button onClick={handleEditClick} className="EditBtn">
            Edit
          </button>
        </div>
      </div>
      <div>
        {isEditing && (
          <EditProfil
            onClose={handleEditClose}
            onSave={handleSave}
            initialData={profileData}
          />
        )}
      </div>
    </div>
  );
};

export default Profil;
