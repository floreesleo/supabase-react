/* eslint-disable react/prop-types */
import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

import { supabase } from "../../supabase/client";

export default function UsuariosCard({ usuario }) {
  const [name, setName] = useState(usuario.name);
  const [user, setUser] = useState(usuario.user);

  const [editing, setEditing] = useState(false);

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

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

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
          <>
            <Card.Title>{usuario.name}</Card.Title>
            <Card.Text>{usuario.user}</Card.Text>
            <Button
              variant="success"
              className="me-1"
              onClick={() => setEditing(true)}
            >
              Editar
            </Button>
            <Button variant="danger" onClick={() => deleteUser()}>
              Eliminar
            </Button>
          </>
        ) : (
          <>
            <h4>Editando...</h4>
            <Button
              size="sm"
              variant="danger"
              onClick={() => setEditing(false)}
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
