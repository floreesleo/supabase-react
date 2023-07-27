//| Importar librerias, dependencias, hooks y  modulos a utilizar
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { supabase } from "../../supabase/client";

export default function TareasCard({ tarea }) {
  //| Constantes que almacenan los campos de ls inputs
  const [name, setName] = useState(tarea.name);
  const [description, setDescription] = useState(tarea.description);

  //| Constante con la cual se le dirá a la Card si se está editando o no
  const [editing, setEditing] = useState(false);

  //| Constante con la que se le dice a una tarea si ya está terminada o no
  const [done, setDone] = useState(false);

  //| Funcion para actualizar una tarea por medio de su id
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

      window.location.reload();
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  }

  //| Funcion para borrar una tarea por medio de su id
  async function deleteTarea() {
    try {
      const { error } = await supabase
        .from("tareas")
        .delete()
        .eq("id", tarea.id);

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  //| Funcion para actualizar el campo done de la base de datos de la tarea
  async function updateDone() {
    setDone(true);
    try {
      const { error } = await supabase
        .from("tareas")
        .update({
          done: done,
        })
        .eq("id", tarea.id);

      if (error) throw error;

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
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
        }}
      >
        {editing == false ? (
          <>
            <Card.Title>
              <strong>{tarea.name}</strong>
            </Card.Title>
            <Card.Text>{tarea.description}</Card.Text>
            <Card.Text
              style={{
                color: tarea.important ? "#eb2f06" : "#535c68",
              }}
            >
              <strong>
                {tarea.important ? "Importante" : "No importante"}
              </strong>
            </Card.Text>
            <Button
              variant="success"
              className="me-1"
              onClick={() => updateDone()} //| Boton donde se ejecuta la funcion para terminar una tarea
            >
              Hecho
            </Button>
            <Button
              variant="primary"
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
