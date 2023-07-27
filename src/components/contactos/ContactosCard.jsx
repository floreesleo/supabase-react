//| Importar librerias, dependencias, hooks y  modulos a utilizar
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Card, Button } from "react-bootstrap";

export default function ContactosCard({ usuario }) {
  const [editing, setEditing] = useState(false);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        {editing == false ? (
          <>
            <Card.Title>{usuario.name}</Card.Title>
            <Button
              //| Boton para ver el email del perfil
              variant="dark"
              size="sm"
              className="me-1"
              onClick={() => setEditing(true)}
            >
              Ver email
            </Button>
          </>
        ) : (
          <>
            <Card.Title>{usuario.user}</Card.Title>

            <Button className="me-2" size="sm" variant="primary" type="submit">
              Contactar
            </Button>
            <Button size="sm" variant="dark" onClick={() => setEditing(false)}>
              {/* Regresar a ver el nombre del contacto */}
              Regresar
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}
