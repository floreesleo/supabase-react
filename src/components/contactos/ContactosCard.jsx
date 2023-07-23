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
              variant="primary"
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
            <Button
              size="sm"
              variant="danger"
              onClick={() => setEditing(false)}
            >
              Regresar
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}
