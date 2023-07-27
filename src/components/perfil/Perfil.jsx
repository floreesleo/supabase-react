//| Importar librerias, dependencias, hooks y  modulos a utilizar
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "./../NavBar";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export default function Perfil() {
  const navigate = useNavigate();

  const user = useUser(); //| Constante con la que se obtienen los datos del usuario que inició sesión
  const supabaseClient = useSupabaseClient(); //| Constante con la que se hacen consultas a supabase

  //| Funcion para cerrar sesión del usuario
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

      <Card
        border="primary"
        style={{ width: "18rem", marginLeft: "20px", marginTop: "20px" }}
      >
        <Card.Header>
          <strong>Perfil del usuario</strong>
        </Card.Header>
        <Card.Body>
          <Card.Title>{user.email}</Card.Title>
          <Card.Text>
            Estas cuentas son solo de prueba, son usadas con fines educativos.
          </Card.Text>
          <Button variant="danger" onClick={() => handleLogOut()}>
            Cerrar sesión
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
