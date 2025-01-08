import React, { useState } from "react";

const ParticipantForm = ({ addParticipant }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") return;
    addParticipant(name.trim());
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del participante"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
};

export default ParticipantForm;
