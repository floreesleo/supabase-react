import { useEffect, useState } from "react";

import { Container, Form, Card, Alert, Button, Row, Col } from "react-bootstrap";

import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import NavBar from "./NavBar";

import { v4 as uuidv4 } from "uuid";

// https://tiwxplqzmqvtbkrrsflm.supabase.co/storage/v1/object/public/files/dbeae5c4-9d27-4a25-b285-44f91f674d60/462b59de-bbb6-415c-ac88-c9b922c8b2aa
const CDNURL =
  "https://tiwxplqzmqvtbkrrsflm.supabase.co/storage/v1/object/public/files/";

export default function Home() {
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  //| LOGIN
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (user) {
      getFiles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabaseClient.auth.signInWithOtp({
        email,
      });

      if (error) {
        setError("Error al comunicarse con supabase.");
        console.error(error);
      } else {
        setMessage("Revice su bandeja para futuras instrucciones");
      }

      console.log(data);
    } catch (error) {
      setError("Error al enviar correo de confirmación");
      console.error(error);
    }
  };

  async function getFiles() {
    const { data, error } = await supabaseClient.storage
      .from("files")
      .list(user?.id + "/", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (data !== null) {
      setImages(data);
    } else {
      console.error(error);
    }
  }

  async function uploadFile(ev) {
    let file = ev.target.files[0];

    // userId: leo
    // leo/
    // leo/miArchivo.txt

    const { data, error } = await supabaseClient.storage
      .from("files")
      .upload(user.id + "/" + uuidv4(), file); // uuid

    if (data) {
      getFiles();
    } else {
      console.error(error);
    }
  }

  async function deleteImage(imageName) {
    const { error } = await supabaseClient.storage
      .from("files")
      .remove([user.id + "/" + imageName]);

    if (error) {
      alert(error);
    } else {
      getFiles();
    }
  }
  return (
    <>
      {user === null ? (
        <>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Inicio de sesión</h2>
              {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>
                    Ingresa tu Email para obtener el Link máico
                  </Form.Label>
                  <Form.Control
                    type="email"
                    required
                    name="email"
                    placeholder="example@example.com"
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Button
                    className="w-100 mt-2"
                    type="submit"
                    variant="primary"
                  >
                    Confirmar email
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </>
      ) : (
        <>
          <NavBar />
          <Container align="center" className="container-sm mt-4">
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <Form.Group className="mb-3">
              <Form.Control
                type="file"
                accept="image/png, image/jpge, .doc, .docx, .txt"
                onChange={(ev) => uploadFile(ev)}
              />
            </Form.Group>
            <h3>Tus archivos</h3>
            <Row xs={1} md={3} className="g-4">
              {images.map((image) => {
                return (
                  <Col key={CDNURL + user.id + "/" + image.name}>
                    <Card>
                      <Card.Img
                        variant="top"
                        src={CDNURL + user.id + "/" + image.name}
                      />
                      <Card.Body>
                        <Button
                          variant="danger"
                          onClick={() => deleteImage(image.name)}
                        >
                          Borrar archivo
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </>
      )}
    </>
  );
}
