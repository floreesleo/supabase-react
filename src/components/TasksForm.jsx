import { useState } from "react";
import { supabase } from "./../supabase/client";

export default function TasksForm() {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = supabase.auth.getSession(); //! debe jalar los datos del usuario, especificamente el id
      await supabase.from("tasks").insert({
        name: taskName,
        userId: user.id,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="taskName"
          placeholder="Escribe una tarea"
          onChange={(ev) => setTaskName(ev.target.value)}
        />
        <button>Añadir</button>
      </form>
    </>
  );
}
