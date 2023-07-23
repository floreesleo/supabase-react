import { Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Perfil from "./components/perfil/Perfil";
import Usuarios from "./components/usuarios/Usuarios";
import Tareas from "./components/tareas/Tareas";
//= import Signup from "./components/autenticacion/Signup";
//= import Login from "./components/autenticacion/Login";
//= import ForgotPassword from "./components/autenticacion/ForgotPassword";

import { TaskContextProvider } from "./context/TaskContext";

function App() {
  return (
    <>
      <TaskContextProvider>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/tareas" element={<Tareas />} />
        </Routes>
      </TaskContextProvider>
    </>
  );
}

export default App;
