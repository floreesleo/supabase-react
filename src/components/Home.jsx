import { useEffect, useState } from "react";
import { supabase } from "./../supabase/client";
import TasksForm from "./tasks/TasksForm";
import TaskList from "./tasks/TaskList";
import { useNavigate } from "react-router-dom";

import NavBar from "./NavBar";

export default function Home() {
  const navigate = useNavigate();
  const [showTaskDone, setShowTaskDone] = useState(false);

  useEffect(() => {
    if (!supabase.auth.getSession()) {
      navigate("/login");
    }
  }, [navigate]);

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
