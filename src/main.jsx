//| Importar librerias, dependencias, hooks y  modulos a utilizar
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "./supabase/client.jsx";

//| Cuerpo del módulo
ReactDOM.createRoot(document.getElementById("root")).render(
  <SessionContextProvider supabaseClient={supabase}>
    {/* BrowerRouter es el Padre contenedor de todos los Routes, Route a utilizar en el proyecto */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SessionContextProvider>
);
