import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

import { supabase } from "./supabase/client";

import { TaskContextProvider } from "./context/TaskContext";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("supabase event: ", event);
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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TaskContextProvider>
    </>
  );
}

export default App;
