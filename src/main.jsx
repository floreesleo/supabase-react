import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "./supabase/client.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SessionContextProvider supabaseClient={supabase}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SessionContextProvider>
);
