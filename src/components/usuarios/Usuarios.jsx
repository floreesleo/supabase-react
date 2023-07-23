import { useEffect, useState } from "react";
import { Row, Container, Form, Col, Button } from "react-bootstrap";
import NavBar from "../NavBar";
import { supabase } from "../../supabase/client";
import UsuariosCard from "./UsuariosCard";

export default function Usuarios() {
  const [nameRef, setName] = useState("");
  const [userRef, setUser] = useState("");

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    getUsuarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getUsuarios() {
    try {
      const { data, error } = await supabase.from("usuarios").select("*");

      if (error) throw error;
      if (data != null) {
        setUsuarios(data); // [usuario1, usuario2, usuario3]
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function createUser() {
    try {
      const { error } = await supabase
        .from("usuarios")
        .insert({
          name: nameRef,
          user: userRef,
        })
        .single();
      if (error) throw error;

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  console.log(nameRef, userRef);

  return (
    <>
      <NavBar />
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <h3>Crear usuarios</h3>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              id="nameRef"
              onChange={(ev) => setName(ev.target.value)}
            />
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="email"
              id="userRef"
              onChange={(ev) => setUser(ev.target.value)}
            />
            <Button
              variant="primary"
              className="mt-2"
              onClick={() => createUser()}
            >
              Crear usuario
            </Button>
          </Col>
        </Row>
        <hr />
        <h3>Database users</h3>
        <Row xs={1} lg={3} className="g-4">
          {usuarios.map((usuario) => (
            // eslint-disable-next-line react/jsx-key
            <Col key={usuario.id}>
              <UsuariosCard usuario={usuario} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
