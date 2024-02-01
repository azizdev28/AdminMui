import React, { useState } from "react";
import "../EditProfil/EditProfil.scss";

const EditProfil = ({ onClose, onSave, initialData }) => {
  const [name, setName] = useState(initialData.name);
  const [bio, setBio] = useState(initialData.bio);
  const [phoneNumber, setPhoneNumber] = useState(initialData.phoneNumber);
  const [telegram, setTelegram] = useState(initialData.telegram);

  const handleSave = () => {
    const updatedData = {
      name,
      bio,
      phoneNumber,
      telegram,
    };
    onSave(updatedData);
  };

  return (
    <div className="EditProfile">
      <h2>Edit Profile</h2>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Bio:
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
      </label>
      <label>
        Phone Number:
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
      <label>
        Telegram:
        <input
          type="text"
          value={telegram}
          onChange={(e) => setTelegram(e.target.value)}
        />
      </label>
      <div className="buttons">
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default EditProfil;
