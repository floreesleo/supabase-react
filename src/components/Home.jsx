import { useEffect, useState } from "react";
import { supabase } from "./../supabase/client";
import TasksForm from "./tasks/TasksForm";
import TaskList from "./tasks/TaskList";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [showTaskDone, setShowTaskDone] = useState(false);

  useEffect(() => {
    if (!supabase.auth.getSession()) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>Home</h2>
      <Button variant="link" onClick={handleLogOut}>
        Cerrar sesión
      </Button>

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
