import { useState } from "react";
import { useTask } from "./../../context/TaskContext";

export default function TasksForm() {
  const [taskName, setTaskName] = useState("");

  const { createTask, adding } = useTask();

  const handleSubmit = async (e) => {
    e.preventDefault();
    createTask(taskName);
    setTaskName("");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="taskName"
          placeholder="Escribe una tarea"
          onChange={(ev) => setTaskName(ev.target.value)}
          value={taskName}
        />
        <button type="submit" disabled={adding}>
          {adding ? "Añadiendo..." : "Añadir"}
        </button>
      </form>
    </>
  );
}
