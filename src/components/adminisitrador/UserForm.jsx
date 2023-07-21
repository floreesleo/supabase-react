import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTask } from "../../context/TaskContext";

export default function CrearAdmin() {
  const [Nombre, setNombre] = useState("");
  const [Usuario, setUsuario] = useState("");

  const { createUser, adding } = useTask();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    createUser(Nombre, Usuario);
    setNombre("");
    setUsuario("");
    navigate("/");
  };

  return (
    <>
      <h1>Crear Usuario</h1>
      <form onSubmit={handleSubmit}>
        <label className="form-label">Nombre</label>
        <input
          type="text"
          name="userName"
          placeholder="Nombre del usuario"
          onChange={(e) => setNombre(e.target.value)}
          value={Nombre}
        />

        <label className="form-label">Usuario</label>
        <input
          type="text"
          name="userName"
          placeholder="Nombre del usuario"
          onChange={(e) => setUsuario(e.target.value)}
          value={Usuario}
        />
        <button type="submit" disabled={adding}>
          {adding ? "Añadiendo..." : "Añadir"}
        </button>
      </form>
    </>
  );
}
