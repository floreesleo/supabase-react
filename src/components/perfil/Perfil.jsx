import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { supabase } from "./../../supabase/client";

export default function Perfil() {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      Perfil
      <Button variant="link" onClick={handleLogOut}>
        Cerrar sesión
      </Button>
    </div>
  );
}
