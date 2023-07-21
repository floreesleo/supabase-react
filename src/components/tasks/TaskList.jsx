import { useEffect } from "react";
import { useTask } from "./../../context/TaskContext";
import TaskCard from "./TaskCard";

// eslint-disable-next-line react/prop-types
export default function TaskList({ done = false }) {
  const { tasks, getTasks, loading } = useTask();

  useEffect(() => {
    getTasks(done);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  function renderTasks() {
    if (loading) {
      return <p>Cargando...</p>;
    } else if (tasks.length === 0) {
      return <p>Sin tareas encontradas</p>;
    } else {
      return (
        <div>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      );
    }
  }

  return <div>{renderTasks()}</div>;
}
