//| Importar librerias, dependencias, hooks y  modulos a utilizar
import { useEffect, useState } from "react";
import { Row, Container, Form, Col, Button } from "react-bootstrap";
import NavBar from "../NavBar";
import { supabase } from "../../supabase/client";
import UsuariosCard from "./UsuariosCard";

export default function Usuarios() {
  //| Constantes para almacenar los datos de nombre y usuario que se escriban en los inputs
  const [nameRef, setName] = useState("");
  const [userRef, setUser] = useState("");

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    //| El useEffect se ejecutará cada vez que se habra o recargue la página, ejecutando la funcion de getUsuarios()
    getUsuarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //| Funcion para obtener a los usuarios de la base de datos de supabase
  async function getUsuarios() {
    try {
      const { data, error } = await supabase.from("usuarios").select("*");

      if (error) throw error;
      //| Si data no es nula, envia a la constante setUsuarios la misma data
      if (data != null) {
        setUsuarios(data); // [usuario1, usuario2, usuario3]
      }
    } catch (error) {
      console.error(error);
    }
  }

  //| Funcion para crear usuarios
  async function createUser() {
    try {
      const { error } = await supabase
        .from("usuarios")
        //| Inserta a la tabla usuarios los valores de las constantes antes declaradas
        .insert({
          name: nameRef,
          user: userRef,
        })
        .single();
      if (error) throw error;

      window.location.reload(); //| Recarga la página automaticamente al crear el usuario
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
              placeholder="John Smith"
              onChange={(ev) => setName(ev.target.value)}
            />
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="email"
              id="userRef"
              placeholder="example@example.com"
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
          {/* Mapea la tabla usuarios y los va mostrando por medio del componente UsuariosCard, pasandole el parametro usuario */}
          {usuarios.map((usuario) => (
            <Col key={usuario.id}>
              <UsuariosCard usuario={usuario} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
