// import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Perfil from "./components/perfil/Perfil";
import Usuarios from "./components/crud/Crud";
//= import Signup from "./components/autenticacion/Signup";
//= import Login from "./components/autenticacion/Login";
//= import ForgotPassword from "./components/autenticacion/ForgotPassword";

// import { supabase } from "./supabase/client";

import { TaskContextProvider } from "./context/TaskContext";

function App() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const { data: authListener } = supabase.auth.onAuthStateChange(
  //     async (event, session) => {
  //       console.log("EVENTO DE SUPABASE ", event);
  //       if (session == null) {
  //         navigate("/login", { replace: true });
  //       } else {
  //         navigate("/", { replace: true });
  //       }
  //     }
  //   );
  //   return () => {
  //     authListener.subscription;
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      <TaskContextProvider>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/usuarios" element={<Usuarios />} />
        </Routes>
      </TaskContextProvider>
    </>
  );
}

export default App;
