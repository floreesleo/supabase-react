import { useEffect, useState } from "react";
import { Row, Container, Form, Col, Button } from "react-bootstrap";
import NavBar from "../NavBar";
import { supabase } from "../../supabase/client";
import TareasCard from "./TareasCard";

export default function Tareas() {
  const [nameRef, setName] = useState("");
  const [descriptionRef, setDescription] = useState("");
  // const [importantRef, setImportant] = useState(false);

  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    getTareas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getTareas() {
    try {
      const { data, error } = await supabase.from("tareas").select("*");

      if (error) throw error;
      if (data != null) {
        setTareas(data); // [usuario1, usuario2, usuario3]
      }
    } catch (error) {
      console.error(error);
    }
  }

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
            {/* <Form.Group>
              <input
                type="checkbox"
                className="me-2"
                checked={importantRef}
                value={importantRef}
                onChange={(ev) => setImportant(ev.target.value)}
              />
              <Form.Label>
                Marca la casilla si la tarea es importante
              </Form.Label>
            </Form.Group> */}
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
        {/* <Button variant="dark" className="me-1">
          Mostrar tareas hechas
        </Button> */}
        <Row xs={1} lg={3} className="g-4">
          {tareas.map((tarea) => (
            // eslint-disable-next-line react/jsx-key
            <Col key={tarea.id}>
              <TareasCard tarea={tarea} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
