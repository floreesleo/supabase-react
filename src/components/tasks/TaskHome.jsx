import { useState } from "react";
import NavBar from "./../NavBar";
import TasksForm from "./TasksForm";
import TaskList from "./TaskList";

export default function TaskHome() {
  const [showTaskDone, setShowTaskDone] = useState(false);
  return (
    <>
      <NavBar />
      <TasksForm />
      <header>
        <span>Tareas pendientes</span>
        <button onClick={() => setShowTaskDone(!showTaskDone)}>
          Mostrar tareas hechas
        </button>
      </header>
      <TaskList done={showTaskDone} />
    </>
  );
}
