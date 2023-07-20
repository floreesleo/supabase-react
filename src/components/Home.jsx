//= import { useEffect } from "react";
import { supabase } from "./../supabase/client";
import TasksForm from "./TasksForm";
//= import { useNavigate } from "react-router-dom";

export default function Home() {
  //= const navigate = useNavigate();

  //= useEffect(() => {
  //=   if (!supabase.auth.getSession()) {
  //=     navigate("/login");
  //=   }
  //= }, [navigate]);

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    console.log("cerrar sesion");
  };

  return (
    <>
      <h2>Home</h2>
      <button onSubmit={handleLogOut}>Log Out</button>

      <TasksForm />
    </>
  );
}
