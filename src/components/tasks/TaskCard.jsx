import { useTask } from "./../../context/TaskContext";

/* eslint-disable react/prop-types */
export default function TaskCard({ task }) {
  const { deleteTask, updateTask } = useTask();

  const handleDelete = () => {
    deleteTask(task.id); // Ya se tiene acceso a los id por medio de task
  };

  const handleToggleDone = () => {
    updateTask(task.id, { done: !task.done });
  };
  return (
    <div>
      <h1>{task.name}</h1>
      <p>{task.done}</p>
      <div>
        <button onClick={() => handleDelete()}>Eliminar</button>
        <button onClick={() => handleToggleDone()}>Editar</button>
      </div>
    </div>
  );
}
