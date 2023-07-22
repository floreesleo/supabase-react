import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "./../NavBar";

import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export default function Perfil() {
  const navigate = useNavigate();

  const user = useUser();
  const supabaseClient = useSupabaseClient();

  async function handleLogOut() {
    try {
      const { error } = await supabaseClient.auth.signOut();
      navigate("/");
      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <NavBar />
      <div>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <Button variant="primary" onClick={() => handleLogOut()}>
          Cerrar sesión
        </Button>
      </div>
    </>
  );
}
