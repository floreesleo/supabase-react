//| Importar librerias, dependencias, hooks y  modulos a utilizar
import { useEffect, useState } from "react";
import { Row, Container, Col } from "react-bootstrap";
import NavBar from "../NavBar";
import { supabase } from "../../supabase/client";
import ContactosCard from "./ContactosCard";

export default function Contactos() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    getUsuarios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //| Funcion para conseguir a todos los usuarios de la base de datos de supabase
  async function getUsuarios() {
    try {
      const { data, error } = await supabase.from("usuarios").select("*");

      if (error) throw error;
      if (data != null) {
        setUsuarios(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <NavBar />
      <Container className="mt-3">
        <h3>Contactos</h3>
        <Row xs={1} lg={3} className="g-4">
          {usuarios.map((usuario) => (
            // eslint-disable-next-line react/jsx-key
            <Col key={usuario.id}>
              <ContactosCard usuario={usuario} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
