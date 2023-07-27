//| Importar librerias, dependencias, hooks y  modulos a utilizar
import { useEffect, useState } from "react";
import { Row, Container, Form, Col, Button } from "react-bootstrap";
import NavBar from "../NavBar";
import { supabase } from "../../supabase/client";
import TareasCard from "./TareasCard";

export default function Tareas() {
  //| Constantes para almacenar los valores de los inputs
  const [nameRef, setName] = useState("");
  const [descriptionRef, setDescription] = useState("");

  //| Constante con la que se manejarán las tareas por medio de un arreglo
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    //| El useEffect se ejecutará cada vez que se habra o recargue la página, ejecutando la funcion de getTareas()
    getTareas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //| Funcion para obtener todas las tareas de la tabla tareas
  async function getTareas() {
    try {
      const { data, error } = await supabase.from("tareas").select("*");

      if (error) throw error;
      if (data != null) {
        setTareas(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  //| Funcion para crear una tarea por medio de una inserción
  async function createTarea() {
    try {
      const { error } = await supabase
        .from("tareas")
        .insert({
          name: nameRef,
          description: descriptionRef,
          done: "false",
          important: "false",
        })
        .single();
      if (error) throw error;

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <NavBar />
      <Container className="mt-2">
        <Row>
          <Col xs={12} md={8}>
            <h3>Crear tarea</h3>
            <Form.Group>
              <Form.Label>
                <strong>Título</strong>
              </Form.Label>
              <Form.Control
                type="text"
                id="nameRef"
                placeholder="Nombre de la tarea"
                onChange={(ev) => setName(ev.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <strong>Descripción</strong>
              </Form.Label>
              <Form.Control
                type="text"
                id="descriptionRef"
                placeholder="Descripción breve de la tarea"
                onChange={(ev) => setDescription(ev.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              className="mt-2"
              onClick={() => createTarea()}
            >
              Crear tarea
            </Button>
          </Col>
        </Row>
        <hr />
        <h3>Muro de tareas</h3>
        <Row xs={1} lg={3} className="g-4">
          {tareas.map((tarea) => (
            <Col key={tarea.id}>
              <TareasCard tarea={tarea} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
