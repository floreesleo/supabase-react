/* eslint-disable react/prop-types */
import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

import { supabase } from "../../supabase/client";

export default function TareasCard({ tarea }) {
  const [name, setName] = useState(tarea.name);
  const [description, setDescription] = useState(tarea.description);
  //! const [importantRef, setImportant] = useState(tarea.important);

  const [editing, setEditing] = useState(false);

  const [done, setDone] = useState(false);

  async function updateTarea() {
    try {
      const { error } = await supabase
        .from("tareas")
        .update({
          name: name,
          description: description,
          important: "true",
        })
        .eq("id", tarea.id);

      if (error) throw error;

      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTarea() {
    try {
      const { error } = await supabase
        .from("tareas")
        .delete()
        .eq("id", tarea.id);

      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  }

  async function handleToggleDone() {
    setDone(true);
    const { error } = await supabase
      .from("tareas")
      .update({
        done: done,
      })
      .eq("id", tarea.id);

    if (error) throw error;
  }

  return (
    <Card
      style={{
        width: "18rem",
      }}
    >
      <Card.Body
        style={{
          border: "1px solid black",
          borderRadius: "5px",
          background: tarea.important ? "#ffdd59" : "#d2dae2",
        }}
      >
        {editing == false ? (
          <>
            <Card.Title>
              <strong>{tarea.name}</strong>
            </Card.Title>
            <Card.Text>{tarea.description}</Card.Text>
            <Button
              variant="success"
              className="me-1"
              onClick={() => handleToggleDone()}
            >
              Hecho
            </Button>
            <Button
              variant="secondary"
              className="me-1"
              onClick={() => setEditing(true)}
            >
              Editar
            </Button>
            <Button variant="danger" onClick={() => deleteTarea()}>
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
            {/* FORMULARIO  */}
            <Form.Group>
              <Form.Label>Nuevo título</Form.Label>
              <Form.Control
                type="text"
                id="name"
                required
                defaultValue={tarea.name}
                onChange={(ev) => setName(ev.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nueva descripción</Form.Label>
              <Form.Control
                type="email"
                id="user"
                required
                defaultValue={tarea.description}
                onChange={(ev) => setDescription(ev.target.value)}
              />
            </Form.Group>
            {/* <Form.Group>
              <Form.Label>¿Importante?</Form.Label>
              <Form.Control
                type="checkbox"
                checked={importantRef}
                // le da un nuevo valor a name con setName
                value={importantRef}
                label="Marca la casilla "
                onChange={(e) => setImportant(e.target.value)}
              />
            </Form.Group> */}
            <Button
              variant="primary"
              type="submit"
              className="mt-2"
              onClick={() => updateTarea()}
            >
              Actualizar tarea
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}
