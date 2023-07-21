import { useEffect } from "react";
import { supabase } from "./../supabase/client";
import { useNavigate } from "react-router-dom";

import NavBar from "./NavBar";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!supabase.auth.getSession()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <NavBar />
    </>
  );
}
