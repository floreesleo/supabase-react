import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
//! import Login from "./components/Login";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import UserHome from "./components/adminisitrador/UserHome";
import Contactos from "./components/contactos/Contactos";
import Perfil from "./components/perfil/Perfil";
import TaskHome from "./components/tasks/TaskHome";
import ArchivosHome from "./components/archivos/ArchivosHome";
import Signup from "./components/autenticacion/Signup";
import Login from "./components/autenticacion/Login";
import ForgotPassword from "./components/autenticacion/ForgotPassword";

import { supabase } from "./supabase/client";

import { TaskContextProvider } from "./context/TaskContext";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("EVENTO DE SUPABASE ", event);
        if (session == null) {
          navigate("/login", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }
    );
    return () => {
      authListener.subscription;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TaskContextProvider>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<UserHome />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/tasks" element={<TaskHome />} />
          <Route path="/tasks" element={<TaskHome />} />
          <Route path="/files" element={<ArchivosHome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </TaskContextProvider>
    </>
  );
}

export default App;
