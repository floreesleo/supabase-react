//| Importar librerias, dependencias, hooks y  modulos a utilizar
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { supabase } from "../../supabase/client";

export default function UsuariosCard({ usuario }) {
  //| constantes con las que se almacenan los valores de los inputs
  const [name, setName] = useState(usuario.name);
  const [user, setUser] = useState(usuario.user);

  //| Constante con la cual se le dirá a la Card si se está editando o no
  const [editing, setEditing] = useState(false);

  //| Funcion para actualizar al usuario con respecto al id del mismo
  async function updateUser() {
    try {
      const { error } = await supabase
        .from("usuarios")
        .update({
          name: name,
          user: user,
        })
        .eq("id", usuario.id);

      if (error) throw error;

      setEditing(false);

      window.location.reload(); //| Recarga la página automaticamente al ejecutar la consulta
    } catch (error) {
      console.error(error);
    }
  }

  //| Funcion para borrar a un usuario con respecto a su id
  async function deleteUser() {
    try {
      const { error } = await supabase
        .from("usuarios")
        .delete()
        .eq("id", usuario.id);

      if (error) throw error;

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Card style={{ width: "18rem", marginBottom: "15px" }}>
      <Card.Body>
        {editing == false ? (
          //| Si editing es false, solo se muestran los datos del usuario con sus respectivos botones
          <>
            <Card.Title>{usuario.name}</Card.Title>
            <Card.Text>{usuario.user}</Card.Text>
            <Button
              variant="success"
              className="me-1"
              onClick={() => setEditing(true)} //| Con esté boton se maneja editing, para mostrar el formulario del usuario o no
            >
              Editar
            </Button>
            <Button variant="danger" onClick={() => deleteUser()}>
              Eliminar
            </Button>
          </>
        ) : (
          //| Si editing es true, se muestra el formulario para editar los datos del usuario
          <>
            <h4>Editando...</h4>
            <Button
              size="sm"
              variant="danger"
              onClick={() => setEditing(false)} //| Con esté boton se maneja editing, para mostrar los datos del usuario
            >
              Cancelar
            </Button>
            <hr />
            {/* FORMULARIO  */}
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                id="name"
                required
                defaultValue={usuario.name}
                onChange={(ev) => setName(ev.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="email"
                id="user"
                required
                defaultValue={usuario.user}
                onChange={(ev) => setUser(ev.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="mt-2"
              onClick={() => updateUser()}
            >
              Actualizar
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}
