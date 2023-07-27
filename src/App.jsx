//| Importar librerias, dependencias, hooks y  modulos a utilizar
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Perfil from "./components/perfil/Perfil";
import Usuarios from "./components/usuarios/Usuarios";
import Tareas from "./components/tareas/Tareas";
import Contactos from "./components/contactos/Contactos";
import SearchComponent from "./components/buscador/SearchComponent";
import { TaskContextProvider } from "./context/TaskContext";

//| Cuerpo del módulo
function App() {
  return (
    <>
      {/* TaskContextProvider es el proveedor de funciones, componentes hacia todos los archivos que estén dentro de dichas etiquetas */}
      <TaskContextProvider>
        {/* Routes es el padre de las rutas que se van a utilizar */}
        <Routes>
          {/* Route es el link de cada componete/modulo a mostrar en el navegador y por el cual se hace referencia al navegar */}
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/tareas" element={<Tareas />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/buscador" element={<SearchComponent />} />
        </Routes>
      </TaskContextProvider>
    </>
  );
}

export default App;
